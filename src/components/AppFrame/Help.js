import React from "react";
import styled from "styled-components";
import Text from "../Text";
import { getThemeProp } from "../../utils";
import sharedMessages from "./../../sharedMessages";

export const HelpLink = styled.a`
	font-family: ${getThemeProp(["fonts", "header"], "sans-serif")};
	font-size: 12px;
	text-transform: uppercase;
	color: ${getThemeProp(["colors", "textLight"], "#cccccc")};
	width: 40px;
	cursor: pointer;
	padding-top: 14px;
	padding-right: 10px;
	text-decoration: none;
	&:hover {
		color: ${getThemeProp(["colors", "application", "base"], "#cccccc")};
	}
`;

const Help = ({ helpUrl }) => {
	return (
		<HelpLink href={helpUrl} target="_blank">
			<Text message={sharedMessages.help} />
		</HelpLink>
	);
};

export default Help;
