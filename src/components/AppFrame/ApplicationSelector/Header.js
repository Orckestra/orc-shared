// @flow
import React from "react";
import type { StatelessFunctionalComponent } from "react";
import styled from "styled-components";
import type { ApplicationItemProps } from "./types";

const HeaderIcon = styled.img`
	height: 34px;
	width: 34px;
	vertical-align: middle;
`;

const HeaderLabel = styled.span`
	font-family: Roboto Condensed, sans-serif;
	font-weight: bold;
	text-transform: uppercase;
	padding-left: 15px;
	vertical-align: middle;
	opacity: ${props => (props.open ? 1 : 0)};
	transition: opacity 0.3s ease-out;
`;

const HeaderWrapper = styled.div`
	padding: 0 6px;
	margin: 10px 0 50px;
`;

export type HeaderProps = {
	open: boolean,
	application: ApplicationItemProps,
};

type TogglingHeaderProps = HeaderProps & {
	toggle?: () => void,
};

const Header: StatelessFunctionalComponent<TogglingHeaderProps> = ({
	open,
	toggle,
	application,
}) => (
	<HeaderWrapper onClick={toggle}>
		<HeaderIcon src={application.src} />
		<HeaderLabel open={open}>{application.label}</HeaderLabel>
	</HeaderWrapper>
);

export default Header;
