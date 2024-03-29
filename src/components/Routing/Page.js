import React, { useMemo } from "react";
import { Switch, Route } from "react-router";
import withErrorBoundary from "../../hocs/withErrorBoundary";
import FullPage from "./FullPage";
import SubPage from "./SubPage";
import withWaypointing from "./withWaypointing";
import UrlPattern from "url-pattern";

const Page = ({ component: View, path, pages = {}, subpages = {}, modulePrependPath, isVisible = true }) => {
	const WrappedView = useMemo(() => withErrorBoundary(path)(withWaypointing(View, isVisible)), [path, View, isVisible]);
	const parentUrlPattern = new UrlPattern(path);

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
								modulePrependPath={modulePrependPath}
							/>
						)}
					/>
				))}
				<Route
					key="/"
					path={path}
					render={route => (
						<WrappedView key="/" {...route} mapFrom={route.match.url} modulePrependPath={modulePrependPath} />
					)}
				/>
			</Switch>
			<Switch>
				{Object.entries(subpages).map(([subpath, config]) => (
					<Route
						key={subpath}
						path={path + subpath}
						render={route => (
							<SubPage
								root={path}
								config={config}
								parentUrlPattern={parentUrlPattern}
								{...route}
								modulePrependPath={modulePrependPath}
							/>
						)}
					/>
				))}
			</Switch>
		</React.Fragment>
	);
};

export default Page;
