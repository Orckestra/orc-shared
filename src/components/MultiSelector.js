import React from "react";
import { compose, withHandlers } from "recompose";
import { memoize } from "../utils";
import withId from "../hocs/withId";
import {
	InnerSelect,
	Wrapper,
	SelectBox,
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
	clickOption: ({ update, value = [] }) =>
		memoize(clickValue => () => update(arrayToggle(value, clickValue))),
	onChange: ({ update, value = [] }) => e =>
		update(arrayToggle(value, e.target.value)),
});

export const Selector = ({
	id,
	value = [],
	options,
	onChange,
	clickOption,
	placeholder = "",
}) => (
	<Wrapper>
		<InnerSelect id={id} onChange={onChange} value={value} multiple>
			{options.map(option => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</InnerSelect>
		<SelectBox htmlFor={id}>
			{options
				.filter(option => value.indexOf(option.value) !== -1)
				.map(option => option.label)
				.join(", ") || <Placeholder>{placeholder}</Placeholder>}
		</SelectBox>
		<Dropdown>
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
)(Selector);
