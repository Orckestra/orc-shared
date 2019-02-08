import React from "react";
import styled, { withTheme } from "styled-components";
import { compose, mapProps } from "recompose";
import routingConnector from "../../hocs/routingConnector";
import { getThemeProp } from "../../utils";
import { getCurrentScope } from "../../selectors/navigation";
import MenuItem from "./MenuItem";

export const Bar = styled.div`
	box-sizing: border-box;
	padding-top: 60px;
	height: calc(100% - 40px);
	width: 200px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	color: #999999;
`;

export const MenuToggle = withTheme(({ open, toggle, theme }) => (
	<MenuItem
		menu
		open={open}
		icon={(open
			? getThemeProp(["icons", "sidebarOpen"], "layers")
			: getThemeProp(["icons", "sidebarClosed"], "menu"))({ theme })}
		onClick={toggle}
	/>
));

export const EnhancedMenuItem = compose(
	routingConnector(state => ({ scope: getCurrentScope(state) })),
	mapProps(({ scope, id, ...remainder }) => ({
		href: `/${scope}/${id}`,
		id,
		...remainder,
	})),
)(MenuItem);

const Sidebar = ({ open, toggle, modules = [] }) => {
	return (
		<Bar open={open}>
			<MenuToggle open={open} toggle={toggle} />
			{modules.map(item => (
				<EnhancedMenuItem key={item.id} {...item} open={open} />
			))}
		</Bar>
	);
};

export default Sidebar;
