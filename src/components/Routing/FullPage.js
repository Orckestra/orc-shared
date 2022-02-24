import React from "react";
import Page from "./Page";
import SegmentPage from "./SegmentPage";

const FullPage = ({ path, config, location, match, modulePrependPath, isVisible = true }) => {
	const {
		component,
		routerComponent = null,
		componentProps,
		pages = {},
		segments,
		subpages,
		entityIdResolver,
	} = config;
	if (segments) {
		return (
			<SegmentPage
				path={path}
				component={component}
				componentProps={componentProps ?? {}}
				segments={segments}
				location={location}
				match={match}
				modulePrependPath={modulePrependPath}
				entityIdResolver={entityIdResolver}
			/>
		);
	}
	return (
		<Page
			path={path}
			component={component ?? routerComponent}
			pages={pages}
			subpages={subpages}
			location={location}
			match={match}
			isVisible={isVisible === true || routerComponent != null}
			modulePrependPath={modulePrependPath}
		/>
	);
};

export default FullPage;
