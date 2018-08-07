import React from "react";
import inputs from "./Inputs";
import Field from "./Field";

const InputField = ({
	type = "undefined",
	label,
	labelOnly,
	value = "",
	...props
}) => {
	const Input = inputs[type];
	if (!Input) {
		console.error(`Unknown type "${type}", cannot render field`);
		return <p>Cannot render unknown type "{type}"</p>;
	}
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
