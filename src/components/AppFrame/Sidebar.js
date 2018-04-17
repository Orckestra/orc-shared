// @flow
import React from "react";
import type { StatelessFunctionalComponent } from "react";
import styled from "styled-components";
import ApplicationSelector from "./ApplicationSelector";
import MenuItem from "./MenuItem";
import type { MenuItemProps } from "./MenuItem";
import type { ApplicationListProps } from "./ApplicationSelector/types";
import getEnhancedComponent from "./getEnhancedComponent";
import type { BaseHOC } from "./getEnhancedComponent";

const LeftBar = styled.div`
	height: calc(100% - 30px);
	width: 280px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	color: #999999;

	& > * {
		transition: transform 0.3s ease-out;
		transform: translateX(${props => (props.open ? 19 : 0)}px);
	}
`;

// Memoized factory function to prevent wasting time recreating the same component
const getEnhancedMenuItem = getEnhancedComponent();

type SidebarMenuProps = {
	open: boolean,
	openMenu: () => void,
	closeMenu: () => void,
	linkHOC: BaseHOC,
};

export type SidebarConfigProps = {
	pages: Array<MenuItemProps>,
} & ApplicationListProps;

type SidebarProps = SidebarConfigProps & SidebarMenuProps;

const Sidebar: StatelessFunctionalComponent<SidebarProps> = ({
	applications,
	applicationId,
	open,
	openMenu,
	closeMenu,
	linkHOC = x => x,
	pages = [],
}) => {
	const EnhancedMenuItem = getEnhancedMenuItem(linkHOC, MenuItem);
	return (
		<LeftBar open={open}>
			<ApplicationSelector
				open={open}
				applications={applications}
				applicationId={applicationId}
			/>
			<MenuItem
				menu
				open={open}
				icon={open ? "layers" : "menu"}
				onClick={open ? closeMenu : openMenu}
			/>
			{pages.map(item => (
				<EnhancedMenuItem key={item.icon} {...item} open={open} />
			))}
		</LeftBar>
	);
};

export default Sidebar;
