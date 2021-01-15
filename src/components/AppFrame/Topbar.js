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
import Anchor from "./Anchor";
import Help from "./Help";
import sharedMessages from "./../../sharedMessages";

export const Wrapper = styled.div`
	height: 40px;
	color: ${getThemeProp(["colors", "textMedium"], "#999999")};
	display: flex;
	justify-content: space-between;
`;
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

export const AppBox = styled.div`
	height: 100%;
	display: flex;
	flex: 1;
	align-items: stretch;
`;

export const AppLabel = styled.div`
	background-color: #000000;
	color: ${getThemeProp(["colors", "application", "primary"], "#ffffff")};
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

const Topbar = ({
	applications,
	applicationId,
	currentApplication,
	onClick,
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
			<CurrentApp {...(currentApplication || {})} />
		</AppBox>
		<Menu {...config} />
		<Help {...{ helpUrl }} />
	</Wrapper>
);

export default Topbar;
