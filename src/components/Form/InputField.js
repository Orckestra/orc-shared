import React from "react";
import { injectIntl } from "react-intl";
import { withStateHandlers } from "recompose";
import { memoize } from "../../utils";
import inputs from "./Inputs";
import Field from "./Field";

/* istanbul ignore next */
export const withBlurFlag = withStateHandlers(() => ({ wasBlurred: false }), {
	setBlurred: () => () => ({ wasBlurred: true }),
});

/* istanbul ignore next */
const getOnBlur = memoize(func => () => {
	window.setTimeout(func, 500);
});

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
	wasBlurred,
	setBlurred,
	...props
}) => {
	const { formatMessage } = intl;
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
				onBlur={getOnBlur(setBlurred)}
				required={required && wasBlurred}
			/>
		</Field>
	);
};

export default injectIntl(withBlurFlag(InputField));
