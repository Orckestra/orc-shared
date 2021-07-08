import React, { useCallback, useMemo } from "react";
import classNames from "classnames";
import AutocompleteMUI from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "../DataDisplay/Icon";
import AutocompleteProps, { isAutocompleteProps } from "./AutocompleteProps";

const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		flexDirection: "column",
	},
	selectPaper: {
		border: `1px solid ${theme.palette.grey.borders}`,
		minWidth: `auto !important`,
		width: `auto !important`,
		"& ul": {
			minWidth: theme.spacing(17.5),
			maxHeight: theme.spacing(30),
			paddingTop: 0,
			paddingBottom: 0,
		},
		"& li": {
			fontSize: theme.typography.fontSize,
			fontFamily: theme.typography.fontFamily,
			textTransform: "none",
			color: theme.palette.grey.dark,
			paddingTop: theme.spacing(1),
			paddingBottom: theme.spacing(1),
			borderRadius: 0,
			whiteSpace: "normal",
			"&:hover": {
				backgroundColor: theme.palette.primary.light,
			},
			"&:focus, &:active": {
				borderRadius: 0,
				"&:hover": {
					backgroundColor: theme.palette.primary.light,
				},
			},
		},
	},
	icon: {
		width: theme.spacing(1.2),
		color: theme.palette.primary.main,
	},
	closeIcon: {
		color: theme.palette.primary.main,
	},
	errorText: {
		marginTop: theme.spacing(0.5),
		color: theme.palette.error.main,
		fontSize: theme.typography.fieldLabelSize,
		float: "left",
	},
	disabled: {
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.grey.light,
		border: 0,
	},

	inputRoot: {
		paddingRight: theme.spacing(2.6),
		height: "auto",
		boxSizing: "border-box",
	},
	input: {
		border: 0,
		padding: 0,
		boxShadow: "none !important",
	},
	popupIndicator: {
		right: theme.spacing(1),
		boxShadow: "none !important",
		backgroundColor: "unset !important",
		display: "none",
	},
	clearIndicator: {
		boxShadow: "none !important",
		backgroundColor: "unset !important",
	},
}));

const Autocomplete = ({ options, autocompleteProps }) => {
	if (isAutocompleteProps(autocompleteProps) === false) {
		throw new TypeError("autocompleteProps property is not of type AutocompleteProps");
	}

	const classes = useStyles();

	const update = autocompleteProps?.get(AutocompleteProps.propNames.update);
	const value = autocompleteProps?.get(AutocompleteProps.propNames.value) ?? "";
	const disabled = autocompleteProps?.get(AutocompleteProps.propNames.disabled) || false;
	const error = autocompleteProps?.get(AutocompleteProps.propNames.error);

	const onChangeOption = useCallback((event, option) => update(option?.value ?? null), [update]);

	const RenderInput = params => (
		<TextField
			{...params}
			fullWidth
			InputProps={{
				...params.InputProps,
				disableUnderline: true,
				className: classNames("MuiInputBase-input", classes.inputRoot),
				classes: {
					...params.InputProps.classes,
					disabled: classes.disabled,
				},
			}}
			inputProps={{
				...params.inputProps,
				id: "mui-input-autocomplete-id",
			}}
		/>
	);

	const selected = useMemo(() => options.find(o => o.value === value) ?? null, [options, value]);

	return (
		<div className={classes.container}>
			<AutocompleteMUI
				disabled={disabled}
				value={selected}
				options={options}
				getOptionLabel={option => option.label}
				onChange={onChangeOption}
				classes={{
					paper: classes.selectPaper,
					popupIndicator: classes.popupIndicator,
					clearIndicator: classes.clearIndicator,
					input: classes.input,
				}}
				closeIcon={<Icon id="close2" className={classes.closeIcon} />}
				renderInput={RenderInput}
			/>
			{error && <div className={classNames(classes.errorText)}>{error}</div>}
		</div>
	);
};

export default Autocomplete;
