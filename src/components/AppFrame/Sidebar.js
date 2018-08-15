import React from "react";
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { compose, mapProps } from "recompose";
import { getThemeProp } from "../../utils";
import withNavigationLink from "../../hocs/withNavigationLink";
import { getCurrentScope } from "../../selectors/route";
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
	connect(state => ({ scope: getCurrentScope(state) })),
	mapProps(({ scope, id, ...remainder }) => ({
		href: `/${scope}/${id}`,
		id,
		...remainder,
	})),
	withNavigationLink,
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
