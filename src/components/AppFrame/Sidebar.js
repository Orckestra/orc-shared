import React from "react";
import styled from "styled-components";
import ApplicationSelector from "./ApplicationSelector";
import MenuItem from "./MenuItem";
import getEnhancedComponent from "./getEnhancedComponent";

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

const Sidebar = ({
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
				{...{
					open,
					applications,
					applicationId,
				}}
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
