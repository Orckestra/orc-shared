import React from "react";
import Page from "./Page";
import SegmentPage from "./SegmentPage";

const FullPage = ({ path, config, location, match, modulePrependPath }) => {
	const { component, pages = {}, segments, subpages } = config;
	if (segments) {
		return (
			<SegmentPage
				path={path}
				component={component}
				segments={segments}
				location={location}
				match={match}
				modulePrependPath={modulePrependPath}
			/>
		);
	}
	return (
		<Page
			path={path}
			component={component}
			pages={pages}
			subpages={subpages}
			location={location}
			match={match}
			modulePrependPath={modulePrependPath}
		/>
	);
};

export default FullPage;
