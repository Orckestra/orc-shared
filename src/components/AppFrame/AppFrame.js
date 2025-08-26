import React, { useEffect, useMemo } from "react";
import { useIntl } from "react-intl";
import pt from "prop-types";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { unwrapImmutable } from "../../utils";
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
import { selectCurrentModuleName } from "../../selectors/navigation";
import LoadingScreen from "../MaterialUI/Feedback/loadingScreen";
import sharedMessages from "../../sharedMessages";
import ActionModal from "../MaterialUI/DataDisplay/PredefinedElements/ActionModal";
import { logoutSelector } from "../../selectors/requests";

const useStyles = makeStyles(theme => ({
	base: props => ({
		backgroundColor: theme.palette.grey.dark,
		height: "100%",
		overflow: "hidden",
		pointerEvents: props.preferencesOpen ? "none" : undefined,
	}),
	viewPort: props => ({
		overflow: "hidden",
		backgroundColor: "white",
		borderTopLeftRadius: "10px",
		height: "calc(100% - 40px)",
		position: "absolute",
		bottom: 0,
		right: 0,
		display: "flex",
		flexDirection: "column",
		transition: "width 0.3s ease-out",
		width: props.toggleOpen ? "calc(100% - 200px)" : "calc(100% - 50px)",
	}),
}));

const getApp = (apps, id) => apps.filter(app => app.name === id)[0];

const AppFrame = ({ initOpen, applicationId, modules, activeModules, children, noScope, forceShowScope = [] }) => {
	const { formatMessage } = useIntl();
	const [prefViewState] = useViewState(PREFS_NAME);
	const [open, toggle, reset] = useToggle(initOpen);

	const classes = useStyles({ preferencesOpen: prefViewState.show, toggleOpen: open });

	const locale = useSelector(currentLocale);
	const needLogin = useSelector(logoutSelector);
	const applications = unwrapImmutable(useSelector(localizedAppSelector));
	const moduleName = useSelector(selectCurrentModuleName);
	const [helpUrl] = useApplicationHelpUrl(applicationId);
	useLoader(getApplications(), state => localizedAppSelector(state).size);
	const currentApplication = getApp(applications, applicationId);
	useLoader(getVersionInfo(locale), () => locale === null || helpUrl !== null);

	const [doesApplicationNeedRefresh, setDoesApplicationNeedRefresh] = React.useState(false);

	const reloadApplication = () => {
		window.location.reload();
		setDoesApplicationNeedRefresh(false);
	};

	useEffect(() => {
		if (needLogin) {
			setDoesApplicationNeedRefresh(true);
		}
	}, [needLogin]);

	useEffect(() => {
		document.title = currentApplication?.displayName || applicationId;
	}, [currentApplication, applicationId]);

	// Extract only what's needed for the SideBar and its menuItems
	const menuItemFromModules = useMemo(
		() =>
			(modules ?? []).map(item => ({
				id: item.id,
				label: item.label,
				icon: item.icon,
			})),
		[modules],
	);

	return (
		<div className={classes.base}>
			<ConnectedToastList />
			<ActionModal
				title={formatMessage(sharedMessages.error)}
				message={formatMessage(sharedMessages.needToRefresh)}
				open={doesApplicationNeedRefresh}
				actions={[{ label: sharedMessages.refresh, handler: reloadApplication, isPrimary: true }]}
			/>
			<Topbar
				{...{
					applications,
					applicationId,
					currentApplication,
					helpUrl,
				}}
				onClick={reset}
			/>
			<Sidebar {...{ open, toggle, modules: menuItemFromModules, activeModules }} />
			<div onClick={reset} className={classes.viewPort} data-test-id="viewport">
				{noScope && !forceShowScope.includes(moduleName) ? (
					<React.Fragment>
						<ScopeBar />
						{children}
					</React.Fragment>
				) : (
					<Scope>{children}</Scope>
				)}
			</div>
			<About currentApplication={currentApplication} />
			<LoadingScreen />
			<Preferences />
		</div>
	);
};
AppFrame.displayName = "AppFrame";
AppFrame.propTypes = {
	applicationId: pt.string.isRequired,
	modules: pt.array.isRequired,
	activeModules: pt.objectOf(pt.oneOfType([pt.bool, pt.shape({ type: pt.string, message: ptLabel })])),
	noScope: pt.bool,
};

export default AppFrame;
