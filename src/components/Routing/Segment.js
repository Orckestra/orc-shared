import React, { useMemo } from "react";
import withErrorBoundary from "../../hocs/withErrorBoundary";
import withWaypointing from "./withWaypointing";

const Segment = ({ location, match, config, root }) => {
	const { component } = config;
	const path = location.pathname;
	const View = useMemo(
		() => withErrorBoundary(path)(withWaypointing(component)),
		[path, component],
	);
	return <View location={location} match={match} mapFrom={root} />;
};

export default Segment;
