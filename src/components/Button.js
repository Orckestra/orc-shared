import styled, { css } from "styled-components";
import { getThemeProp, ifFlag } from "../utils";
import { tint } from "polished";

const borderColor = base =>
	ifFlag("primary", getThemeProp(["colors", "application", "base"], base), base);

const background = ifFlag(
	"primary",
	ifFlag(
		"active",
		css`
			color: #fff;
			background-image: linear-gradient(
				${getThemeProp(["colors", "application", "base"], "#333", color =>
					tint(0.05, color),
				)},
				${getThemeProp(["colors", "application", "base"], "#333")}
			);
			&:enabled:active {
				background-image: none;
				background-color: #fff;
				color: ${getThemeProp(["colors", "application", "base"], "#333")};
			}
		`,
		css`
			color: ${getThemeProp(["colors", "application", "base"], "#333")};
			background-image: none;
			background-color: #fff;
			&:enabled:active {
				color: #fff;
				background-image: linear-gradient(
					${getThemeProp(["colors", "application", "base"], "#333", color =>
						tint(0.05, color),
					)},
					${getThemeProp(["colors", "application", "base"], "#333")}
				);
			}
		`,
	),
	ifFlag(
		"active",
		css`
			background-image: none;
			background-color: ${getThemeProp(["colors", "bgLight"], "#efefef")};
			&:enabled:active {
				background-color: #f7f7f7;
			}
		`,
		css`
			background-image: none;
			background-color: #f7f7f7;
			&:enabled:active {
				background-color: ${getThemeProp(["colors", "bgLight"], "#efefef")};
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
	border: 1px solid ${borderColor(getThemeProp(["colors", "borderLight"], "#cccccc"))};
	outline: none;
	font-family: ${getThemeProp(["fonts", "header"], "sans-serif")};
	text-transform: uppercase;
	min-width: 50px;
	box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
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
