import React from "react";
import Select from "../../MaterialUI/Inputs/Select";
import SelectProps from "../../MaterialUI/Inputs/SelectProps";

const Selector = ({ value, options, update, ...props }) => {
	const selectProps = new SelectProps();

	selectProps.set(SelectProps.propNames.value, value);
	selectProps.set(SelectProps.propNames.onClose, props.onBlur);
	selectProps.set(SelectProps.propNames.disabled, props.disabled);
	selectProps.set(SelectProps.propNames.update, input => update(input));

	const hasError = props.required && !value ? true : false;
	selectProps.set(SelectProps.propNames.error, hasError);

	return <Select options={options} selectProps={selectProps} />;
};

export default Selector;
