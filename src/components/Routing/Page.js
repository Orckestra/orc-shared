import React from "react";
import { Switch, Route } from "react-router";
import { memoize } from "../../utils";
import withErrorBoundary from "../../hocs/withErrorBoundary";
import FullPage from "./FullPage";
import SubPage from "./SubPage";
import withWaypointing from "./withWaypointing";

const getWrappedView = memoize((path, View) =>
	withErrorBoundary(path)(withWaypointing(View)),
);

const Page = ({ component: View, path, pages = {}, subpages = {} }) => {
	const WrappedView = getWrappedView(path, View);
	return (
		<React.Fragment>
			<Switch>
				{Object.entries(pages).map(([subpath, config]) => (
					<Route
						key={subpath}
						path={path + subpath}
						render={route => (
							<FullPage
								key={subpath}
								path={path + subpath}
								config={config}
								{...route}
							/>
						)}
					/>
				))}
				<Route
					key="/"
					path={path}
					render={route => (
						<WrappedView key="/" {...route} mapFrom={route.match.url} />
					)}
				/>
			</Switch>
			<Switch>
				{Object.entries(subpages).map(([subpath, config]) => (
					<Route
						key={subpath}
						path={path + subpath}
						render={route => <SubPage root={path} config={config} {...route} />}
					/>
				))}
			</Switch>
		</React.Fragment>
	);
};

export default Page;
