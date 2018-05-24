import React from "react";
import styled from "styled-components";
import MenuItem from "./MenuItem";
import getEnhancedComponent from "./getEnhancedComponent";

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

// Memoized factory function to prevent wasting time recreating the same component
const getEnhancedMenuItem = getEnhancedComponent();

const Sidebar = ({ open, toggle, linkHOC = x => x, pages = [] }) => {
	const EnhancedMenuItem = getEnhancedMenuItem(linkHOC, MenuItem);
	return (
		<Bar open={open}>
			<MenuItem
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
