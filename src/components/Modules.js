import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import withErrorBoundary from "../hocs/withErrorBoundary";
import { getCurrentScope } from "../selectors/navigation";
import Navigation from "./Navigation";
import FullPage from "./Routing/FullPage";
import { setHrefConfig } from "../actions/navigation";
import { initializeEditTree } from "../actions/view";
import { setModulesStructure } from "../actions/modules";

export const Module = withErrorBoundary("Module")(({ config, path, error, location, match }) => {
	return <FullPage path={path} config={config} location={location} match={match} />;
});

export const Modules = ({ modules, customPath, customHref }) => {
	const dispatch = useDispatch();
	const scope = useSelector(getCurrentScope);
	const scopePath = "/:scope/";
	const scopeHref = `/${scope}/`;

	const prependPath = customPath || scopePath;
	const prependHref = customHref || scopeHref;
	dispatch(setHrefConfig(prependPath, prependHref));

	React.useEffect(() => {
		dispatch(setModulesStructure(modules));
		dispatch(initializeEditTree(modules));
	}, [dispatch, modules]);

	return (
		<React.Fragment>
			<Navigation modules={modules} />
			<Switch>
				{Object.entries(modules).map(([name, module]) => {
					const path = `${prependPath}${name}`;
					return <Route key={name} path={path} render={route => <Module config={module} path={path} {...route} />} />;
				})}
				<Redirect to={`${prependHref}${Object.keys(modules)[0]}`} />
			</Switch>
		</React.Fragment>
	);
};

export default Modules;
