import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { getThemeProp, ifFlag, memoize } from "../utils";
import withId from "../hocs/withId";

export const InnerSelect = styled.select`
	position: absolute;
	opacity: 0;
	font-size: 0;
	height: 0;
	width: 0;
	border: 0 none transparent;
	z-index: -1;
	transform: translateX(-99px);
`;

export const Wrapper = styled.div`
	position: relative;
	cursor: pointer;
	font-size: 12px;
`;

export const SelectBox = styled.label`
	position: relative;
	box-sizing: border-box;
	display: block;
	min-height: 30px;
	max-height: 70px;
	overflow: hidden;
	padding: 5px 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
	background-color: white;

	&::before {
		content: " ";
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		box-shadow: 0 -10px 5px -5px inset white;
	}

	&::after {
		content: "ˇ";
		font-family: courier, monospace;
		font-size: 32px;
		position: absolute;
		right: 10px;
		top: 6px;
	}

	${InnerSelect}:focus + & {
		border-color: #4fa1f0;
		box-shadow: 0 0 4px #4fa1f0;
	}

	${InnerSelect}:focus + &::after {
		transform: rotate(0.5turn);
		transform-origin: center 8px;
	}

	${InnerSelect}:invalid + & {
		border-color: ${getThemeProp(["colors", "error"], "#ce4844")};
		box-shadow: 0 0 4px ${getThemeProp(["colors", "error"], "#ce4844")};
	}
`;

export const SelectedValue = styled.span`
	display: inline-block;
	width: calc(100% - 20px);
	white-space: pre;
`;

export const Dropdown = styled.div`
	box-sizing: border-box;
	position: absolute;
	left: 0;
	top: calc(100% + 1px);
	z-index: 1;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 4px 0;
	width: 100%;
	max-height: 40vh;
	overflow-y: auto;
	background-color: white;
	opacity: 0;
	visibility: hidden;
	${/* Enables click handling on Options while closing dropdown */ ""};
	transition: visibility 0.4s step-end;

	${InnerSelect}:focus + ${SelectBox} + & {
		opacity: 1;
		visibility: visible;
		transition: visibility 0s step-end;
	}
`;

export const Option = styled.div`
	box-sizing: border-box;
	height: 30px;
	padding: 6px 12px;
	white-space: pre;
	${ifFlag(
		"active",
		css`
			background-color: #f0f0f0;
		`,
	)};

	&:hover {
		background-color: ${getThemeProp(["colors", "application", "base"], "#ccc")};
		color: #ffffff;
	}
`;

export const Placeholder = styled.span`
	color: rgb(117, 117, 117);
`;

export const Selector = ({
	id,
	value,
	options,
	update,
	placeholder = "",
	required,
	...props
}) => {
	const clickOption = useCallback(
		memoize(value => () => update(value)),
		[update],
	);
	const onChange = useCallback(e => update(e.target.value), [update]);
	return (
		<Wrapper>
			<InnerSelect
				id={id}
				onChange={onChange}
				value={value}
				required={required}
				{...props}
			>
				{required ? <option></option> : null}
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</InnerSelect>
			<SelectBox htmlFor={id}>
				{value ? (
					<SelectedValue>
						{
							options
								.filter(option => option.value === value)
								.map(option => option.label)[0]
						}
					</SelectedValue>
				) : (
					<Placeholder>{placeholder}</Placeholder>
				)}
			</SelectBox>
			<Dropdown>
				{options.map(option => (
					<Option
						key={option.value}
						active={option.value === value}
						onClick={clickOption(option.value)}
						data-test-id={option.value}
					>
						{option.label}
					</Option>
				))}
			</Dropdown>
		</Wrapper>
	);
};

export default withId("selector")(Selector);
