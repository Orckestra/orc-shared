import React from "react";
import styled from "styled-components";
import { getThemeProp } from "../utils";
import Text from "./Text";

const TooltipBubble = styled.label`
	display: block;
	position: absolute;
	top: 50%;
	right: -10px;
	transform: translate(-99999px, -50%);
	color: #333;
	background-color: #fff;
	border: 1px solid #cccccc;
	border-radius: 3px;
	padding: 0 3px;
	transition: transform 0s;
	cursor: default;
	font-family: ${getThemeProp(["fonts", "base"], "sans-serif")};
	text-transform: none;

	*:hover > & {
		transform: translate(100%, -50%);
		transition: transform 1.5s step-end;
	}

	&::before {
		content: "";
		position: absolute;
		top: 4px;
		left: -10px;
		border: 5px solid transparent;
		border-right-color: #cccccc;
	}

	&::after {
		content: "";
		position: absolute;
		top: 4px;
		left: -9px;
		border: 5px solid transparent;
		border-right-color: #ffffff;
	}
`;

export const Tooltip = ({ htmlFor, message }) => (
	<TooltipBubble htmlFor={htmlFor}>
		<Text message={message} />
	</TooltipBubble>
);

export default Tooltip;
