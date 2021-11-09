import React from "react";
import Page from "./Page";
import SegmentPage from "./SegmentPage";

const FullPage = ({ path, config, location, match, modulePrependPath, isVisible }) => {
	const { component, componentProps, pages = {}, segments, subpages, entityIdResolver } = config;
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
			component={component}
			pages={pages}
			subpages={subpages}
			location={location}
			match={match}
			isVisible={isVisible}
			modulePrependPath={modulePrependPath}
		/>
	);
};

export default FullPage;
