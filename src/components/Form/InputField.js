import React, { useState, useCallback, useContext } from "react";
import { useIntl } from "react-intl";
import { FormContext } from "./Form";
import inputs from "./Inputs";
import Field from "./Field";

export const InputField = ({
	name,
	type = "undefined",
	label,
	labelOnly,
	placeholder,
	required,
	...props
}) => {
	const [wasBlurred, setBlurred] = useState(false);
	const { values, listIndex } = useContext(FormContext);
	const { [name]: value = "" } = values;
	props.onBlur = useCallback(() => setBlurred(true), [setBlurred]);
	const { formatMessage } = useIntl();
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
			invalid={
				wasBlurred && required && !(Array.isArray(value) ? value.length : value)
			}
		>
			<Input
				{...props}
				id={fieldName}
				aria-labelledby={listIndex !== undefined ? name + "_label" : undefined}
				value={value}
				placeholder={
					typeof placeholder == "object"
						? formatMessage(placeholder)
						: undefined
				}
				required={required && wasBlurred}
			/>
		</Field>
	);
};

export default InputField;
