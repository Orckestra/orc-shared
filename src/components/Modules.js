import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import withErrorBoundary from "../hocs/withErrorBoundary";
import { getCurrentScope } from "../selectors/route";
import Navigation from "./Navigation";
import Segments from "./Segments";

export const Module = withErrorBoundary("Module")(
	({ name, pages = {}, component: MainPage, mode, root, error }) => {
		if (error) {
			return (
				<span>
					Module {name} errored: {error.message}
				</span>
			);
		}
		if (mode === "segments") {
			return <Segments pages={pages} root={root} />;
		}
		if (!MainPage) {
			return <span>Module {name} needs a renderable component</span>;
		}
		let innerError = null;
		const routes = Object.entries(pages).map(([route, page]) => {
			if (page.mode === "segments") {
				return (
					<Route
						key={route}
						path={root + route}
						render={() => <Segments pages={page.pages} root={root + route} />}
					/>
				);
			}
			const { component: Page } = page;
			if (!Page) {
				innerError = (
					<span>
						Page {page.name} under module {name} did not have a renderable
						component
					</span>
				);
				return null;
			}
			return <Route key={route} path={root + route} component={Page} />;
		});
		return (
			innerError || (
				<Switch>
					{routes}
					<Route exact path={root + "/"} component={MainPage} />
				</Switch>
			)
		);
	},
);

export const Modules = ({ modules, scope }) => (
	<React.Fragment>
		<Navigation modules={modules} />
		<Switch>
			{Object.entries(modules).map(([name, { pages, component, mode }]) => {
				return (
					<Route
						key={name}
						path={"/" + scope + "/" + name}
						render={() => (
							<Module
								{...{ name, pages, component, mode }}
								root={"/" + scope + "/" + name}
							/>
						)}
					/>
				);
			})}
		</Switch>
	</React.Fragment>
);

/* istanbul ignore next */
export default connect(
	/* istanbul ignore next */ state => ({ scope: getCurrentScope(state) }),
)(Modules);
