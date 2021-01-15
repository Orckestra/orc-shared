import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { memoize } from "../utils";
import withId from "../hocs/withId";
import Text from "./Text";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { InnerSelect, Wrapper, SelectBox, Dropdown, Option, Placeholder } from "./Selector";

export const SelectedValue = styled.span`
	display: inline-block;
	width: calc(100% - 20px);
	white-space: pre;
`;

const arrayToggle = (arr, item) => {
	const output = arr.filter(val => val !== item);
	if (output.length < arr.length) {
		return output;
	}
	output.push(item);
	return output;
};

const labelFromOptions = options => options.map(option => option.label).join(", ");

export const MultiSelector = ({
	id,
	value = [],
	options,
	update,
	selectAllMessage = "[Select all]",
	clearMessage = "[Clear]",
	placeholder = "",
	required,
	...props
}) => {
	const selectAll = useCallback(() => update(options.map(opt => opt.value)), [update, options]);
	const clearValue = useCallback(() => update([]), [update]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const clickOption = useCallback(
		memoize(clickValue => () => update(arrayToggle(value, clickValue))),
		[update, value],
	);
	const onChange = useCallback(e => update(arrayToggle(value, e.target.value)), [update, value]);
	const [isVisible, setIsVisible] = useState(false);
	/* istanbul ignore next */
	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	/* istanbul ignore next */
	const handlerClickAway = () => {
		setIsVisible(false);
	};

	/* istanbul ignore next */
	return (
		<ClickAwayListener onClickAway={() => handlerClickAway()}>
			<Wrapper>
				<InnerSelect id={id} onChange={onChange} value={value} multiple required={required} {...props}>
					{options.map(option => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</InnerSelect>
				<SelectBox htmlFor={id} onClick={() => toggleVisibility()}>
					{value.length ? (
						<SelectedValue>
							{labelFromOptions(options.filter(option => value.indexOf(option.value) !== -1))}
						</SelectedValue>
					) : (
							<Placeholder>{placeholder}</Placeholder>
						)}
				</SelectBox>
				<Dropdown isVisible={isVisible}>
					{value.length ? (
						<Option key="multiselect_clear" onClick={clearValue} data-test-id="multiselect_clear">
							<Text message={clearMessage} />
						</Option>
					) : null}
					{value.length === options.length ? null : (
						<Option key="multiselect_selectAll" onClick={selectAll} data-test-id="multiselect_selectAll">
							<Text message={selectAllMessage} />
						</Option>
					)}
					{options.map(option => (
						<Option
							key={option.value}
							active={value.indexOf(option.value) !== -1}
							onClick={clickOption(option.value)}
							data-test-id={option.value}
						>
							{option.label}
						</Option>
					))}
				</Dropdown>
			</Wrapper>
		</ClickAwayListener>
	);
};

export default withId("selector")(MultiSelector);
