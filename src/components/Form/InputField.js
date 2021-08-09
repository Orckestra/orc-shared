import React, { useCallback, useContext } from "react";
import { useIntl } from "react-intl";
import useViewState from "../../hooks/useViewState";
import { FormContext } from "./Form";
import inputs from "./Inputs";
import Field from "./Field";

export const InputField = ({ name, type = "undefined", label, labelOnly, placeholder, required, ...props }) => {
	const { values, listIndex, formName } = useContext(FormContext);
	let fieldName = name;
	if (listIndex !== undefined) {
		fieldName += "[" + listIndex + "]";
	}
	const fullId = formName ? `${formName}_${fieldName}` : `field_${fieldName}`;
	const [{ wasBlurred }, updateViewState] = useViewState(fullId);
	const { [name]: value = "" } = values;
	props.onBlur = useCallback(() => updateViewState("wasBlurred", true), [updateViewState]);
	const { formatMessage } = useIntl();
	const Input = inputs[type];
	if (!Input) {
		console.error(`Unknown type "${type}", cannot render field`);
		return <p>Cannot render unknown type "{type}"</p>;
	}
	return (
		<Field
			id={fieldName}
			label={label}
			labelOnly={labelOnly}
			center={type === "SwitchInput" || type === "CheckboxInput"}
			required={required}
			invalid={wasBlurred && required && !(Array.isArray(value) ? value.length : value)}
		>
			<Input
				{...props}
				id={fieldName}
				aria-labelledby={listIndex !== undefined ? name + "_label" : undefined}
				data-test-id={fullId}
				value={value}
				placeholder={typeof placeholder == "object" ? formatMessage(placeholder) : undefined}
				required={required && wasBlurred}
			/>
		</Field>
	);
};

export default InputField;
