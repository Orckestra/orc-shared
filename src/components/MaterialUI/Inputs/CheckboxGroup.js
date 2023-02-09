import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckboxGroupProps, { isCheckboxGroupProps } from "./CheckboxGroupProps";
import Checkbox from "./Checkbox";
import CheckboxProps from "./CheckboxProps";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		flexDirection: "column",
	},
	checkBoxContainer: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		"& .MuiFormControlLabel-root": {
			[theme.breakpoints.up("xs")]: {},
			[theme.breakpoints.up("sm")]: {},
			[theme.breakpoints.up("md")]: { width: "45%" },
			[theme.breakpoints.up("lg")]: { width: "30%" },
			[theme.breakpoints.up("xl")]: { width: "20%" },

			"& + .MuiFormControlLabel-root": {
				marginTop: theme.spacing(1),
			},
		},
	},
	errorText: {
		marginTop: theme.spacing(0.5),
		color: theme.palette.error.main,
		fontSize: theme.typography.fieldLabelSize,
		float: "left",
	},
}));

const CheckboxGroup = ({ checkboxGroupProps }) => {
	const classes = useStyles();

	if (isCheckboxGroupProps(checkboxGroupProps) === false) {
		throw new TypeError("checkboxGroupProps property is not of type CheckboxGroupProps");
	}

	const update = checkboxGroupProps?.get(CheckboxGroupProps.propNames.update);
	const value = checkboxGroupProps?.get(CheckboxGroupProps.propNames.value);
	const label = checkboxGroupProps?.get(CheckboxGroupProps.propNames.label);
	const error = checkboxGroupProps?.get(CheckboxGroupProps.propNames.error);
	const readOnly = checkboxGroupProps?.get(CheckboxGroupProps.propNames.readOnly) || false;
	const disabled = checkboxGroupProps?.get(CheckboxGroupProps.propNames.disabled) || false;
	const options = checkboxGroupProps?.get(CheckboxGroupProps.propNames.options) ?? [];

	const handleGroupUpdate = (checked, value, newValue) => {
		const values = value ? value.split("|") : [];
		const position = values.indexOf(newValue);
		if (checked && position === -1) {
			values.push(newValue);
		}

		if (!checked && position !== -1) {
			values.splice(position, 1);
		}
		update(values.join("|"));
	};

	const checkBoxGroup = (
		<div className={classes.container}>
			<div className={classes.checkBoxContainer}>
				{options.map((option, index) => {
					const checkboxProps = new CheckboxProps();
					checkboxProps.set(CheckboxProps.propNames.update, checked => handleGroupUpdate(checked, value, option.value));
					checkboxProps.set(CheckboxProps.propNames.value, value?.split("|").includes(option.value));
					checkboxProps.set(CheckboxProps.propNames.label, option.label ?? option.value);
					checkboxProps.set(CheckboxProps.propNames.readOnly, readOnly);
					checkboxProps.set(CheckboxProps.propNames.disabled, disabled);
					return <Checkbox key={index} checkboxProps={checkboxProps} />;
				})}
			</div>
			{error && <div className={classes.errorText}>{error}</div>}
		</div>
	);

	return label == null ? checkBoxGroup : <FormControlLabel control={checkBoxGroup} label={label} />;
};

export default React.memo(CheckboxGroup);
