// @flow
import React from "react";
import type { ComponentType, StatelessFunctionalComponent } from "react";
import styled from "styled-components";
import ApplicationSelector from "./ApplicationSelector";
import MenuItem from "./MenuItem";
import type { MenuItemProps } from "./MenuItem";
import type { ApplicationListProps } from "./ApplicationSelector/types";

const LeftBar = styled.div`
	height: calc(100% - 30px);
	width: 280px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	color: #999999;
`;

type Comp = ComponentType<*>;
type HOC = Comp => Comp;

const memo: {
	lastParams?: [HOC, Comp],
	lastReturn?: Comp,
} = {};

// Memoized factory function to prevent wasting time recreating the same component
const getEnhancedMenuItem = (hoc: HOC, comp: Comp): Comp => {
	if (
		memo.lastReturn &&
		memo.lastParams &&
		memo.lastParams[0] === hoc &&
		memo.lastParams[1] === comp
	) {
		return memo.lastReturn;
	} else {
		memo.lastParams = [hoc, comp];
		const enhancedComp = hoc(comp);
		memo.lastReturn = enhancedComp;
		return enhancedComp;
	}
};

type SidebarMenuProps = {
	open: boolean,
	openMenu: () => void,
	closeMenu: () => void,
};

export type SidebarConfigProps = {
	itemHOC: HOC,
	items: Array<MenuItemProps>,
} & ApplicationListProps;

type SidebarProps = SidebarConfigProps & SidebarMenuProps;

const Sidebar: StatelessFunctionalComponent<SidebarProps> = ({
	applications,
	applicationId,
	applicationOrder,
	open,
	openMenu,
	closeMenu,
	itemHOC = x => x,
	items = [],
}: SidebarProps) => {
	const EnhancedMenuItem = getEnhancedMenuItem(itemHOC, MenuItem);
	return (
		<LeftBar>
			<ApplicationSelector
				open={open}
				applications={applications}
				applicationId={applicationId}
				applicationOrder={applicationOrder}
			/>
			<MenuItem
				menu
				open={open}
				icon={open ? "layers" : "menu"}
				onClick={open ? closeMenu : openMenu}
			/>
			{items.map(item => (
				<EnhancedMenuItem key={item.icon} {...item} open={open} />
			))}
		</LeftBar>
	);
};

export default Sidebar;
