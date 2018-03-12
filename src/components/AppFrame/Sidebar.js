import React from "react";
import styled from "styled-components";
import MenuItem from "./MenuItem";

const LeftBar = styled.div`
	height: calc(100% - 30px);
	width: 280px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`;

const Sidebar = ({
	open,
	openMenu,
	closeMenu,
	items = [],
	navigate = () => {},
}) => (
	<LeftBar>
		<MenuItem
			menu
			open={open}
			icon={open ? "layers" : "menu"}
			onClick={open ? closeMenu : openMenu}
		/>
		{items.map(item => <MenuItem key={item.icon} {...item} open={open} />)}
	</LeftBar>
);

export default Sidebar;
