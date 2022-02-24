import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import withErrorBoundary from "../hocs/withErrorBoundary";
import { getCurrentScope, getCurrentScopeFromRoute, selectRouteHref } from "../selectors/navigation";
import { isCurrentScopeAuthorizedSelector } from "../selectors/scope";
import Navigation from "./Navigation";
import FullPage from "./Routing/FullPage";
import { setHrefConfig } from "../actions/navigation";
import {
	setRoutingPerformed,
	setModuleAsVisible,
	setModulesStructure,
	initializeFirstModuleScope,
} from "../actions/modules";
import { defaultScopeSelector, getApplicationModulesSelector } from "../selectors/settings";
import { getScopeModuleInformationSelector } from "../selectors/modules";
import UrlPattern from "url-pattern";
import { overtureModule } from "../constants";

const rerouteOnScopeAndModule = (history, currentRoute, scope, module) => {
	const params = {
		scope: scope,
	};

	const pattern = new UrlPattern(`/:scope/${module}`);
	const href = pattern.stringify(params);

	if (currentRoute !== href) {
		history.push(href);
	}
};

export const Module = withErrorBoundary("Module")(({ id, config, path, error, location, match, modulePrependPath }) => {
	const history = useHistory();
	const scope = useSelector(getCurrentScopeFromRoute);
	const currentRoute = useSelector(selectRouteHref);
	const moduleInfo = useSelector(getScopeModuleInformationSelector);

	const isVisible =
		moduleInfo.scope != null && moduleInfo.visibleModules.length > 0 && moduleInfo.visibleModules.includes(id);

	React.useEffect(() => {
		if (moduleInfo.scope != null && scope === moduleInfo.scope && moduleInfo.visibleModules.length > 0 && !isVisible) {
			rerouteOnScopeAndModule(history, currentRoute, moduleInfo.scope, moduleInfo.visibleModules[0]);
		}
	}, [history, scope, isVisible, currentRoute, moduleInfo.scope, moduleInfo.visibleModules]);

	return (
		<FullPage
			path={path}
			config={config}
			location={location}
			match={match}
			modulePrependPath={modulePrependPath}
			isVisible={isVisible}
		/>
	);
});

const getHrefFromPath = (path, scope) => path.replace(":scope", scope);

const CheckModuleVisibility = ({ id, config, moduleInfo }) => {
	const dispatch = useDispatch();
	const applicationModules = useSelector(getApplicationModulesSelector);
	const scopeFromRoute = useSelector(getCurrentScopeFromRoute);

	const hideSelector = state => (typeof config.hide === "function" ? config.hide(state) : () => config.hide ?? false);

	const isHidden = useSelector(hideSelector(moduleInfo.scope ?? scopeFromRoute));

	const moduleScope = moduleInfo.scope;
	const moduleIsVisible = isHidden === false && !moduleInfo.visibleModules.includes(id);

	React.useEffect(() => {
		// We need to wait for the ROUTE to be set the first time in the Redux/Store before to set module's visibility
		if (scopeFromRoute !== null || applicationModules.includes(overtureModule.System)) {
			if (moduleScope == null) {
				dispatch(initializeFirstModuleScope(scopeFromRoute));
			}

			if (moduleIsVisible) {
				dispatch(setModuleAsVisible(id));
			}
		}
	}, [moduleScope, moduleIsVisible, dispatch, id, scopeFromRoute, applicationModules]);

	return <React.Fragment />;
};

export const Modules = ({ modules, pathConfig: { customPath, ...otherConfigs } = {} }) => {
	const dispatch = useDispatch();
	const currentScope = useSelector(getCurrentScope);
	const isAuthorizedScope = useSelector(isCurrentScopeAuthorizedSelector);
	const defaultScope = useSelector(defaultScopeSelector);
	const history = useHistory();
	const location = useLocation();
	const currentRoute = useSelector(selectRouteHref);

	const moduleInfo = useSelector(getScopeModuleInformationSelector);

	const firstModuleName = Object.keys(modules)[0];

	const destinationModule =
		moduleInfo.routingPerformed === false &&
		moduleInfo.scope != null &&
		moduleInfo.visibleModules.length > 0 &&
		moduleInfo.moduleName != null
			? moduleInfo.visibleModules.includes(moduleInfo.moduleName)
				? moduleInfo.moduleName
				: moduleInfo.visibleModules[0]
			: null;

	const scopePath = "/:scope/";
	const prependPath = customPath || scopePath;
	const prependHref = getHrefFromPath(prependPath, currentScope);

	Object.keys(otherConfigs).forEach(key => {
		const moduleConfig = otherConfigs[key];
		moduleConfig.prependHref = getHrefFromPath(moduleConfig.prependPath, currentScope);
	});

	useEffect(() => {
		dispatch(setHrefConfig(prependPath, prependHref, otherConfigs));
	}, [dispatch, prependPath, prependHref, otherConfigs]);

	const getModuleConfig = name => (otherConfigs && otherConfigs[name]) || { prependPath, prependHref };

	useEffect(() => {
		const { pathname, search } = location;
		if (!isAuthorizedScope && pathname.includes(currentScope) && defaultScope) {
			history.push(pathname.replace(currentScope, defaultScope) + search);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthorizedScope, defaultScope, history, currentScope]);

	React.useEffect(() => {
		dispatch(setModulesStructure(modules));
	}, [dispatch, modules]);

	useEffect(() => {
		if (destinationModule != null) {
			rerouteOnScopeAndModule(history, currentRoute, moduleInfo.scope, destinationModule);

			dispatch(setRoutingPerformed());
		}
	}, [dispatch, history, moduleInfo.scope, destinationModule, currentRoute]);

	return (
		<React.Fragment>
			<Navigation modules={modules} />
			{Object.entries(modules).map(([name, module]) => (
				<CheckModuleVisibility key={name} id={name} config={module} moduleInfo={moduleInfo} />
			))}
			<Switch>
				{Object.entries(modules).map(([name, module]) => {
					const moduleConfig = getModuleConfig(name);
					const path = `${moduleConfig.prependPath}${name}`;
					return (
						<Route
							key={name}
							path={path}
							render={route => (
								<Module id={name} modulePrependPath={moduleConfig.prependPath} config={module} path={path} {...route} />
							)}
						/>
					);
				})}
				<Redirect to={`${getModuleConfig(firstModuleName).prependHref}${firstModuleName}`} />
			</Switch>
		</React.Fragment>
	);
};

export default Modules;
