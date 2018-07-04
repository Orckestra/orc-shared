import React from "react";
import styled from "styled-components";
import { withHandlers } from "recompose";
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

export const Bar = ({ pages, close }) => (
	<TabBar>
		{pages.map(({ href, label, active, icon }, index) => (
			<Tab
				key={href}
				module={index === 0}
				icon={icon}
				href={href}
				label={label}
				active={active}
				close={close}
			/>
		))}
	</TabBar>
);

export default withHandlers({
	close: ({ close, moduleName, moduleHref }) => close(moduleName, moduleHref),
})(Bar);
