import React from "react";
import styled, { injectGlobal, css } from "styled-components";
import { ImmutableFragment as RenderFragment } from "redux-little-router/lib/immutable";
import {
	compose,
	mapProps,
	withPropsOnChange,
	setDisplayName,
} from "recompose";
import withToggle from "../../hocs/withToggle";
import Scope from "../Scope";
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

const withEnhancedScope = withPropsOnChange(["scopeHOC"], ({ scopeHOC }) => ({
	ConnectedScope: setDisplayName("ConnectedScope")(scopeHOC(Scope)),
}));

// Top bar containing username, user menu, help button
export const AppFrame = ({
	open,
	toggle,
	reset,
	applications,
	applicationId,
	modules,
	menuLabel,
	menuItems,
	linkHOC,
	ConnectedScope,
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
		<Sidebar linkHOC={linkHOC} open={open} toggle={toggle} modules={modules} />
		<ViewPort open={open} onClick={reset}>
			<ConnectedScope>
				{modules.map(module => {
					const ModulePage = module.component;
					return (
						<RenderFragment key={module.id} forRoute={"/" + module.id}>
							<ModulePage />
						</RenderFragment>
					);
				})}
			</ConnectedScope>
		</ViewPort>
	</Base>
);
AppFrame.displayName = "AppFrame";

export default compose(
	withEnhancedScope,
	withToggle("open"),
)(AppFrame);
