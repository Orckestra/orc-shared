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

const DropMenu = ({
	id,
	open,
	toggle,
	menuLabel,
	menuItems,
	className = "",
}) => (
	<Wrapper>
		<Anchor
			id={id + "Anchor"}
			onClick={toggle}
			{...{ menuLabel, className, open }}
		/>
		<Menu id={id + "Dropdown"} {...{ open, menuItems, toggle }} />
	</Wrapper>
);

export default DropMenu;
