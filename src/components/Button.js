import styled, { css } from "styled-components";
import { getThemeProp, ifFlag } from "../utils";
import { tint } from "polished";

const borderColor = base =>
	ifFlag("primary", getThemeProp(["appHighlightColor"], base), base);

const background = ifFlag(
	"primary",
	ifFlag(
		"active",
		css`
			background-image: none;
			background-color: #fff;
			color: ${getThemeProp(["appHighlightColor"], "#333")};
		`,
		css`
			background-image: linear-gradient(
				${getThemeProp(["appHighlightColor"], "#333", color =>
					tint(0.05, color),
				)},
				${getThemeProp(["appHighlightColor"], "#333")}
			);
			color: #fff;
			&:enabled:active {
				background-image: none;
				background-color: #fff;
				color: ${getThemeProp(["appHighlightColor"], "#333")};
			}
		`,
	),
	ifFlag(
		"active",
		css`
			background-image: none;
			background-color: #efefef;
		`,
		css`
			background-image: none;
			background-color: #f7f7f7;
			&:enabled:active {
				background-color: #efefef;
			}
		`,
	),
);

const Button = styled.button`
	display: inline-block;
	margin: 0;
	font-weight: 400;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	white-space: nowrap;
	padding: 6px 10px;
	font-size: 13px;
	line-height: 1.42857;
	border-radius: 4px;
	user-select: none;
	height: 30px;
	border: 1px solid ${borderColor("#ccc")};
	outline: none;
	font-family: ${getThemeProp(["fonts", "header"], "sans-serif")};
	text-transform: uppercase;
	min-width: 50px;
	${background};

	&:enabled:active,
	&:enabled:focus,
	&:enabled:hover {
		border-color: ${borderColor("#4fa1f0")};
		box-shadow: 0 0 4px #4fa1f0;
		outline: none;
	}

	&:disabled {
		opacity: 0.6;
		cursor: default;
	}
`;

export default Button;
