import React from "react";
import styled from "styled-components";
import Text from "../Text";
import { getThemeProp } from "../../utils";

export const HelpLink = styled.a`
	font-family: ${getThemeProp(["fonts", "header"], "sans-serif")};
	font-size: 12px;
	text-transform: uppercase;
	color: ${getThemeProp(["colors", "textLight"], "#cccccc")};
	width: 40px;
	cursor: pointer;
	padding-top: 14px;
	padding-right: 10px;

	&:hover {
		color: ${getThemeProp(["colors", "application", "base"], "#cccccc")};
	}
`;

const Help = ({ messages, helpUrl }) => {
	const openHelp = e => {
		window.open(helpUrl, "_blank");
		e.preventDefault();
	};

	return (
		<HelpLink href={helpUrl} onClick={openHelp}>
			<Text message={messages.help} />
		</HelpLink>
	);
};

export default Help;
