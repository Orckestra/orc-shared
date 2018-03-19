import React from "react";
import styled from "styled-components";
import ApplicationSelector from "./ApplicationSelector";
import MenuItem from "./MenuItem";

const LeftBar = styled.div`
	height: calc(100% - 30px);
	width: 280px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	color: #999999;
`;

const memo = {
	lastParams: null,
	lastReturn: null,
};
// Memoized factory function to prevent wasting time recreating the same component
const getEnhancedMenuItem = (hoc, comp) => {
	if (
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

const Sidebar = ({
	applications,
	applicationId,
	open,
	openMenu,
	closeMenu,
	itemHOC = x => x,
	items = [],
}) => {
	const EnhancedMenuItem = getEnhancedMenuItem(itemHOC, MenuItem);
	return (
		<LeftBar>
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
			{items.map(item => (
				<EnhancedMenuItem key={item.icon} {...item} open={open} />
			))}
		</LeftBar>
	);
};

export default Sidebar;
