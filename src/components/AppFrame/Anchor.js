import React from "react";
import styled from "styled-components";
import { getThemeProp, ifFlag } from "../../utils";
import Icon from "../Icon";

export const Header = styled.div`
	display: flex;
	cursor: pointer;
	box-sizing: border-box;
	font-family: ${getThemeProp(["fonts", "header"], "sans-serif")};
	font-size: 12px;
	text-transform: uppercase;
	height: 40px;
	min-width: 180px;
	padding-top: 14px;
	padding-right: 14px;
	color: ${ifFlag(
		"open",
		getThemeProp(["colors", "application", "primary"], "#ccc"),
		"#ccc",
	)};

	&:hover {
		color: ${getThemeProp(["colors", "application", "primary"], "#ccc")};
	}
`;

export const Indicator = styled(Icon).attrs(props => ({
	id: ifFlag(
		"open",
		getThemeProp(["icons", "indicators", "up"], "chevron-up"),
		getThemeProp(["icons", "indicators", "down"], "chevron-down"),
	)(props),
}))`
	font-size: 12px;
	padding: 0 11px;
	color: ${ifFlag(
		"open",
		"#ccc",
		getThemeProp(["colors", "application", "primary"], "#ccc"),
	)};
`;

const Anchor = ({ menuLabel, open }) => (
	<Header {...{ open }}>
		{menuLabel}
		<Indicator open={open} />
	</Header>
);

export default Anchor;
