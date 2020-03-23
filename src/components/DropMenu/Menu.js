import React from "react";
import styled from "styled-components";
import transition from "styled-transition-group";
import { getThemeProp, safeGet } from "../../utils";
import Icon from "../Icon";
import Text from "../Text";
import withClickOutside from "../../hocs/withClickOutside";

export const Drawer = transition.div`
	position: absolute;
	z-index: 19999;
	margin: 4px 0 0;

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

export const List = withClickOutside(styled.ul`
	color: ${getThemeProp(["colors", "text"], "#333333")};
	background-color: white;
	border: 1px solid ${getThemeProp(["colors", "border"], "#999999")};
	border-radius: 5px;
	list-style-type: none;
	padding: 5px 0;
	margin: 0;
	font-family: Open Sans, sans-serif;
	font-size: 12px;
`);

export const Item = styled.li`
	box-sizing: border-box;
	height: 30px;
	min-width: 178px;
	padding: 9px 12px;
	display: flex;
	align-items: center;
	cursor: pointer;

	&:hover {
		background-color: ${getThemeProp(["colors", "application", "base"], "#ffffff")};
		color: white;
	}
`;

export const ItemIcon = styled(Icon)`
	padding-right: 11px;
	font-size: 17px;
`;

const Menu = ({ id, open, menuItems, reset }) => (
	<Drawer in={open}>
		<List id={id} onClickOutside={reset}>
			{menuItems.map(item => (
				<Item
					id={item.id}
					key={item.id || (item.label && safeGet(item.label, "id")) + (item.icon || "")}
					onClick={event => {
						reset();
						item.handler(event);
					}}
				>
					{item.icon ? <ItemIcon id={item.icon} /> : null}
					<Text message={item.label} />
				</Item>
			))}
		</List>
	</Drawer>
);

export default Menu;
