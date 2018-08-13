import React from "react";
import styled from "styled-components";
import ApplicationSelector from "./ApplicationSelector";
import DropMenu from "../DropMenu";
import { getThemeProp } from "../../utils";

export const Wrapper = styled.div`
	height: 40px;
	color: #999999;
	display: flex;
	justify-content: space-between;
`;

export const Menu = styled(DropMenu)`
	box-sizing: border-box;
	font-family: Roboto Condensed, sans-serif;
	font-size: 12px;
	text-transform: uppercase;
	height: 40px;
	min-width: 180px;
	padding-top: 14px;
	padding-right: 32px;
`;

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

const Topbar = ({ applications, applicationId, onClick, ...config }) => (
	<Wrapper onClick={onClick}>
		<AppBox>
			<ApplicationSelector
				{...{
					applications,
					applicationId,
				}}
			/>
			<CurrentApp {...getApp(applications, applicationId) || {}} />
		</AppBox>
		<Menu {...config} />
	</Wrapper>
);

export default Topbar;
