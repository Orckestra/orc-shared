// @flow
import React from "react";
import type { Node, StatelessFunctionalComponent } from "react";
import styled from "styled-components";
import transition from "styled-transition-group";
import { withStateHandlers } from "recompose";
import Icon from "./Icon";

const DropMenuWrapper = styled.div``;

const DropMenuHeader = styled.div`
	cursor: pointer;
`;

const DropMenuIndicator = styled(Icon)`
	font-size: 10px;
	padding: 0 11px;
	color: ${props => (props.open ? "#333" : props.theme.appHighlightColor)};
`;
DropMenuIndicator.defaultProps = {
	// A default value for when no theme is provided.
	theme: {
		appHighlightColor: "#ffffff",
	},
};

const DropMenuDrawer = transition.ul`
	position: absolute;
	color: #333;
	background-color: white;
	border: 1px solid #999999;
	border-radius: 5px;
	z-index: 19999;
	list-style-type: none;
	padding: 5px 0;
	margin: 4px 0 0;
	font-family: Open Sans, sans-serif;
	font-size: 12px;

	transition: opacity ${props => props.timeout}ms ease-out;

	&:enter {
		opacity: 0.01;
	}
	&:enter-active {
		opacity: 1;
	}
	&:exit {
		opacity: 1;
	}
	&:exit-active {
		opacity: 0.01;
	}
`;
DropMenuDrawer.defaultProps = {
	unmountOnExit: true,
	timeout: 100,
};

const DropMenuItem = styled.li`
	box-sizing: border-box;
	height: 30px;
	min-width: 178px;
	padding: 9px 12px;
	display: flex;
	align-items: center;
	cursor: pointer;

	&:hover {
		background-color: ${props => props.theme.appHighlightColor};
		color: white;
	}
`;
DropMenuItem.defaultProps = {
	// A default value for when no theme is provided.
	theme: {
		appHighlightColor: "#ffffff",
	},
};

const DropMenuIcon = styled(Icon)`
	padding-right: 11px;
	font-size: 17px;
`;

const DropMenuBackground = styled.div`
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

const DropMenuStructure = ({
	open,
	toggle,
	menuLabel,
	menuItems,
	className = "",
}: DropMenuProps & MenuOpenerProps): Node => (
	<DropMenuWrapper onClick={toggle}>
		<DropMenuHeader className={className}>
			{menuLabel}
			<DropMenuIndicator
				id={open ? "chevron-up" : "chevron-down"}
				open={open}
			/>
		</DropMenuHeader>
		{open ? <DropMenuBackground /> : null}
		<DropMenuDrawer in={open}>
			{menuItems.map(item => (
				<DropMenuItem key={item.label + item.icon} onClick={item.handler}>
					<DropMenuIcon id={item.icon} />
					<span>{item.label}</span>
				</DropMenuItem>
			))}
		</DropMenuDrawer>
	</DropMenuWrapper>
);

const withOpener = withStateHandlers(
	({ initOpen = false }) => ({ open: initOpen }),
	{
		toggle: ({ open }) => () => ({ open: !open }),
	},
);

const DropMenu: StatelessFunctionalComponent<DropMenuProps> = withOpener(
	DropMenuStructure,
);

export default DropMenu;
