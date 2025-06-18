import React from "react";
import InputBase from "../../MaterialUI/Inputs/InputBase";
import { memoize } from "../../../utils";
import InputBaseProps from "../../MaterialUI/Inputs/InputBaseProps";

export const inputEventUpdater = memoize(update => input => update(input));

export const TextInput = ({ update, value = "", ...props }) => {
	const inputBaseProps = new InputBaseProps();
	inputBaseProps.set(InputBaseProps.propNames.value, value);
	inputBaseProps.set(InputBaseProps.propNames.disabled, props.disabled);
	inputBaseProps.set(InputBaseProps.propNames.placeholder, props.placeholder);
	inputBaseProps.set(InputBaseProps.propNames.onBlur, props.onBlur);
	inputBaseProps.set(InputBaseProps.propNames.update, inputEventUpdater(update));

	const hasError = props.required && !value ? true : false;
	inputBaseProps.set(InputBaseProps.propNames.error, hasError);

	return <InputBase inputProps={inputBaseProps} />;
};
