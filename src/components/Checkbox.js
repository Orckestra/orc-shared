import React from "react";
import styled, { css } from "styled-components";
import { getThemeProp, ifFlag } from "../utils";
import { tint } from "polished";
import withId from "../hocs/withId";

export const Wrapper = styled.label`
	padding: 10px 15px;
	margin: -10px -15px;
`;

export const ContainedInput = styled.input.attrs({ type: "checkbox" })`
	position: absolute;
	opacity: 0;
	z-index: 10;
	margin: 0;
`;

export const Cover = styled.label`
	display: inline-block;
	position: relative;
	height: 14px;
	width: 14px;
	border: 1px solid #ccc;
	border-radius: 3px;

	${ContainedInput}:active + &,
	${ContainedInput}:focus + & {
		box-shadow: 0px 0px 1px 0px
			${getThemeProp(["appHighlightColor"], "#777", color => tint(0.05, color))};
		border-color: ${getThemeProp(["appHighlightColor"], "#777")};
	}

	${ifFlag(
		"value",
		css`
			background-color: ${getThemeProp(["appHighlightColor"], "#777", color =>
				tint(0.05, color),
			)};
			&::after {
				content: "✔";
				font-size: 12px;
				line-height: 1;
				position: absolute;
				top: 1px;
				left: 0;
				right: 0;
				bottom: 0;
				color: white;
				text-align: center;
			}
		`,
		css`
			background-color: white;
		`,
	)};
`;

export const Checkbox = ({ value, className, id, ...otherProps }) => (
	<Wrapper className={className} htmlFor={id}>
		<ContainedInput value={value} id={id} {...otherProps} />
		<Cover value={value} htmlFor={id} />
	</Wrapper>
);

export default withId("checkbox")(Checkbox);
