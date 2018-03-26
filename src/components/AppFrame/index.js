// @flow
import React from "react";
import type { Node, StatelessFunctionalComponent } from "react";
import styled, { injectGlobal, css } from "styled-components";
import withMenuOpener from "./withMenuOpener";
import Topbar from "./Topbar";
import type { TopbarConfigProps } from "./Topbar";
import Sidebar from "./Sidebar";
import type { SidebarConfigProps } from "./Sidebar";

injectGlobal`
	body {
		margin: 0;
		overflow: hidden;
	}

	#app {
		height: 100%;
	}
`;

const Base = styled.div`
	background-color: #333;
	height: 100%;
	overflow-x: hidden;
`;

const ViewPort = styled.div`
	overflow: auto;
	background-color: white;
	border-top-left-radius: 5px;
	height: calc(100% - 30px);
	width: calc(100% - 50px);
	position: absolute;
	bottom: 0;
	right: 0;
	transition: transform 0.3s ease-out;
	${props =>
		props.open
			? css`
					transform: translateX(230px);
			  `
			: ""};
`;

// Top bar containing username, user menu, help button
const AppFrameStructure = ({
	children,
	sidebarMenu,
	sidebarConfig,
	topbarConfig,
}) => (
	<Base>
		<Topbar onClick={sidebarMenu.closeMenu} {...topbarConfig} />
		<Sidebar {...sidebarMenu} {...sidebarConfig} />
		<ViewPort open={sidebarMenu.open} onClick={sidebarMenu.closeMenu}>
			{children}
		</ViewPort>
	</Base>
);

export type AppFrameProps = {
	children: Node,
	sidebarConfig: SidebarConfigProps,
	topbarConfig: TopbarConfigProps,
};

const AppFrame: StatelessFunctionalComponent<AppFrameProps> = withMenuOpener(
	AppFrameStructure,
);

export default AppFrame;
