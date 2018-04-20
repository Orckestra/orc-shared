import React from "react";
import styled from "styled-components";
import transition from "styled-transition-group";
import Icon from "../Icon";

export const Drawer = transition.ul`
	position: absolute;
	color: #333;
	background-color: white;
	border: 1px solid #999999;
	border-radius: 5px;
	z-index: 19999;
	list-style-type: none;
	padding: 5px 0;
	margin: 4px 0 0;
	font-family: Open Sans, sans-serif;
	font-size: 12px;

	transition: opacity ${props => props.timeout}ms ease-out;

	&:enter {
		opacity: 0.01;
	}
	&:enter-active {
		opacity: 1;
	}
	&:exit {
		opacity: 1;
	}
	&:exit-active {
		opacity: 0.01;
	}
`;
Drawer.defaultProps = {
	unmountOnExit: true,
	timeout: 100,
};

export const Item = styled.li`
	box-sizing: border-box;
	height: 30px;
	min-width: 178px;
	padding: 9px 12px;
	display: flex;
	align-items: center;
	cursor: pointer;

	&:hover {
		background-color: ${props => props.theme.appHighlightColor};
		color: white;
	}
`;
Item.defaultProps = {
	// A default value for when no theme is provided.
	theme: {
		appHighlightColor: "#ffffff",
	},
};

export const ItemIcon = styled(Icon)`
	padding-right: 11px;
	font-size: 17px;
`;

const Menu = ({ open, menuItems }) => (
	<Drawer in={open}>
		{menuItems.map(item => (
			<Item key={item.label + item.icon} onClick={item.handler}>
				<ItemIcon id={item.icon} />
				<span>{item.label}</span>
			</Item>
		))}
	</Drawer>
);

export default Menu;
