import React from "react";
import { withHandlers } from "recompose";
import { FormInput } from "./Text";
import { ButtonWrapper, Spinners, InputButton } from "./FieldButtons";

export const roundToStep = (num, step) => {
	const parsedNum = parseFloat(num);
	if (Number.isNaN(parsedNum) || Number.isNaN(parseFloat(step))) {
		return "";
	}
	const factor = 1 / parseFloat(step);
	return Math.round((parsedNum + Number.EPSILON) * factor) / factor;
};

const nullNaN = (num, nil = 0) => (Number.isNaN(num) ? nil : num);

export const withNumberHandlers = withHandlers({
	onChange: ({ update, step }) =>
		step
			? e => update(roundToStep(e.target.value, step))
			: e => update(nullNaN(parseFloat(e.target.value), "")),
	increment: ({ update, value, step }) =>
		step
			? () => update(roundToStep(value + step, step))
			: () => update(nullNaN(parseFloat(value)) + 1),
	decrement: ({ update, value, step }) =>
		step
			? () => update(roundToStep(value - step, step))
			: () => update(nullNaN(parseFloat(value)) - 1),
});

export const NumberInput = withNumberHandlers(
	({ value = "", step, increment, decrement, ...props }) => (
		<ButtonWrapper>
			<FormInput
				type="number"
				step={step}
				value={step ? roundToStep(value, step) : value}
				{...props}
			/>
			<Spinners>
				<InputButton onClick={increment}>⮝</InputButton>
				<InputButton onClick={decrement}>⮟</InputButton>
			</Spinners>
		</ButtonWrapper>
	),
);
