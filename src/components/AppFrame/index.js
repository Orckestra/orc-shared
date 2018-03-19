import React from "react";
import styled, { injectGlobal } from "styled-components";
import withMenuOpener from "./withMenuOpener";
import Sidebar from "./Sidebar";

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

const Topbar = styled.div`
	height: 30px;
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
	${props => (props.open ? "transform: translateX(230px);" : "")};
`;

// Top bar containing username, user menu, help button
// Area framed by bars slides sideways when left menu folds out
// Left bar has fold-out button, entries for each perspective in the app
const AppFrame = ({ children, sidebarMenu, sidebarConfig }) => (
	<Base>
		<Topbar onClick={sidebarMenu.closeMenu} />
		<Sidebar {...sidebarMenu} {...sidebarConfig} />
		<ViewPort open={sidebarMenu.open} onClick={sidebarMenu.closeMenu}>
			{children}
		</ViewPort>
	</Base>
);

export default withMenuOpener(AppFrame);
