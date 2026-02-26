import React from "react";
import { useIntl } from "react-intl";
import Select from "../../MaterialUI/Inputs/Select";
import SelectProps from "../../MaterialUI/Inputs/SelectProps";
import sharedMessages from "../../../sharedMessages";

const clearValue = "__#Clear#__";
const selectAllValue = "__#SelectAll#__";

const MultiSelector = ({ value, width = 700, options, update, addClearSelectAll, multipleRenderValue, ...props }) => {
	const { formatMessage } = useIntl();

	const valueUpdater = value => {
		if (value.indexOf(clearValue) >= 0) {
			update([]);
		} else if (value.indexOf(selectAllValue) >= 0) {
			update(options.map(x => x.value));
		} else {
			update(value);
		}
	};

	const selectProps = new SelectProps();

	const selectionOptions = [];

	if (addClearSelectAll) {
		if (value.length > 0) {
			selectionOptions.push({
				label: formatMessage(sharedMessages.clear),
				value: clearValue,
			});
		}
		if (value.length !== options.length) {
			selectionOptions.push({
				label: formatMessage(sharedMessages.selectAll),
				value: selectAllValue,
			});
		}
	}

	const allOptions = [...selectionOptions, ...options];

	selectProps.set(SelectProps.propNames.value, value);
	selectProps.set(SelectProps.propNames.onClose, props.onBlur);
	selectProps.set(SelectProps.propNames.disabled, props.disabled);
	selectProps.set(SelectProps.propNames.multiple, true);
	selectProps.set(SelectProps.propNames.multipleSelectWidth, width);
	selectProps.set(SelectProps.propNames.update, valueUpdater);
	selectProps.set(SelectProps.propNames.autoWidth, false);
	selectProps.set(SelectProps.propNames.autoFocus, false);
	selectProps.set(
		SelectProps.propNames.renderValue,
		multipleRenderValue ? () => multipleRenderValue(value, options) : null,
	);
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

	const hasError = props.required && (!Array.isArray(value) || value.length === 0);
	selectProps.set(SelectProps.propNames.error, hasError);

	return <Select options={allOptions} selectProps={selectProps} />;
};

export default MultiSelector;
