import React from "react";
import styled, { css } from "styled-components";
import Text from "./Text";
import { getThemeProp, ifFlag } from "../utils";
import withId from "../hocs/withId";

const switchSpeed = 200;
export const Wrapper = styled.label`
	display: inline-block;
	position: relative;
	height: 1.2em;
	width: 5em;
	border-radius: 0.6em;
	display: flex;
	cursor: pointer;
	${ifFlag(
		"value",
		css`
			color: #ffffff;
			background-color: ${ifFlag(
				"onColor",
				props => props.onColor,
				getThemeProp(["appHighlightColor"], "#ff0000"),
			)};
		`,
		css`
			color: #333;
			background-color: ${ifFlag(
				"offColor",
				props => props.offColor,
				"#cccccc",
			)};
		`,
	)};
	transition: background-color ${switchSpeed}ms ease-in,
		color ${switchSpeed}ms ease-in;

	&::after {
		content: "";
		position: absolute;
		top: 2px;
		height: calc(1.2em - 4px);
		left: calc(50% - (0.5 * (1.2em - 4px)));
		width: calc(1.2em - 4px);
		background-color: #ffffff;
		border-radius: 50%;
		transition: transform ${switchSpeed}ms ease-in;

		${ifFlag(
			"value",
			css`
				transform: translateX(-1.9em);
			`,
			css`
				transform: translateX(1.9em);
			`,
		)};
	}

	&:focus-within,
	&:hover {
		box-shadow: 0 0 4px #4fa1f0;
	}
`;

export const Caption = styled.span`
	position: absolute;
	left: 1.4em;
	right: 1.4em;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	text-align: center;
	font-size: 0.8em;
	${ifFlag(
		"value",
		css`
			opacity: 1;
			transition: opacity ${0.7 * switchSpeed}ms ${0.3 * switchSpeed}ms ease-in;
		`,
		css`
			opacity: 0;
			transition: opacity ${0.7 * switchSpeed}ms ease-in;
		`,
	)};
`;

export const ContainedCheckbox = styled.input.attrs({ type: "checkbox" })`
	position: absolute;
	opacity: 0;
`;

export const Switch = ({
	value,
	onCaption,
	offCaption,
	onColor,
	offColor,
	id,
	...checkboxProps
}) => (
	<Wrapper htmlFor={id} value={value} onColor={onColor} offColor={offColor}>
		<ContainedCheckbox id={id} {...checkboxProps} checked={value} />
		{onCaption ? (
			<Caption value={value}>
				<Text message={onCaption} />
			</Caption>
		) : null}
		{offCaption ? (
			<Caption value={!value}>
				<Text message={offCaption} />
			</Caption>
		) : null}
	</Wrapper>
);

export default withId("switch")(Switch);
