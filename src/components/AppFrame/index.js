import React from "react";
import styled, { injectGlobal, css } from "styled-components";
import { compose, withPropsOnChange, setDisplayName } from "recompose";
import withToggle from "../../hocs/withToggle";
import Scope from "../Scope";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import ConnectedToastList from "./ConnectedToastList";

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
	border-top-left-radius: 10px;
	height: calc(100% - 40px);
	width: calc(100% - 50px);
	position: absolute;
	bottom: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	transition: transform 0.3s ease-out;
	${props =>
		props.open
			? css`
					transform: translateX(150px);
			  `
			: ""};
`;

const withEnhancedScope = withPropsOnChange(["scopeHOC"], ({ scopeHOC }) => ({
	ConnectedScope: setDisplayName("ConnectedScope")(scopeHOC(Scope)),
}));

export const AppFrame = ({
	open,
	toggle,
	reset,
	applications,
	applicationId,
	modules,
	activeModules,
	menuLabel,
	menuItems,
	linkHOC,
	location,
	ConnectedScope,
	children,
}) => (
	<Base>
		<ConnectedToastList />
		<Topbar
			linkHOC={linkHOC}
			onClick={reset}
			applications={applications}
			applicationId={applicationId}
			menuLabel={menuLabel}
			menuItems={menuItems}
		/>
		<Sidebar
			linkHOC={linkHOC}
			open={open}
			toggle={toggle}
			modules={modules}
			activeModules={activeModules}
			path={location.pathname}
		/>
		<ViewPort open={open} onClick={reset}>
			<ConnectedScope>{children}</ConnectedScope>
		</ViewPort>
	</Base>
);
AppFrame.displayName = "AppFrame";

export default compose(
	withEnhancedScope,
	withToggle("open"),
)(AppFrame);
