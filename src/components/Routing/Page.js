import React from "react";
import { Switch, Route } from "react-router";
import FullPage from "./FullPage";
import SubPage from "./SubPage";
import withWaypointing from "./withWaypointing";

const Page = ({ component: View, path, pages = {}, subpages = {} }) => {
	const WrappedView = withWaypointing(View);
	return (
		<Switch>
			<Route exact path={path} component={WrappedView} />
			{Object.entries(subpages).map(([subpath, config]) => (
				<Route
					key={subpath}
					path={path + subpath}
					render={() => <SubPage path={path + subpath} config={config} />}
				/>
			))}
			{Object.entries(pages).map(([subpath, config]) => (
				<Route
					key={subpath}
					path={path + subpath}
					render={({ location, match }) => (
						<FullPage
							path={path + subpath}
							location={location}
							match={match}
							config={config}
						/>
					)}
				/>
			))}
		</Switch>
	);
};

export default Page;
