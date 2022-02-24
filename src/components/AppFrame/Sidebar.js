import React from "react";
import { useSelector } from "react-redux";
import styled, { withTheme } from "styled-components";
import { useLocation } from "react-router-dom";
import { getThemeProp } from "../../utils";
import { selectPrependHrefConfig } from "../../selectors/navigation";
import MenuItem from "./MenuItem";
import { getScopeModuleInformationSelector } from "../../selectors/modules";

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

const useEnhancement = id => {
	const location = useLocation();
	const prependHref = useSelector(selectPrependHrefConfig)(id);

	return {
		href: `${prependHref}${id}`,
		active: location.pathname.startsWith(`${prependHref}${id}`),
		id,
	};
};

export const EnhancedMenuItem = ({ id, ...props }) => {
	const defaultModule = useSelector(getScopeModuleInformationSelector);

	const isHidden = !defaultModule.visibleModules.includes(id);

	return <MenuItem {...props} {...useEnhancement(id)} isHidden={isHidden} />;
};

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
	<LogoSvg viewBox="0 0 260 260">
		<path d="M1.11,125.62C1.11,74.94,40.22,39,93.72,39S186,74.94,186,125.62s-38.79,86.66-92.29,86.66S1.11,176.3,1.11,125.62Zm135.47,0c0-29.1-18.46-46.62-42.86-46.62S50.54,96.52,50.54,125.62s18.77,46.62,43.18,46.62S136.58,154.72,136.58,125.62Z" />
		<circle cx="227.6" cy="181.13" r="31.29" />
	</LogoSvg>
);

const Sidebar = ({ open, toggle, modules = [], activeModules = [] }) => {
	return (
		<Bar open={open}>
			<MenuToggle open={open} toggle={toggle} />
			{modules.map(item => (
				<EnhancedMenuItem
					key={item.id}
					title={item.label}
					{...item}
					open={open}
					alert={activeModules[item.id] || false}
				/>
			))}
			<Logo />
		</Bar>
	);
};

export default Sidebar;
