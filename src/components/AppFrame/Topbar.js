import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { getThemeProp } from "../../utils";
import { selectCurrentUsername } from "../../selectors/authentication";
import { setStateField } from "../../actions/view";
import { signOut } from "../../actions/authentication";
import { PREFS_NAME } from "./Preferences";
import { ABOUT_NAME } from "./About";
import ApplicationSelector from "./ApplicationSelector";
import DropMenu from "../DropMenu";
import Anchor from "../DropMenu/Anchor";
import Help from "./Help";

export const Wrapper = styled.div`
	height: 40px;
	color: ${getThemeProp(["colors", "textMedium"], "#999999")};
	display: flex;
	justify-content: space-between;
`;
export const useMenuProps = messages => {
	const intl = useIntl();
	const dispatch = useDispatch();
	return {
		id: "userMenu",
		menuLabel: useSelector(selectCurrentUsername),
		menuItems: [
			{
				id: "userMenuSignOut",
				label: intl.formatMessage(messages.sign_out),
				handler: () => dispatch(signOut()),
				icon: "logout-1",
			},
			{
				id: "userMenuPrefsMenu",
				label: intl.formatMessage(messages.preferences),
				handler: () => dispatch(setStateField(PREFS_NAME, "show", true)),
				icon: "settings-cogwheel",
			},
			{
				id: "userMenuAbout",
				label: intl.formatMessage(messages.about),
				handler: () => dispatch(setStateField(ABOUT_NAME, "show", true)),
				icon: "info",
			},
		],
	};
};

export const StyledAnchor = styled(Anchor)`
	box-sizing: border-box;
	font-family: Roboto Condensed, sans-serif;
	font-size: 12px;
	text-transform: uppercase;
	height: 40px;
	min-width: 180px;
	padding-top: 14px;
	padding-right: 14px;
`;

export const Menu = ({ messages }) => (
	<DropMenu {...useMenuProps(messages)} AnchorComponent={StyledAnchor} />
);

export const AppBox = styled.div`
	height: 100%;
	display: flex;
	flex: 1;
	align-items: stretch;
`;

export const AppLabel = styled.div`
	background-color: #000000;
	color: ${getThemeProp(["colors", "application", "base"], "#ffffff")};
	font-family: ${getThemeProp(["fonts", "header"], "sans-serif")};
	font-size: 14px;
	text-transform: uppercase;
	padding-right: 20px;
	padding-left: 6px;
	display: flex;
	align-items: center;
`;

export const AppLogo = styled.img.attrs(() => ({ alt: "" }))`
	height: 30px;
	margin-right: 10px;
`;

export const CurrentApp = ({ displayName, iconUri }) => (
	<AppLabel>
		<AppLogo src={iconUri} />
		{displayName}
	</AppLabel>
);
CurrentApp.displayName = "CurrentApp";

const getApp = (apps = [], id) => apps.filter(app => app.name === id)[0];

const Topbar = ({
	applications,
	applicationId,
	onClick,
	menuMessages,
	helpMessages,
	helpUrl,
	...config
}) => (
	<Wrapper onClick={onClick}>
		<AppBox>
			<ApplicationSelector
				{...{
					applications,
					applicationId,
				}}
			/>
			<CurrentApp {...(getApp(applications, applicationId) || {})} />
		</AppBox>
		<Menu {...config} messages={menuMessages} />
		<Help {...{ messages: helpMessages, helpUrl }} />
	</Wrapper>
);

export default Topbar;
