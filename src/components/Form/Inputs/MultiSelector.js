import React from "react";
import Select from "../../MaterialUI/Inputs/Select";
import { memoize } from "../../../utils";
import SelectProps from "../../MaterialUI/Inputs/SelectProps";

export const selectEventUpdater = memoize(update => value => update(value));

const MultiSelector = ({ value, options, update, ...props }) => {
	const selectProps = new SelectProps();

	selectProps.set(SelectProps.propNames.value, value);
	selectProps.set(SelectProps.propNames.onClose, props.onBlur);
	selectProps.set(SelectProps.propNames.disabled, props.disabled);
	selectProps.set(SelectProps.propNames.multiple, true);
	selectProps.set(SelectProps.propNames.update, selectEventUpdater(update));

	const hasError = props.required && (!Array.isArray(value) || value.length === 0);
	selectProps.set(SelectProps.propNames.error, hasError);

	return <Select options={options} selectProps={selectProps} />;
};

export default MultiSelector;
