import React from "react";
import CheckboxMUI from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckboxProps from "./CheckboxProps";

const Checkbox = ({ checkboxProps }) => {
	if (checkboxProps != null && checkboxProps instanceof CheckboxProps === false) {
		throw new TypeError("checkboxProps property is not of type CheckboxProps");
	}

	const update = checkboxProps?.get(CheckboxProps.propNames.update);
	const value = checkboxProps?.get(CheckboxProps.propNames.value);
	const label = checkboxProps?.get(CheckboxProps.propNames.label);

	const handleChange = event => {
		update(event.target.checked);
	};

	return (
		<FormControlLabel
			control={<CheckboxMUI checked={value} onChange={handleChange} />}
			label={label}
		></FormControlLabel>
	);
};

export default Checkbox;
