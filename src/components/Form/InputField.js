import React from "react";
import inputs from "./Inputs";
import Field from "./Field";

const InputField = ({
	name,
	type = "undefined",
	label,
	labelOnly,
	value = "",
	listIndex,
	...props
}) => {
	const Input = inputs[type];
	if (!Input) {
		console.error(`Unknown type "${type}", cannot render field`);
		return <p>Cannot render unknown type "{type}"</p>;
	}
	let fieldName = name;
	if (listIndex !== undefined) {
		fieldName += "[" + listIndex + "]";
	}
	return (
		<Field
			id={fieldName}
			label={label}
			labelOnly={labelOnly}
			center={type === "SwitchInput" || type === "CheckboxInput"}
		>
			<Input
				{...props}
				id={fieldName}
				aria-labelledby={listIndex !== undefined ? name + "_label" : undefined}
				value={value}
			/>
		</Field>
	);
};

export default InputField;
