import React from "react";
import { compose, withHandlers } from "recompose";
import { memoize } from "../utils";
import withId from "../hocs/withId";
import {
	InnerSelect,
	Wrapper,
	SelectBox,
	SelectedValue,
	Dropdown,
	Option,
	Placeholder,
} from "./Selector";

const arrayToggle = (arr, item) => {
	const output = arr.filter(val => val !== item);
	if (output.length < arr.length) {
		return output;
	}
	output.push(item);
	return output;
};

const withSelectHandlers = withHandlers({
	clearValue: ({ update }) => () => update([]),
	clickOption: ({ update, value = [] }) =>
		memoize(clickValue => () => update(arrayToggle(value, clickValue))),
	onChange: ({ update, value = [] }) => e =>
		update(arrayToggle(value, e.target.value)),
});

const labelFromOptions = options =>
	options.map(option => option.label).join(", ");

export const MultiSelector = ({
	id,
	value = [],
	options,
	onChange,
	clearValue,
	clickOption,
	clearMessage = "Clear",
	placeholder = "",
	required,
}) => (
	<Wrapper>
		<InnerSelect
			id={id}
			onChange={onChange}
			value={value}
			multiple
			required={required}
		>
			{options.map(option => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</InnerSelect>
		<SelectBox htmlFor={id}>
			{value.length ? (
				<SelectedValue>
					{labelFromOptions(
						options.filter(option => value.indexOf(option.value) !== -1),
					)}
				</SelectedValue>
			) : (
				<Placeholder>{placeholder}</Placeholder>
			)}
		</SelectBox>
		<Dropdown>
			<Option key="multiselect_clear" onClick={clearValue}>
				{clearMessage}
			</Option>
			{options.map(option => (
				<Option
					key={option.value}
					active={value.indexOf(option.value) !== -1}
					onClick={clickOption(option.value)}
				>
					{option.label}
				</Option>
			))}
		</Dropdown>
	</Wrapper>
);

export default compose(
	withSelectHandlers,
	withId("selector"),
)(MultiSelector);
