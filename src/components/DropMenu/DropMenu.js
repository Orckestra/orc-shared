// @flow
import React from "react";
import type { StatelessFunctionalComponent } from "react";
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

export type DropMenuProps = {
	menuLabel: string,
	menuItems: Array<{
		label: string,
		icon: string,
		handler: () => void,
	}>,
	className?: string,
};

type MenuOpenerProps = {
	open?: boolean,
	toggle?: () => void,
};

export type ExpandedMenuProps = DropMenuProps & MenuOpenerProps;

const DropMenu: StatelessFunctionalComponent<ExpandedMenuProps> = ({
	open,
	toggle,
	menuLabel,
	menuItems,
	className = "",
}) => (
	<Wrapper onClick={toggle}>
		<Anchor {...{ menuLabel, className, open }} />
		{open ? <Background /> : null}
		<Menu {...{ open, menuItems }} />
	</Wrapper>
);

export default DropMenu;
