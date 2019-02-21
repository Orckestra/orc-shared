import React from "react";
import withWaypointing from "./withWaypointing";

const Segment = ({ location, match, config, root }) => {
	const { component } = config;
	const View = withWaypointing(component);
	return <View location={location} match={match} mapFrom={root} />;
};

export default Segment;
