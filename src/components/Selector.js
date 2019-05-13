import React from "react";
import styled, { css } from "styled-components";
import { compose, withHandlers } from "recompose";
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
	box-sizing: border-box;
	display: block;
	height: 30px;
	padding: 5px 10px;
	border 1px solid #ccc;
	border-radius: 4px;
	background-color: white;

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
`;

export const SelectedValue = styled.span`
	white-space: nowrap;
	overflow: hidden;
	display: inline-block;
	text-overflow: ellipsis;
	width: calc(100% - 20px);
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
	visibility: hidden;

	${/* Enables click handling on Options while closing dropdown */ ""};
	transition: visibility 0.1s step-end;

	${InnerSelect}:focus + * + & {
		visibility: visible;
	}
`;

export const Option = styled.div`
	box-sizing: border-box;
	height: 30px;
	padding: 6px 12px;
	${ifFlag(
		"active",
		css`
			background-color: #f0f0f0;
		`,
	)};

	&:hover {
		background-color: ${getThemeProp(["appHighlightColor"], "#ccc")};
		color: #ffffff;
	}
`;

export const Placeholder = styled.span`
	color: rgb(117, 117, 117);
`;

const withSelectHandlers = withHandlers({
	clickOption: ({ update }) => memoize(value => () => update(value)),
	onChange: ({ update }) => e => update(e.target.value),
});

export const Selector = ({
	id,
	value,
	options,
	onChange,
	clickOption,
	placeholder = "",
}) => (
	<Wrapper>
		<InnerSelect id={id} onChange={onChange} value={value}>
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
