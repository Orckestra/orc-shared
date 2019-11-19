import React from "react";
import { compose, withHandlers } from "recompose";
import { memoize } from "../utils";
import withId from "../hocs/withId";
import Text from "./Text";
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
	selectAll: ({ update, options }) => () =>
		update(options.map(opt => opt.value)),
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
	selectAll,
	clickOption,
	selectAllMessage = "[Select all]",
	clearMessage = "[Clear]",
	placeholder = "",
	required,
	...props
}) => (
	<Wrapper>
		<InnerSelect
			id={id}
			onChange={onChange}
			value={value}
			multiple
			required={required}
			{...props}
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
			{value.length ? (
				<Option key="multiselect_clear" onClick={clearValue}>
					<Text message={clearMessage} />
				</Option>
			) : null}
			{value.length === options.length ? null : (
				<Option key="multiselect_selectAll" onClick={selectAll}>
					<Text message={selectAllMessage} />
				</Option>
			)}
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
