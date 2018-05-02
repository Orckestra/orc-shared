import React from "react";
import styled, { css } from "styled-components";
import ApplicationSelector from "./ApplicationSelector";
import MenuItem from "./MenuItem";
import getEnhancedComponent from "./getEnhancedComponent";

export const Bar = styled.div`
	height: calc(100% - 30px);
	width: 280px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	color: #999999;
`;

const childStyle = css`
	transition: transform 0.3s ease-out;
	transform: translateX(${props => (props.open ? 19 : 0)}px);
`;

export const SidebarAppSelector = styled(ApplicationSelector)`
	${childStyle};
`;
export const SidebarMenuItem = styled(MenuItem)`
	${childStyle};
`;

// Memoized factory function to prevent wasting time recreating the same component
const getEnhancedMenuItem = getEnhancedComponent();

const Sidebar = ({
	applications,
	applicationId,
	open,
	toggle,
	linkHOC = x => x,
	pages = [],
}) => {
	const EnhancedMenuItem = getEnhancedMenuItem(linkHOC, SidebarMenuItem);
	return (
		<Bar open={open}>
			<SidebarAppSelector
				{...{
					open,
					applications,
					applicationId,
				}}
			/>
			<SidebarMenuItem
				menu
				open={open}
				icon={open ? "layers" : "menu"}
				onClick={toggle}
			/>
			{pages.map(item => (
				<EnhancedMenuItem key={item.icon} {...item} open={open} />
			))}
		</Bar>
	);
};

export default Sidebar;
