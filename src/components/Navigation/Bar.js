import React from "react";
import styled from "styled-components";
import { getThemeProp } from "../../utils";
import Tab from "./Tab";

export const TabBar = styled.div`
	flex: 0 0 10px;
	max-height: 10px;
	padding: 0 0 0 10px;
	margin: 0 200px 0 0;
	height: 10px;
	display: flex;
	align-items: flex-end;
	width: calc(100% - 210px);
	font-family: ${getThemeProp(["fonts", "header"], "sans-serif")};
	font-size: 13px;
	text-transform: uppercase;
`;

const Bar = ({ pages }) => (
	<TabBar>
		{pages.map(
			(
				{ href, mappedFrom, label, active, icon, outsideScope, close },
				index,
			) => (
				<Tab
					key={href}
					module={index === 0}
					icon={icon}
					href={href}
					mappedFrom={mappedFrom}
					label={label}
					active={active}
					close={close}
					outsideScope={outsideScope}
				/>
			),
		)}
	</TabBar>
);

export default Bar;
