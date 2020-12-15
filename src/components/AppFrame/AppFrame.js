import React, { useEffect } from "react";
import pt from "prop-types";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import { ifFlag, getThemeProp, unwrapImmutable } from "../../utils";
import { getApplications } from "../../actions/applications";
import useToggle from "../../hooks/useToggle";
import useLoader from "../../hooks/useLoader";
import { localizedAppSelector } from "../../selectors/applications";
import { ptLabel } from "../Text";
import Scope, { Bar as ScopeBar } from "../Scope";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import About from "./About";
import Preferences, { PREFS_NAME } from "./Preferences";
import ConnectedToastList from "./ConnectedToastList";
import useApplicationHelpUrl from "./useApplicationHelpUrl";
import useViewState from "../../hooks/useViewState";
import { getVersionInfo } from "../../actions/versionInfo";
import { currentLocale } from "../../selectors/locale";
import { selectCurrentModuleName, selectRoutePath } from "../../selectors/navigation";

export const Base = styled.div`
	background-color: ${getThemeProp(["colors", "bgDark"], "#333333")};
	height: 100%;
	overflow: hidden;
	${ifFlag(
		"preferencesOpen",
		css`
			pointer-events: none;
		`,
	)};
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
	transition: width 0.3s ease-out;
	${ifFlag(
		"open",
		css`
			width: calc(100% - 200px);
		`,
	)};
`;

const getApp = (apps, id) => apps.filter(app => app.name === id)[0];

const AppFrame = ({
	initOpen,
	applicationId,
	modules,
	activeModules,
	children,
	menuMessages,
	helpMessages,
	aboutMessages,
	prefMessages,
	prefActions,
	scopeFilterPlaceholder,
	noScope,
	forceShowScope = [],
	scopeDisabler = [],
}) => {
	const locale = useSelector(currentLocale);
	const applications = unwrapImmutable(useSelector(localizedAppSelector));
	const moduleName = useSelector(selectCurrentModuleName);
	const path = useSelector(selectRoutePath);
	const [helpUrl] = useApplicationHelpUrl(applicationId);
	useLoader(getApplications(), state => localizedAppSelector(state).size);
	const [open, toggle, reset] = useToggle(initOpen);
	const currentApplication = getApp(applications, applicationId);
	useLoader(getVersionInfo(locale), () => locale === null || helpUrl !== null);

	useEffect(() => {
		document.title = currentApplication?.displayName || applicationId;
	}, [currentApplication, applicationId]);

	const [prefViewState] = useViewState(PREFS_NAME);

	const disableScope = scopeDisabler.some(disabler => path.includes(disabler));

	return (
		<Base preferencesOpen={prefViewState.show}>
			<ConnectedToastList />
			<Topbar
				{...{
					applications,
					applicationId,
					currentApplication,
					menuMessages,
					helpMessages,
					helpUrl,
				}}
				onClick={reset}
			/>
			<Sidebar {...{ open, toggle, modules, activeModules }} />
			<ViewPort open={open} onClick={reset}>
				{noScope && !forceShowScope.includes(moduleName) ? (
					<React.Fragment>
						<ScopeBar />
						{children}
					</React.Fragment>
				) : (
					<Scope filterPlaceholder={scopeFilterPlaceholder} disabled={disableScope}>
						{children}
					</Scope>
				)}
			</ViewPort>
			<About messages={aboutMessages} currentApplication={currentApplication} />
			<Preferences messages={prefMessages} />
		</Base>
	);
};
AppFrame.displayName = "AppFrame";
AppFrame.propTypes = {
	applicationId: pt.string.isRequired,
	modules: pt.array.isRequired,
	activeModules: pt.objectOf(pt.oneOfType([pt.bool, pt.shape({ type: pt.string, message: ptLabel })])),
	helpMessages: pt.shape({
		help: ptLabel.isRequired,
	}).isRequired,
	menuMessages: pt.shape({
		sign_out: ptLabel.isRequired,
		preferences: ptLabel.isRequired,
		about: ptLabel.isRequired,
	}).isRequired,
	scopeFilterPlaceholder: ptLabel,
	aboutMessages: pt.shape({
		ccName: ptLabel.isRequired,
		ccVersion: ptLabel.isRequired,
		sharedVersion: ptLabel.isRequired,
		scriptsVersion: ptLabel.isRequired,
		secretVersion: ptLabel.isRequired,
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
