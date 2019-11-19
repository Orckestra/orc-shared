import React from "react";
import { memoize } from "../../utils";
import withErrorBoundary from "../../hocs/withErrorBoundary";
import withWaypointing from "./withWaypointing";

const getWrappedView = memoize((path, View) =>
	withErrorBoundary(path)(withWaypointing(View)),
);

const Segment = ({ location, match, config, root }) => {
	const { component } = config;
	const View = getWrappedView(location.pathname, component);
	return <View location={location} match={match} mapFrom={root} />;
};

export default Segment;
