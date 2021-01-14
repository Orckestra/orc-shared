import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import withErrorBoundary from "../hocs/withErrorBoundary";
import { getCurrentScope, selectRouteHref } from "../selectors/navigation";
import { currentScopeSelector } from "../selectors/scope";
import Navigation from "./Navigation";
import FullPage from "./Routing/FullPage";
import { setHrefConfig } from "../actions/navigation";
import { setModulesStructure } from "../actions/modules";
import { defaultScopeSelector } from "../selectors/settings";

export const Module = withErrorBoundary("Module")(({ config, path, error, location, match, modulePrependPath }) => {
	return (
		<FullPage path={path} config={config} location={location} match={match} modulePrependPath={modulePrependPath} />
	);
});

const getHrefFromPath = (path, scope) => path.replace(":scope", scope);

export const Modules = ({ modules, pathConfig: { customPath, ...otherConfigs } = {} }) => {
	const dispatch = useDispatch();
	const scope = useSelector(getCurrentScope);
	const isAuthorizedScope = useSelector(currentScopeSelector).get("isAuthorizedScope", true);
	const defaultScope = useSelector(defaultScopeSelector);
	const location = useSelector(selectRouteHref);

	const scopePath = "/:scope/";
	const prependPath = customPath || scopePath;
	const prependHref = getHrefFromPath(prependPath, scope);

	Object.keys(otherConfigs).forEach(key => {
		const moduleConfig = otherConfigs[key];
		moduleConfig.prependHref = getHrefFromPath(moduleConfig.prependPath, scope);
	});

	useEffect(() => {
		dispatch(setHrefConfig(prependPath, prependHref, otherConfigs));
	}, [dispatch, prependPath, prependHref, otherConfigs]);

	const getModuleConfig = name => (otherConfigs && otherConfigs[name]) || { prependPath, prependHref };
	const firstModuleName = Object.keys(modules)[0];

	useEffect(() => {
		if (!isAuthorizedScope && location.includes(scope) && defaultScope) {
			window.location.replace(location.replace(scope, defaultScope));
		}
	}, [isAuthorizedScope, defaultScope]);

	React.useEffect(() => {
		dispatch(setModulesStructure(modules));
	}, [dispatch, modules]);

	return (
		<React.Fragment>
			<Navigation modules={modules} />
			<Switch>
				{Object.entries(modules).map(([name, module]) => {
					const moduleConfig = getModuleConfig(name);
					const path = `${moduleConfig.prependPath}${name}`;
					return (
						<Route
							key={name}
							path={path}
							render={route => (
								<Module modulePrependPath={moduleConfig.prependPath} config={module} path={path} {...route} />
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
