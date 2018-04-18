// @flow
import React from "react";
import type { StatelessFunctionalComponent } from "react";
import styled from "styled-components";
import Breadcrumbs from "./Breadcrumbs";
import type { PathProp } from "./Breadcrumbs";
import DropMenu from "../DropMenu";
import type { DropMenuProps } from "../DropMenu/DropMenu";
import type { BaseHOC } from "./getEnhancedComponent";

const Wrapper = styled.div`
	padding-left: 50px;
	height: 30px;
	color: #ccc;
	display: flex;
	justify-content: space-between;
`;

const Menu = styled(DropMenu)`
	box-sizing: border-box;
	font-family: Roboto Condensed, sans-serif;
	font-size: 12px;
	text-transform: uppercase;
	height: 30px;
	min-width: 180px;
	padding-top: 9px;
	padding-right: 32px;
`;

export type TopbarConfigProps = PathProp &
	DropMenuProps & {
		onClick: () => void,
		linkHOC: BaseHOC,
	};

const Topbar: StatelessFunctionalComponent<TopbarConfigProps> = ({
	onClick,
	path,
	linkHOC,
	...config
}) => {
	return (
		<Wrapper onClick={onClick}>
			<Breadcrumbs {...{ linkHOC, path }} />
			<Menu {...config} />
		</Wrapper>
	);
};

export default Topbar;
