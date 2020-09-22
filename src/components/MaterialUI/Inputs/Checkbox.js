import React from "react";
import clsx from 'clsx';
import CheckboxMUI from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckboxProps, { isCheckboxProps } from "./CheckboxProps";
import { makeStyles } from "@material-ui/core/styles";

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
}));

const Checkbox = ({ checkboxProps }) => {
	if (isCheckboxProps(checkboxProps) === false) {
		throw new TypeError("checkboxProps property is not of type CheckboxProps");
	}

	const update = checkboxProps?.get(CheckboxProps.propNames.update);
	const value = checkboxProps?.get(CheckboxProps.propNames.value);
	const label = checkboxProps?.get(CheckboxProps.propNames.label);

	const handleChange = event => {
		update(event.target.checked);
	};

	const classes = useStyles();
	if (label === null) {
		return <CheckboxMUI checked={value} onChange={handleChange} />;
	}

	return (
		<FormControlLabel
			control={
				<CheckboxMUI
					checked={value}
					onChange={handleChange}
					color="primary"
					icon={<span className={classes.checkBoxIcon} />}
					checkedIcon={<span className={clsx(classes.checkBoxIcon, classes.checkBoxIconChecked)} />}
				/>
			}
			label={label}
		/>
	);
};

export default React.memo(Checkbox);
