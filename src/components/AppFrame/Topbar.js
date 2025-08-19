import React from "react";
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

export const CurrentApp = ({ displayName, iconUri }) => {
	const classes = useStyles();

	return (
		<div className={classes.appLabel}>
			<img src={iconUri} className={classes.appLogo} />
			{displayName}
		</div>
	);
};
CurrentApp.displayName = "CurrentApp";

const Topbar = ({ applications, applicationId, currentApplication, onClick, helpUrl, ...config }) => {
	const classes = useStyles();

	return (
		<div onClick={onClick} className={classes.wrapper}>
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
