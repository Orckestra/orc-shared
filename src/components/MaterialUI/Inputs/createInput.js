import React from "react";
import {
	InputBase,
	Checkbox,
	Radio,
	Select,
	StandaloneRadio,
	Switch,
	InputBaseProps,
	CheckboxProps,
	RadioProps,
	SelectProps,
	StandaloneRadioProps,
	SwitchProps,
} from "./index";

export const inputTypes = {
	inputBase: "inputBase",
	checkbox: "checkbox",
	radio: "radio",
	select: "select",
	standaloneRadio: "standaloneRadio",
	switch: "switch",
};

const propsClasses = {
	[inputTypes.inputBase]: InputBaseProps,
	[inputTypes.checkbox]: CheckboxProps,
	[inputTypes.radio]: RadioProps,
	[inputTypes.select]: SelectProps,
	[inputTypes.standaloneRadio]: StandaloneRadioProps,
	[inputTypes.switch]: SwitchProps,
};

const inputComponents = {
	[inputTypes.inputBase]: InputBase,
	[inputTypes.checkbox]: Checkbox,
	[inputTypes.radio]: Radio,
	[inputTypes.select]: Select,
	[inputTypes.standaloneRadio]: StandaloneRadio,
	[inputTypes.switch]: Switch,
};

const propsPropertyName = {
	[inputTypes.inputBase]: "inputProps",
	[inputTypes.checkbox]: "checkboxProps",
	[inputTypes.radio]: "radioProps",
	[inputTypes.select]: "selectProps",
	[inputTypes.standaloneRadio]: "radioProps",
	[inputTypes.switch]: "switchProps",
};

export const createInput = (inputType, { ...props }) => {
	const typePropsInstance = new propsClasses[inputType]();

	const propKeys = Object.keys(props);

	const otherProps = {};

	propKeys.forEach(propKey => {
		if (propsClasses[inputType].propNames[propKey] != null) {
			typePropsInstance.set(propKey, props[propKey]);
		} else {
			otherProps[propKey] = props[propKey];
		}
	});

	return React.createElement(inputComponents[inputType], {
		[propsPropertyName[inputType]]: typePropsInstance,
		...otherProps,
	});
};

export default createInput;
