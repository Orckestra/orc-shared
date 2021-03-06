import React from "react";
import styled from "styled-components";
import { getThemeProp } from "../utils";
import Text from "./Text";

export const TooltipBubble = styled.div`
	position: absolute;
	top: 50%;
	right: -10px;
	transform: translate(-99999px, -50%);
	color: ${getThemeProp(["colors", "text"], "#333333")};
	background-color: #fff;
	border: 1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};
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
		border-right-color: ${getThemeProp(["colors", "borderLight"], "#cccccc")};
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

const Tooltip = ({ message }) => (
	<TooltipBubble>
		<Text message={message} />
	</TooltipBubble>
);

export default Tooltip;
