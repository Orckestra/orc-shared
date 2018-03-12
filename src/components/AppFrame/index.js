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

const TopBar = styled.div`
	height: 30px;
`;

const Perspective = styled.div`
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
const AppFrame = ({ children, open, openMenu, closeMenu, sidebarItems }) => (
	<Base>
		<TopBar onClick={closeMenu} />
		<Sidebar
			open={open}
			openMenu={openMenu}
			closeMenu={closeMenu}
			items={sidebarItems}
		/>
		<Perspective open={open} onClick={closeMenu}>
			{children}
		</Perspective>
	</Base>
);

export default withMenuOpener(AppFrame);
