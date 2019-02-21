import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import Icon from "../Icon";

const FilteredLink = ({
	menuToggle,
	staticContext,
	dispatch,
	active,
	component,
	...props
}) => <Link {...props} />;

export const Block = styled(FilteredLink)`
	display: block;
	padding: 0 10px;
	margin-bottom: 35px;
	color: ${props => (props.active ? props.theme.appHighlightColor : "#999999")};
	text-decoration: none;
	cursor: pointer;

	${props =>
		props.menuToggle
			? ""
			: css`
					&:hover {
						color: ${props.theme.appHighlightColor};
					}
			  `};
`;

Block.defaultProps = {
	// A default value for when no theme is provided.
	theme: {
		appHighlightColor: "#ffffff",
	},
};

export const MenuIcon = styled(Icon)`
	font-size: 24px;
	vertical-align: middle;
`;

export const Label = styled.span`
	font-family: Roboto Condensed, sans-serif;
	font-size: 13px;
	vertical-align: middle;
	text-transform: uppercase;
	padding-left: 10px;

	transition: opacity 0.3s ease-out;
	opacity: ${props => (props.show ? 1 : 0)};
`;

const MenuItem = ({ open = false, label = "", icon, href, ...props }) => {
	let ItemWrapper = Block;
	if (props.menuToggle) {
		ItemWrapper = Block.withComponent("a");
	}
	return (
		<ItemWrapper to={href} {...props}>
			<MenuIcon id={icon} />
			<Label show={open}>{label}</Label>
		</ItemWrapper>
	);
};

export default MenuItem;
