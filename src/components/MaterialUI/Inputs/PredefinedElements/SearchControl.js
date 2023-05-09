import React, { useRef, useEffect } from "react";
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
		zIndex: 1,
		border: `${theme.spacing(0.1)} solid ${theme.palette.grey.borders}`,
		boxShadow: "none",
		width: "100%",
		display: "inherit",
		marginLeft: theme.spacing(-0.1),
		marginRight: theme.spacing(-0.1),
		borderTopLeftRadius: theme.shape.borderRadius,
		borderBottomLeftRadius: theme.shape.borderRadius,
		"& $controlInput": {
			borderTopLeftRadius: theme.shape.borderRadius,
			borderBottomLeftRadius: theme.shape.borderRadius,
		},
		".MuiInputBase-root ~ &": {
			borderTopLeftRadius: 0,
			borderBottomLeftRadius: 0,
			"& $controlInput": {
				borderTopLeftRadius: 0,
				borderBottomLeftRadius: 0,
			},
		},
		"&:focus-within": {
			zIndex: 99,
			border: `${theme.spacing(0.1)} solid ${theme.palette.focus}`,
			boxShadow: `0 0 4px ${theme.palette.focus}`,
		},
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
		"&:focus": {
			backgroundColor: theme.palette.grey.light,
		},
	},
	selectPaper: {
		"& ul": {
			maxWidth: "none",
		},
	},
}));

export const getSearchOptionValue = (searchOptions, searchOption) => {
	if (searchOptions?.length > 0) {
		const option = searchOptions.find(o => o.value === searchOption);
		if (option) {
			return option.value;
		}

		return searchOptions[0].value;
	}

	return null;
};

const SearchControl = ({
	placeholder,
	defaultValue = "",
	searchOptions,
	searchOption,
	onSearch = () => {},
	disabled,
	focusAndSelectSearchFieldOnLoad = true,
	focusSearchOnSearchOptionChange = false,
}) => {
	searchOptions = !searchOptions?.length ? null : searchOptions;
	searchOption = getSearchOptionValue(searchOptions, searchOption);

	const classes = useStyles();

	const inputRef = useRef();

	const update = value => {
		if (focusSearchOnSearchOptionChange && inputRef.current) {
			onSearch(value, "");
			setTimeout(() => {
				/* istanbul ignore next */
				if (inputRef.current) {
					inputRef.current.value = "";
					inputRef.current.focus();
					inputRef.current.select();
				}
			}, 0);
		} else {
			onSearch(value, defaultValue);
		}
	};

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

	useEffect(() => {
		if (focusAndSelectSearchFieldOnLoad && inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [focusAndSelectSearchFieldOnLoad]);

	const SelectSection = () => {
		if (searchOptions === null) return null;
		else return <Select className={classes.selectInput} options={searchOptions} selectProps={selectProps} />;
	};

	const onSubmit = event => {
		// using form submit instead of a keydown (with key=enter) to allow the 'enter key' event to be canceled elsewhere to avoid the submit event
		onSearch(searchOption, inputRef.current?.value);
		event.preventDefault();
	};

	const inputSection = (
		<div data-qa="searchInput" className={classes.parentInput}>
			<form data-qa="searchForm" className={classes.fullWidth} onSubmitCapture={onSubmit}>
				<Input
					placeholder={placeholder}
					defaultValue={defaultValue}
					inputRef={inputRef}
					type="text"
					disabled={disabled}
					classes={{ input: classes.controlInput }}
					disableUnderline={true}
					endAdornment={
						<InputAdornment position="start">
							<IconButton
								tabIndex="-1"
								data-qa="clearButton"
								disabled={disabled}
								onClick={() => {
									inputRef.current.value = null;
									onSearch(searchOption);
									inputRef.current.focus();
								}}
								className={classes.clearButton}
							>
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
			disabled={disabled}
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
			<SelectSection />
			{inputSection}
			{searchSection}
		</div>
	);
};
export default SearchControl;
