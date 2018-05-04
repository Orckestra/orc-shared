import React from "react";
import styled from "styled-components";
import Icon from "../Icon";

export const Header = styled.div`
	cursor: pointer;
	color: ${props => (props.open ? props.theme.appHighlightColor : "#ccc")};

	&:hover {
		color: ${props => props.theme.appHighlightColor};
	}
`;
Header.defaultProps = {
	// A default value for when no theme is provided.
	theme: {
		appHighlightColor: "#ffffff",
	},
};

export const Indicator = styled(Icon)`
	font-size: 10px;
	padding: 0 11px;
	color: ${props => (props.open ? "#ccc" : props.theme.appHighlightColor)};
`;
Indicator.defaultProps = {
	// A default value for when no theme is provided.
	theme: {
		appHighlightColor: "#ffffff",
	},
};

const Anchor = ({ onClick, className, menuLabel, open }) => (
	<Header {...{ onClick, className, open }}>
		{menuLabel}
		<Indicator id={open ? "chevron-up" : "chevron-down"} open={open} />
	</Header>
);

export default Anchor;
