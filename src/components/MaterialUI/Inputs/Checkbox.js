import React from "react";
import CheckboxMUI from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckboxProps, { isCheckboxProps } from "./CheckboxProps";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
	/* Checkboxes */
	checkBoxIcon: {
		border: "1px solid",
		borderColor: theme.palette.grey.borders,
		width: theme.spacing(1.6),
		height: theme.spacing(1.6),
		borderRadius: 3,
		".MuiCheckbox-root:focus &, .MuiCheckbox-root:active &": {
			boxShadow: `0 0 4px ${theme.palette.focus}`,
			outline: "none",
		},
		backgroundColor: theme.palette.background.default,
	},
	checkBoxIconChecked: {
		backgroundColor: "currentColor",
		borderColor: "currentColor",
		"&:before": {
			content: `" "`,
			position: "absolute",
			left: theme.spacing(0.7),
			top: theme.spacing(1.4),
			width: theme.spacing(0.6),
			height: theme.spacing(0.2),
			backgroundColor: "white",
			borderRadius: 2,
			transform: "rotate(46deg)",
		},
		"&:after": {
			content: `" "`,
			position: "absolute",
			left: theme.spacing(1.3),
			top: theme.spacing(0.9),
			width: theme.spacing(0.2),
			height: theme.spacing(0.9),
			backgroundColor: "white",
			borderRadius: 2,
			transform: "rotate(33deg)",
		},
	},
	checkBoxIconReadOnlyChecked: {
		"&:before": {
			content: `" "`,
			position: "absolute",
			left: theme.spacing(0.7),
			top: theme.spacing(0.4),
			width: theme.spacing(0.9),
			height: theme.spacing(0.3),
			backgroundColor: theme.palette.grey.dark,
			borderRadius: 3,
			transform: "rotate(46deg)",
			cursor: "auto",
		},
		"&:after": {
			content: `" "`,
			position: "absolute",
			left: theme.spacing(1.6),
			top: theme.spacing(-0.4),
			width: theme.spacing(0.3),
			height: theme.spacing(1.4),
			backgroundColor: theme.palette.grey.dark,
			borderRadius: 3,
			transform: "rotate(33deg)",
			cursor: "auto",
		},
	},
	checkBoxIconReadOnly: {
		"&:before": {
			content: `" "`,
			position: "absolute",
			top: theme.spacing(-0.15),
			left: theme.spacing(1.2),
			width: theme.spacing(0.2),
			height: theme.spacing(1.25),
			backgroundColor: "red",
			borderRadius: 3,
			transform: "rotate(45deg)",
			cursor: "auto",
		},
		"&:after": {
			content: `" "`,
			position: "absolute",
			top: theme.spacing(-0.15),
			left: theme.spacing(1.2),
			width: theme.spacing(0.2),
			height: theme.spacing(1.25),
			backgroundColor: "red",
			borderRadius: 3,
			transform: "rotate(-45deg)",
			cursor: "auto",
		},
	},
	indeterminateIconChecked: {
		backgroundColor: "currentColor",
		borderColor: "currentColor",
		"&:before": {
			content: `" "`,
			position: "absolute",
			left: theme.spacing(0.8),
			top: theme.spacing(1.3),
			width: theme.spacing(1),
			height: theme.spacing(0.2),
			backgroundColor: "white",
		},
	},

	indeterminateIconReadOnly: {
		"&:before": {
			content: `" "`,
			position: "absolute",
			left: theme.spacing(0.8),
			top: theme.spacing(1.3),
			width: theme.spacing(1),
			height: theme.spacing(0.2),
			backgroundColor: theme.palette.grey.dark,
		},
	},
}));

const Checkbox = ({ checkboxProps }) => {
	if (isCheckboxProps(checkboxProps) === false) {
		throw new TypeError("checkboxProps property is not of type CheckboxProps");
	}

	const onChange = checkboxProps?.get(CheckboxProps.propNames.onChange);
	const indeterminate = checkboxProps?.get(CheckboxProps.propNames.indeterminate) || false;
	const update = checkboxProps?.get(CheckboxProps.propNames.update);
	const value = checkboxProps?.get(CheckboxProps.propNames.value);
	const label = checkboxProps?.get(CheckboxProps.propNames.label);
	const readOnly = checkboxProps?.get(CheckboxProps.propNames.readOnly) || false;
	const disabled = checkboxProps?.get(CheckboxProps.propNames.disabled) || false;
	const metadata = checkboxProps?.get(CheckboxProps.propNames.metadata);

	const handleChange = event => {
		update(event.target.checked, metadata);
	};

	const onUseChange = event => {
		if (onChange) {
			onChange(event);
		} else {
			handleChange(event);
		}
	};

	const classes = useStyles();

	const checkBoxMui = (
		<CheckboxMUI
			checked={value}
			onChange={!readOnly ? onUseChange : null}
			indeterminate={indeterminate}
			disabled={disabled}
			color="primary"
			checkedIcon={
				<span
					className={classNames({
						[`${classes.checkBoxIcon}`]: !readOnly,
						[`${classes.checkBoxIconChecked}`]: !readOnly && value,
						[`${classes.checkBoxIconReadOnlyChecked}`]: readOnly && value,
					})}
				/>
			}
			icon={
				<span
					className={classNames({
						[`${classes.checkBoxIcon}`]: !readOnly,
						[`${classes.checkBoxIconReadOnly}`]: readOnly && !value,
					})}
				/>
			}
			indeterminateIcon={
				<span
					className={classNames({
						[`${classes.checkBoxIcon}`]: !readOnly,
						[`${classes.indeterminateIconChecked}`]: !readOnly && indeterminate,
						[`${classes.indeterminateIconReadOnly}`]: readOnly && indeterminate,
					})}
				/>
			}
		/>
	);

	return label == null ? checkBoxMui : <FormControlLabel control={checkBoxMui} label={label} />;
};

export default React.memo(Checkbox);
