import React from "react";
import { useSelector } from "react-redux";
import styled, { withTheme } from "styled-components";
import { useLocation } from "react-router-dom";
import { getThemeProp } from "../../utils";
import { getCurrentScope } from "../../selectors/navigation";
import MenuItem from "./MenuItem";

export const Bar = styled.div`
	box-sizing: border-box;
	padding-top: 60px;
	height: calc(100% - 40px);
	width: 200px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	color: ${getThemeProp(["colors", "textMedium"], "#999999")};
`;

export const MenuToggle = withTheme(({ open, toggle, theme }) => (
	<MenuItem
		id="sidebarMenuToggle"
		menuToggle
		open={open}
		icon={(open ? getThemeProp(["icons", "sidebarOpen"], "layers") : getThemeProp(["icons", "sidebarClosed"], "menu"))({
			theme,
		})}
		onClick={toggle}
	/>
));

const useEnhancement = (id, customHref) => {
	const scope = useSelector(getCurrentScope);
	const scopeHref = `/${scope}/`;
	const location = useLocation();
	return {
		href: `${customHref || scopeHref}${id}`,
		active: location.pathname.startsWith(`${customHref || scopeHref}${id}`),
		id,
	};
};

export const EnhancedMenuItem = ({ id, customHref, ...props }) => (
	<MenuItem {...props} {...useEnhancement(id, customHref)} />
);

const LogoSvg = styled.svg`
	flex: 0 0 auto;
	margin: auto 12.5px 7px;
	height: 25px;
	width: 25px;
	fill-rule: evenodd;
	clip-rule: evenodd;
	fill: #666666;
`;

export const Logo = () => (
	<LogoSvg>
		<path
			id="orckestra-logo"
			d="M10.3,3.8c-1.7,0-3.5,0.7-4.7,1.9L2.8,3c1.9-1.9,4.6-3,7.5-3c0.6,0,1.3,0.1,1.9,0.2
		l-0.9,3.7C11,3.8,10.6,3.8,10.3,3.8L10.3,3.8z M16.1,7.5c-1.4-1.4-3.2-2.1-5.1-2.1c-2,0-3.9,0.8-5.3,2.3c-1.2,1.2-1.9,2.8-2,4.5H0
		c0.1-2.7,1-4.9,3-7c0.2-0.2,0.5-0.5,0.7-0.7l1.8,1.8l0.1-0.1c1.2-1.2,2.9-1.9,4.6-1.9c0.4,0,0.8,0,1.2,0.1l0.2,0l0.6-2.5
		c2.3,0.3,4.3,1.2,6,2.8l0.3,0.3c2,1.9,3.1,4.5,3.3,7.3h-3.6C18.1,10.4,17.3,8.7,16.1,7.5L16.1,7.5z M19.8,3.3
		c2.9,2.8,4.4,6.8,4,10.8c-0.3,2.8-1.5,5.4-3.4,7.6L17,19.1c0.4-0.4,0.7-0.8,1-1.2c0.9-1.2,1.4-2.7,1.6-4.2c0-0.4,0.1-0.7,0-1.1h2.7
		l0-0.2c-0.1-3-1.4-5.7-3.5-7.8l-0.2-0.2L19.8,3.3L19.8,3.3z M16.5,18.9l-0.2,0.2l2.6,2c-2.3,2.6-5.6,4-9.1,3.8l0-4
		c0.2,0,0.4,0,0.6,0h0c2.6,0,5-1.4,6.4-3.6l0.7,0.5C17.2,18.2,16.9,18.6,16.5,18.9L16.5,18.9z"
		/>
	</LogoSvg>
);

const Sidebar = ({ open, toggle, modules = [], activeModules = [] }) => {
	return (
		<Bar open={open}>
			<MenuToggle open={open} toggle={toggle} />
			{modules.map(item => (
				<EnhancedMenuItem key={item.id} {...item} open={open} alert={activeModules[item.id] || false} />
			))}
			<Logo />
		</Bar>
	);
};

export default Sidebar;
