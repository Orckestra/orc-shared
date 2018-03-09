import React from "react";
import styled, { injectGlobal } from "styled-components";
import { withStateHandlers } from "recompose";
import Icon from "./Icon";

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

const LeftBar = styled.div`
	height: calc(100% - 30px);
	width: 280px;
	color: #999999;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`;

const LeftIcon = styled(Icon)`
	font-size: 30px;
	padding: 10px;
	${props => (props.open ? "" : "")};
`;

const Perspective = styled.div`
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

const withMenuOpener = withStateHandlers(
	({ initOpen = false }) => ({ open: initOpen }),
	{
		openMenu: () => () => ({ open: true }),
		closeMenu: () => () => ({ open: false }),
	},
);

// Top bar containing username, user menu, help button
// Area framed by bars slides sideways when left menu folds out
// Left bar has fold-out button, entries for each perspective in the app
const AppFrame = ({ children, open, openMenu, closeMenu }) => (
	<Base>
		<TopBar onClick={closeMenu} />
		<Perspective open={open} onClick={closeMenu}>
			{children}
		</Perspective>
		<LeftBar open={open}>
			<LeftIcon open={open} id="menu" onClick={open ? closeMenu : openMenu} />
		</LeftBar>
	</Base>
);

export default withMenuOpener(AppFrame);
