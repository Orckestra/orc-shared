import React from "react";
import pt from "prop-types";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ifFlag, unwrapImmutable } from "../../utils";
import { getApplications } from "../../actions/applications";
import useToggle from "../../hooks/useToggle";
import useLoader from "../../hooks/useLoader";
import { localizedAppSelector } from "../../selectors/applications";
import { ptLabel } from "../Text";
import Scope, { Bar as ScopeBar } from "../Scope";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import About from "./About";
import Preferences from "./Preferences";
import ConnectedToastList from "./ConnectedToastList";

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
	${ifFlag(
		"open",
		css`
			transform: translateX(150px);
		`,
	)};
`;

const AppFrame = ({
	initOpen,
	applicationId,
	modules,
	activeModules,
	children,
	menuMessages,
	aboutMessages,
	prefMessages,
	prefActions,
	scopeFilterPlaceholder,
	noScope,
}) => {
	const applications = unwrapImmutable(useSelector(localizedAppSelector));
	useLoader(getApplications(), state => localizedAppSelector(state).size);
	const [open, toggle, reset] = useToggle(initOpen);
	const location = useLocation();
	return (
		<Base>
			<ConnectedToastList />
			<Topbar
				{...{ applications, applicationId, menuMessages }}
				onClick={reset}
			/>
			<Sidebar
				{...{ open, toggle, modules, activeModules }}
				path={location.pathname}
			/>
			<ViewPort open={open} onClick={reset}>
				{noScope ? (
					<React.Fragment>
						<ScopeBar />
						{children}
					</React.Fragment>
				) : (
					<Scope filterPlaceholder={scopeFilterPlaceholder}>{children}</Scope>
				)}
			</ViewPort>
			<About messages={aboutMessages} />
			<Preferences messages={prefMessages} />
		</Base>
	);
};
AppFrame.displayName = "AppFrame";
AppFrame.propTypes = {
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
	noScope: pt.bool,
};

export default AppFrame;
