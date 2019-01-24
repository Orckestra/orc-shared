import React from "react";
import Page from "./Page";
import SegmentPage from "./SegmentPage";

const FullPage = ({ path, config }) => {
	const { component, pages = {}, segments } = config;
	if (segments) {
		return (
			<SegmentPage path={path} component={component} segments={segments} />
		);
	}
	return <Page path={path} component={component} pages={pages} />;
};

export default FullPage;
