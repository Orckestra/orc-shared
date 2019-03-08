import React from "react";
import routingConnector from "../hocs/routingConnector";
import { Route, Switch, Redirect } from "react-router-dom";
import withErrorBoundary from "../hocs/withErrorBoundary";
import { getCurrentScope } from "../selectors/navigation";
import Navigation from "./Navigation";
import FullPage from "./Routing/FullPage";

export const Module = withErrorBoundary("Module")(
	({ config, path, error, location, match }) => {
		return (
			<FullPage path={path} config={config} location={location} match={match} />
		);
	},
);

export const Modules = ({ modules, scope }) => (
	<React.Fragment>
		<Navigation modules={modules} />
		<Switch>
			{Object.entries(modules).map(([name, module]) => {
				return (
					<Route
						key={name}
						path={"/:scope/" + name}
						render={route => (
							<Module config={module} path={"/:scope/" + name} {...route} />
						)}
					/>
				);
			})}
			<Redirect to={`/${scope}/${Object.keys(modules)[0]}`} />
		</Switch>
	</React.Fragment>
);

/* istanbul ignore next */
export default routingConnector(
	/* istanbul ignore next */ state => ({
		scope: getCurrentScope(state),
	}),
)(Modules);
