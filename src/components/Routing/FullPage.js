import React from "react";
import Page from "./Page";
import SegmentPage from "./SegmentPage";

const FullPage = ({ path, config, location, match }) => {
	const { component, pages = {}, segments, subpages } = config;
	if (segments) {
		return (
			<SegmentPage
				path={path}
				component={component}
				segments={segments}
				location={location}
				match={match}
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
		/>
	);
};

export default FullPage;
