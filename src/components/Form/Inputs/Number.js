import React, { useCallback } from "react";
import { FormInput } from "./Text";
import { ButtonWrapper, Spinners, InputButton } from "./FieldButtons";

export const roundToStep = (num, step) => {
	const parsedNum = parseFloat(num);
	if (Number.isNaN(parsedNum) || Number.isNaN(parseFloat(step))) {
		return "";
	}
	const factor = 1 / parseFloat(step);
	return Math.floor((parsedNum + 0.5 * step) * factor + Number.EPSILON) / factor;
};

const nullNaN = (num, nil = 0) => (Number.isNaN(num) ? nil : num);

const containNumber = (number, max = Number.MAX_VALUE, min = -Number.MAX_VALUE) =>
	Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : number;

export const NumberInput = ({ update, min, max, value = "", step, required, ...props }) => {
	const onChange = useCallback(
		e =>
			step
				? update(containNumber(roundToStep(e.target.value, step), max, min))
				: update(containNumber(nullNaN(parseFloat(e.target.value), ""), max, min)),
		[update, step, min, max],
	);
	const increment = useCallback(
		() =>
			step
				? update(containNumber(roundToStep(value + step, step), max, undefined))
				: update(containNumber(nullNaN(parseFloat(value)) + 1, max, undefined)),
		[update, value, step, max],
	);
	const decrement = useCallback(
		() =>
			step
				? update(containNumber(roundToStep(value - step, step), undefined, min))
				: update(containNumber(nullNaN(parseFloat(value)) - 1, undefined, min)),
		[update, value, step, min],
	);
	return (
		<ButtonWrapper invalid={required && !value}>
			<FormInput
				type="number"
				step={step}
				value={step ? roundToStep(value, step) : value}
				onChange={onChange}
				{...props}
			/>
			<Spinners>
				<InputButton onClick={increment} data-test-id="up">
					⮝
				</InputButton>
				<InputButton onClick={decrement} data-test-id="down">
					⮟
				</InputButton>
			</Spinners>
		</ButtonWrapper>
	);
};
