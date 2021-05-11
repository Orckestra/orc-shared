import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SelectProps from "../SelectProps";
import Icon from "../../DataDisplay/Icon";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Select from "../Select";
import Input from "@material-ui/core/Input";

export const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		marginRight: theme.spacing(1),
		width: theme.spacing(48),
		"& > .MuiInputBase-root.MuiInput-root": {
			flex: "7 0 0",
		},
	},
	fullWidth: {
		width: "100%",
	},
	clearButton: {
		fontSize: theme.spacing(2.2),
		padding: theme.spacing(0.3),
		marginRight: theme.spacing(-0.1),
		borderRadius: 0,
		border: "none",
		"&.MuiIconButton-root": {
			marginLeft: "0",
		},
		"&:active": {
			boxShadow: "none",
			borderRadius: 0,
		},
		"&:focus": {
			boxShadow: "none",
			borderRadius: 0,
		},
	},
	searchButton: {
		flex: "1 0 0",
		fontSize: theme.spacing(2.2),
		padding: `${theme.spacing(0.3)} ${theme.spacing(1)}`,
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		zIndex: 10,
		"&.MuiIconButton-root": {
			marginLeft: "0",
		},
		"&:active": {
			borderTopLeftRadius: 0,
			borderBottomLeftRadius: 0,
		},
		"&:focus": {
			borderTopLeftRadius: 0,
			borderBottomLeftRadius: 0,
		},
	},
	controlInput: {
		borderRadius: 0,
		height: theme.spacing(1.6),
		width: "100%",
		border: "none",
		"&:active": {
			borderRadius: 0,
		},
		"&:focus": {
			borderRadius: 0,
			boxShadow: "none",
		},
		"&::-ms-clear": {
			display: "none",
			height: 0,
			width: 0,
		},
		"&:invalid ~ .MuiInputAdornment-root": {
			display: "none",
		},
		"&:valid ~ .MuiInputAdornment-root": {},
	},
	parentInput: {
		flex: "13 0 0",
		zIndex: props => (props.focused ? 99 : 1),
		border: props =>
			props.focused
				? `${theme.spacing(0.1)} solid ${theme.palette.focus}`
				: `${theme.spacing(0.1)} solid ${theme.palette.grey.borders}`,
		boxShadow: props => (props.focused ? `0 0 4px ${theme.palette.focus}` : "none"),
		width: "100%",
		display: "inherit",
		marginLeft: theme.spacing(-0.1),
		marginRight: theme.spacing(-0.1),
	},
	selectRoot: {
		zIndex: 10,
		minWidth: "auto",
		maxWidth: "none",
		backgroundColor: theme.palette.grey.light,
		height: theme.spacing(3),
		boxSizing: "border-box",
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
		"&:active": {
			borderTopRightRadius: 0,
			borderBottomRightRadius: 0,
		},
	},
	selectPaper: {
		"& ul": {
			maxWidth: "none",
		},
	},
}));

const SearchControl = ({ placeholder, defaultValue = "", searchOptions, onSearch = () => {} }) => {
	const [inputFocused, setInputFocused] = useState(false);
	const [clearFocused, setClearFocused] = useState(false);
	const [searchOption, setSearchOption] = useState(searchOptions[0].value);

	const classes = useStyles({ focused: inputFocused || clearFocused });

	const inputRef = useRef();

	const update = value => setSearchOption(value);

	const selectProps = new SelectProps();
	selectProps.set(SelectProps.propNames.update, update);
	selectProps.set(SelectProps.propNames.value, searchOption);
	selectProps.set(SelectProps.propNames.positionOverride, {
		anchorOrigin: {
			vertical: "bottom",
			horizontal: "left",
		},
		transformOrigin: {
			vertical: "top",
			horizontal: "left",
		},
	});
	selectProps.setStyle(SelectProps.ruleNames.root, classes.selectRoot);
	selectProps.setStyle(SelectProps.ruleNames.paper, classes.selectPaper);

	const handleKeyDown = e => {
		if (e.key === "Enter") {
			onSearch(searchOption, e.target.value);
		}
	};

	const handleChange = e => {
		console.log("Input %s change to value", e.target, e.target.value);
	};

	const onClear = event => {
		onSearch(searchOption, "");
		inputRef.current.value = "";
		inputRef.current.focus();

		event.preventDefault();
		event.stopPropagation();
	};

	const onFocusedEvent = (event, isInput, focused) => {
		if (isInput) setInputFocused(focused);
		else setClearFocused(focused);
		event.preventDefault();
		event.stopPropagation();
	};

	const inputSection = (
		<div data-qa="searchInput" data-qa-is-focused={inputFocused || clearFocused} className={classes.parentInput}>
			<form className={classes.fullWidth}>
				<Input
					placeholder={placeholder}
					defaultValue={defaultValue}
					inputRef={inputRef}
					type="text"
					classes={{ input: classes.controlInput }}
					onKeyDown={handleKeyDown}
					disableUnderline={true}
					required
					onFocus={e => onFocusedEvent(e, true, true)}
					onBlur={e => onFocusedEvent(e, true, false)}
					onChange={handleChange}
					endAdornment={
						<InputAdornment position="start">
							<IconButton tabIndex="-1" type="reset" className={classes.clearButton}>
								<Icon id="close2" />
							</IconButton>
						</InputAdornment>
					}
				/>
			</form>
		</div>
	);

	const searchSection = (
		<IconButton
			data-qa="searchButton"
			variant="contained"
			classes={{ root: classes.searchButton }}
			onClick={() => {
				onSearch(searchOption, inputRef.current.value);
			}}
		>
			<Icon id="search" />
		</IconButton>
	);

	return (
		<div className={classes.container}>
			<Select className={classes.selectInput} options={searchOptions} selectProps={selectProps} />
			{inputSection}
			{searchSection}
		</div>
	);
};
export default SearchControl;
