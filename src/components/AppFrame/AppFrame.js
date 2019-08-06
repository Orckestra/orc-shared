import React from "react";
import pt from "prop-types";
import styled, { injectGlobal, css } from "styled-components";
import { connect } from "react-redux";
import { compose } from "recompose";
import { getApplications } from "../../actions/applications";
import withInitialLoad from "../../hocs/withInitialLoad";
import withAuthentication from "../../hocs/withAuthentication";
import withToggle from "../../hocs/withToggle";
import { localizedAppSelector } from "../../selectors/applications";
import { ptLabel } from "../Text";
import Scope from "../Scope";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import About from "./About";
import Preferences from "./Preferences";
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

export const AppFrame = ({
	open,
	toggle,
	reset,
	applications,
	applicationId,
	modules,
	activeModules,
	menuLabel,
	location,
	children,
	menuMessages,
	aboutMessages,
	prefMessages,
	prefActions,
	scopeFilterPlaceholder,
}) => (
	<Base>
		<ConnectedToastList />
		<Topbar
			{...{ applications, applicationId, menuLabel, menuMessages }}
			onClick={reset}
		/>
		<Sidebar
			{...{ open, toggle, modules, activeModules }}
			path={location.pathname}
		/>
		<ViewPort open={open} onClick={reset}>
			<Scope filterPlaceholder={scopeFilterPlaceholder}>{children}</Scope>
		</ViewPort>
		<About messages={aboutMessages} />
		<Preferences messages={prefMessages} />
	</Base>
);
AppFrame.displayName = "AppFrame";

const WiredAppFrame = compose(
	connect(
		state => ({
			applications: localizedAppSelector(state).toJS(),
		}),
		dispatch => ({
			loadApplications: () => dispatch(getApplications()),
		}),
	),
	withInitialLoad("loadApplications", props => props.applications.length === 0),
	withAuthentication,
	withToggle("open"),
)(AppFrame);
WiredAppFrame.propTypes = {
	menuLabel: ptLabel.isRequired,
	applicationId: pt.string.isRequired,
	modules: pt.array.isRequired,
	activeModules: pt.array,
	menuMessages: pt.shape({
		sign_out: ptLabel.isRequired,
		preferences: ptLabel.isRequired,
		about: ptLabel.isRequired,
	}).isRequired,
	scopeFilterPlaceholder: ptLabel,
	aboutMessages: pt.shape({
		ccName: ptLabel.isRequired,
		ccVersion: ptLabel.isRequired,
		copyrightTermsNotice: ptLabel.isRequired,
		copyright: ptLabel.isRequired,
		allRightsReserved: ptLabel.isRequired,
	}).isRequired,
	prefMessages: pt.shape({
		preferences: ptLabel.isRequired,
		save: ptLabel.isRequired,
		cancel: ptLabel.isRequired,
		language: ptLabel.isRequired,
		defaultApp: ptLabel.isRequired,
	}).isRequired,
};

export default WiredAppFrame;

/*

*/
