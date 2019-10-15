import React from "react";
import withErrorBoundary from "../../hocs/withErrorBoundary";
import withWaypointing from "./withWaypointing";

const Segment = ({ location, match, config, root }) => {
	const { component } = config;
	const View = withErrorBoundary(location.pathname)(withWaypointing(component));
	return <View location={location} match={match} mapFrom={root} />;
};

export default Segment;
