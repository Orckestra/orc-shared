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
	<LogoSvg viewBox="0 0 354 354">
		<g>
			<path d="M0 241.41c0-65.49 50.53-111.98 119.66-111.98s119.25 46.49 119.25 111.98c0 65.49-50.13 111.97-119.25 111.97S0 306.9 0 241.41Zm175.04 0c0-37.6-23.85-60.23-55.38-60.23s-55.79 22.64-55.79 60.23c0 37.59 24.26 60.23 55.79 60.23 31.53 0 55.38-22.64 55.38-60.23Zm178.1-76.35h-77.48c0-48.29-39.29-87.58-87.58-87.58V0c91.02 0 165.07 74.05 165.07 165.06h-.01Z" />
		</g>
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
