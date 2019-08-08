import React from "react";
import { injectIntl } from "react-intl";
import inputs from "./Inputs";
import Field from "./Field";

export const InputField = ({
	intl,
	name,
	type = "undefined",
	label,
	labelOnly,
	value = "",
	listIndex,
	placeholder,
	required,
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
			required={required}
			invalid={required && !(Array.isArray(value) ? value.length : value)}
		>
			<Input
				{...props}
				id={fieldName}
				aria-labelledby={listIndex !== undefined ? name + "_label" : undefined}
				value={value}
				placeholder={
					typeof placeholder == "object"
						? intl.formatMessage(placeholder)
						: undefined
				}
				required={!!required}
			/>
		</Field>
	);
};

export default injectIntl(InputField);
