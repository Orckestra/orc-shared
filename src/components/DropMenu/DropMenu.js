import React from "react";
import styled from "styled-components";
import Anchor from "./Anchor";
import Menu from "./Menu";

export const Wrapper = styled.div``;

export const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 19998;
`;

const DropMenu = ({ open, toggle, menuLabel, menuItems, className = "" }) => (
	<Wrapper>
		<Anchor onClick={toggle} {...{ menuLabel, className, open }} />
		<Menu {...{ open, menuItems, toggle }} />
	</Wrapper>
);

export default DropMenu;
