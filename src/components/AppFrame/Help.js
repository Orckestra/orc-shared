import React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { getThemeProp } from "../../utils";

export const HelpWrapper = styled.div`
	font-family: Roboto Condensed, sans-serif;
	font-size: 14px;
	width: 40px;
	cursor: pointer;
	padding-top: 12px;
	padding-right: 10px;

	&:hover {
		color: ${getThemeProp(["colors", "application", "base"], "#ccc")};
	}
`;

const Help = ({ messages, helpUrl }) => {
	const intl = useIntl();
	const openHelp = () => window.open(helpUrl, "_blank");

	return (
		<HelpWrapper onClick={openHelp}>{intl.formatMessage(messages.help)}</HelpWrapper>
	);
};

export default Help;
