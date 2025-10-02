import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import { selectCurrentUsername } from "../../selectors/authentication";
import { setStateField } from "../../actions/view";
import { signOut } from "../../actions/authentication";
import { PREFS_NAME } from "./Preferences";
import { ABOUT_NAME } from "./About";
import ApplicationSelector from "./ApplicationSelector";
import DropMenu from "../DropMenu";
import Anchor from "./Anchor";
import Help from "./Help";
import sharedMessages from "./../../sharedMessages";
import classNames from "classnames";
import { areEqualCaseInsensitive } from "../../utils/comparisonHelper";

const useStyles = makeStyles(theme => ({
	wrapper: {
		height: "40px",
		color: theme.palette.text.hint,
		display: "flex",
		justifyContent: "space-between",
	},
	appBox: {
		height: "100%",
		display: "flex",
		flex: 1,
		alignItems: "stretch",
	},
	appLabel: {
		backgroundColor: "#000000",
		color: theme.palette.primary.light,
		fontFamily: theme.typography.button.fontFamily,
		fontSize: "14px",
		textTransform: "uppercase",
		paddingRight: "20px",
		paddingLeft: "6px",
		display: "flex",
		alignItems: "center",
	},
	appLogo: {
		height: "30px",
		marginRight: "10px",
	},
	qaContainerColor: {
		backgroundColor: "#9F0F18",
		color: "#FFFFFF",
	},
	intContainerColor: {
		backgroundColor: "#FCA311",
		color: "#000000",
	},
	stgContainerColor: {
		backgroundColor: "#19B9E6",
		color: "#000000",
	},
	localdevContainerColor: {
		backgroundColor: "#87E911",
		color: "#000000",
	},
}));

export const useMenuProps = () => {
	const intl = useIntl();
	const dispatch = useDispatch();
	return {
		id: "userMenu",
		menuLabel: useSelector(selectCurrentUsername),
		menuItems: [
			{
				id: "userMenuSignOut",
				label: intl.formatMessage(sharedMessages.signOut),
				handler: () => dispatch(signOut()),
				icon: "logout",
			},
			{
				id: "userMenuPrefsMenu",
				label: intl.formatMessage(sharedMessages.preferences),
				handler: () => dispatch(setStateField(PREFS_NAME, "show", true)),
				icon: "cogwheel",
			},
			{
				id: "userMenuAbout",
				label: intl.formatMessage(sharedMessages.about),
				handler: () => dispatch(setStateField(ABOUT_NAME, "show", true)),
				icon: "info",
			},
		],
	};
};

export const Menu = () => {
	const { menuLabel, ...menuProps } = useMenuProps();
	return (
		<DropMenu {...menuProps}>
			<Anchor menuLabel={menuLabel} />
		</DropMenu>
	);
};

export const sanitizeEnvironmentCode = envCode => {
	if (!envCode) {
		return envCode;
	}

	envCode = envCode.toLowerCase();

	const partialEnvCodes = [
		"prd", // to support the old prdhi / prdlow used by SBD
		"int", // to support int, int2, etc
		"qa", // to support qa, qa2, etc
		"stg", // to support stg, stg2, etc
		"localdev", // local development of the platform by product or service teams
	];

	for (const partialEnvCode of partialEnvCodes) {
		if (envCode.startsWith(partialEnvCode)) {
			return partialEnvCode;
		}
	}

	return envCode; // other names will be used as-is
};

export const getAppEnvironmentInfo = (currentLocation, uiContainerName) => {
	let environmentCode = null;
	let sanitizedEnvironmentCode = null;
	let isDeployedLocalDevEnv = false;

	const domainMatch = currentLocation?.match(
		/^(?<appName>[^.]+)\.(?<envCode>[^.]+)\.(?<clientCode>[^.]+)\.orckestra\.(cloud|org)$/,
	);

	if (domainMatch) {
		environmentCode = domainMatch.groups.envCode;
	} else if (
		currentLocation?.toLowerCase().endsWith("local.develop.orckestra.cloud") ||
		currentLocation?.toLowerCase() === "localhost"
	) {
		environmentCode = "localdev";
	} else if (currentLocation?.toLowerCase().endsWith("develop.orckestra.cloud")) {
		environmentCode = "localdev";
		isDeployedLocalDevEnv = true;
	}

	// uncomment if you want to force a specific environment / color
	// environmentCode = "prd";

	sanitizedEnvironmentCode = sanitizeEnvironmentCode(environmentCode);

	if (!sanitizedEnvironmentCode || sanitizedEnvironmentCode === "rel") {
		// we never want a different color / text for our rel environment
		return {
			name: "",
			cssClassCategory: null,
		};
	}

	if (!uiContainerName) {
		uiContainerName = "prd"; // fallback in case the container is not defined in a meta tag
	}

	const needCustomCssClass =
		(!!sanitizedEnvironmentCode && !areEqualCaseInsensitive(sanitizedEnvironmentCode, "prd")) ||
		!areEqualCaseInsensitive(uiContainerName, "prd");

	let cssClassCategory = null;

	const nameParts = [];

	if (!areEqualCaseInsensitive(sanitizedEnvironmentCode, "prd")) {
		nameParts.push(environmentCode);
	}

	if (needCustomCssClass) {
		let needBuildNumber = false;
		const isPrdUiContainer = areEqualCaseInsensitive(uiContainerName, "prd");

		if (areEqualCaseInsensitive(sanitizedEnvironmentCode, "prd")) {
			cssClassCategory = "qa"; // if we end up here, it means that our prd environment is using a different UI container
			needBuildNumber = !isPrdUiContainer;
		} else if (areEqualCaseInsensitive(sanitizedEnvironmentCode, "localdev")) {
			cssClassCategory = "localdev";
			needBuildNumber = !isPrdUiContainer && isDeployedLocalDevEnv;
		} else if (areEqualCaseInsensitive(sanitizedEnvironmentCode, "qa")) {
			cssClassCategory = "qa";
			needBuildNumber = !isPrdUiContainer;
		} else if (areEqualCaseInsensitive(sanitizedEnvironmentCode, "stg")) {
			cssClassCategory = "stg";
			needBuildNumber = !isPrdUiContainer;
		} else {
			// any other container have the int look
			cssClassCategory = "int";
			needBuildNumber = !isPrdUiContainer;
		}

		if (needBuildNumber) {
			nameParts.push(`${window.BUILD_NUMBER}/${uiContainerName}`);
		}
	}

	return {
		name: nameParts.join(" — "),
		cssClassCategory: cssClassCategory,
	};
};

export const CurrentApp = ({ displayName, iconUri }) => {
	const classes = useStyles();
	const containerInfo = useMemo(() => {
		return getAppEnvironmentInfo(
			window.location.hostname,
			document.querySelector('meta[name="cdn-container-name"]')?.getAttribute("content"),
		);
	}, []);

	let name;

	if (containerInfo.name) {
		if (displayName) {
			// to avoid issues with tests where "undefined" ends up in the name
			name = `${displayName} — ${containerInfo.name}`;
		} else {
			name = ` — ${containerInfo.name}`;
		}
	} else {
		name = displayName;
	}

	return (
		<div
			className={classNames(classes.appLabel, {
				[classes.qaContainerColor]: containerInfo.cssClassCategory === "qa",
				[classes.intContainerColor]: containerInfo.cssClassCategory === "int",
				[classes.stgContainerColor]: containerInfo.cssClassCategory === "stg",
				[classes.localdevContainerColor]: containerInfo.cssClassCategory === "localdev",
			})}
		>
			<img src={iconUri} className={classes.appLogo} />
			{name}
		</div>
	);
};
CurrentApp.displayName = "CurrentApp";

const Topbar = ({ applications, applicationId, currentApplication, onClick, helpUrl, ...config }) => {
	const classes = useStyles();

	return (
		<div onClick={onClick} className={classes.wrapper} data-test-id="wrapper">
			<div className={classes.appBox}>
				<ApplicationSelector
					{...{
						applications,
						applicationId,
					}}
				/>
				<CurrentApp {...(currentApplication || {})} />
			</div>
			<Menu {...config} />
			<Help {...{ helpUrl }} />
		</div>
	);
};

export default Topbar;
