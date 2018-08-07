import React from "react";
import inputs from "./Inputs";
import Field from "./Field";

export const Null = /* istanbul ignore next */ () => {
	console.log("Unknown type in InputField, look for Null component");
	return null;
};

const InputField = ({ type, label, labelOnly, value = "", ...props }) => {
	const Input = inputs[type] || Null;
	return (
		<Field
			label={label}
			labelOnly={labelOnly}
			center={type === "SwitchInput" || type === "CheckboxInput"}
		>
			<Input {...props} value={value} />
		</Field>
	);
};

export default InputField;
