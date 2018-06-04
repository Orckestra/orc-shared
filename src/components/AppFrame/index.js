import React from "react";
import styled, { injectGlobal, css } from "styled-components";
import withToggle from "../../hocs/withToggle";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

injectGlobal`
	html {
		height: 100%;
	}

	body {
		height: 100%;
		margin: 0;
		overflow: hidden;
	}

	#app {
		height: 100%;
	}
`;

export const Base = styled.div`
	background-color: #333;
	height: 100%;
	overflow: hidden;
`;

export const ViewPort = styled.div`
	overflow: hidden;
	background-color: white;
	border-top-left-radius: 5px;
	height: calc(100% - 40px);
	width: calc(100% - 50px);
	position: absolute;
	bottom: 0;
	right: 0;
	transition: transform 0.3s ease-out;
	${props =>
		props.open
			? css`
					transform: translateX(150px);
			  `
			: ""};
`;

// Top bar containing username, user menu, help button
export const AppFrame = ({
	children,
	open,
	toggle,
	reset,
	applications,
	applicationId,
	pages,
	menuLabel,
	menuItems,
	linkHOC,
}) => (
	<Base>
		<Topbar
			linkHOC={linkHOC}
			onClick={reset}
			applications={applications}
			applicationId={applicationId}
			menuLabel={menuLabel}
			menuItems={menuItems}
		/>
		<Sidebar linkHOC={linkHOC} open={open} toggle={toggle} pages={pages} />
		<ViewPort open={open} onClick={reset}>
			{children}
		</ViewPort>
	</Base>
);

export default withToggle("open")(AppFrame);
