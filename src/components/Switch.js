import React from "react";
import styled, { css } from "styled-components";
import { withPropsOnChange } from "recompose";
import { FormattedMessage } from "react-intl";
import { getThemeProp, ifFlag } from "../utils";

// If no id set, sets a unique-ish id on the component.
let idCounter = 0;
const setDomId = () => "switch" + idCounter++;
const withId = withPropsOnChange(
	() => false, // Never update id once mounted
	({ id }) => ({ id: id || setDomId() }),
);

const switchSpeed = 200;
export const Wrapper = styled.label`
	display: inline-block;
	position: relative;
	height: 1.2em;
	width: 5em;
	border-radius: 0.6em;
	display: flex;
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
`;

export const OnCaption = styled.span`
	position: absolute;
	left: 1.4em;
	right: 0.5em;
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
export const OffCaption = styled.span`
	position: absolute;
	right: 1.4em;
	left: 0.5em;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	text-align: center;
	font-size: 0.8em;
	${ifFlag(
		"value",
		css`
			opacity: 0;
			transition: opacity ${0.7 * switchSpeed}ms ease-in;
		`,
		css`
			opacity: 1;
			transition: opacity ${0.7 * switchSpeed}ms ${0.3 * switchSpeed}ms ease-in;
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
			<OnCaption value={value}>
				<FormattedMessage {...onCaption} />
			</OnCaption>
		) : null}
		{offCaption ? (
			<OffCaption value={value}>
				<FormattedMessage {...offCaption} />
			</OffCaption>
		) : null}
	</Wrapper>
);

export default withId(Switch);
