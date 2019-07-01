import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { compose, withProps } from "recompose";
import { injectIntl } from "react-intl";
import { getThemeProp } from "../../utils";
import { setStateField } from "../../actions/view";
import { signOut } from "../../actions/authentication";
import { PREFS_NAME } from "./Preferences";
import { ABOUT_NAME } from "./About";
import ApplicationSelector from "./ApplicationSelector";
import DropMenu from "../DropMenu";

export const Wrapper = styled.div`
	height: 40px;
	color: #999999;
	display: flex;
	justify-content: space-between;
`;

const withUserMenu = compose(
	injectIntl,
	connect(
		() => ({}),
		dispatch => ({
			menuFuncs: {
				signOut: () => dispatch(signOut()),
				showPreferences: () =>
					dispatch(setStateField(PREFS_NAME, "show", true)),
				showAbout: () => dispatch(setStateField(ABOUT_NAME, "show", true)),
			},
		}),
	),
	withProps(({ intl, menuFuncs, messages }) => ({
		menuItems: [
			{
				label: intl.formatMessage(messages.sign_out),
				handler: menuFuncs.signOut,
				icon: "logout-1",
			},
			{
				label: intl.formatMessage(messages.preferences),
				handler: menuFuncs.showPreferences,
				icon: "settings-cogwheel",
			},
			{
				label: intl.formatMessage(messages.about),
				handler: menuFuncs.showAbout,
				icon: "infomation-circle",
			},
		],
	})),
);

export const Menu = withUserMenu(styled(DropMenu)`
	box-sizing: border-box;
	font-family: Roboto Condensed, sans-serif;
	font-size: 12px;
	text-transform: uppercase;
	height: 40px;
	min-width: 180px;
	padding-top: 14px;
	padding-right: 32px;
`);

export const AppBox = styled.div`
	height: 100%;
	display: flex;
	align-items: stretch;
`;

export const AppLabel = styled.div`
	background-color: #000000;
	color: ${getThemeProp(["appHighlightColor"], "#ffffff")};
	font-family: ${getThemeProp(["fonts", "header"], "sans-serif")};
	font-size: 14px;
	text-transform: uppercase;
	padding-right: 20px;
	padding-left: 6px;
	display: flex;
	align-items: center;
`;

export const AppLogo = styled.img.attrs({ alt: "" })`
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
	</Wrapper>
);

export default Topbar;
