import React from "react";
import Select from "../../MaterialUI/Inputs/Select";
import SelectProps from "../../MaterialUI/Inputs/SelectProps";

const Selector = ({ value, options, update, ...props }) => {
	const selectProps = new SelectProps();

	selectProps.set(SelectProps.propNames.value, value);
	selectProps.set(SelectProps.propNames.onClose, props.onBlur);
	selectProps.set(SelectProps.propNames.disabled, props.disabled);
	selectProps.set(SelectProps.propNames.update, update);
	selectProps.set(SelectProps.propNames.autoWidth, false);
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

	const hasError = props.required && !value ? true : false;
	selectProps.set(SelectProps.propNames.error, hasError);

	return <Select options={options} selectProps={selectProps} />;
};

export default Selector;
