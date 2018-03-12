import React from "react";
import styled, { css } from "styled-components";
import Icon from "../Icon";

const MenuBlock = styled.a`
	display: block;
	padding: 0 10px;
	margin-bottom: 35px;
	color: ${props => (props.active ? props.theme.appHighlightColor : "#999999")};
	text-decoration: none;

	${props =>
		props.open
			? css`
					transform: translateX(19px);
			  `
			: ""};
	transition: transform 0.3s ease-out;
	${props =>
		props.menu
			? ""
			: css`
					&:hover {
						color: ${props.theme.appHighlightColor};
					}
			  `};
`;

MenuBlock.defaultProps = {
	// A default value for when no theme is provided.
	theme: {
		appHighlightColor: "#ffffff",
	},
};

const MenuIcon = styled(Icon)`
	font-size: 24px;
	vertical-align: middle;
`;

const MenuLabel = styled.span`
	font-family: Roboto Condensed, sans-serif;
	font-size: 13px;
	vertical-align: middle;
	text-transform: uppercase;
	padding-left: 21px;

	transition: opacity 0.3s ease-out;
	opacity: ${props => (props.open ? 1 : 0)};
`;

const MenuItem = ({
	open,
	menu,
	label = "",
	icon = "cake",
	href,
	onClick = () => {},
}) => (
	<MenuBlock menu={menu} open={open} onClick={onClick} href={href}>
		<MenuIcon id={icon} />
		<MenuLabel open={open}>{label}</MenuLabel>
	</MenuBlock>
);

export default MenuItem;
