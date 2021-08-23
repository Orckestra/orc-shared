import React, { useMemo } from "react";
import withErrorBoundary from "../../hocs/withErrorBoundary";
import withWaypointing from "./withWaypointing";

const Segment = ({ location, match, config, root, modulePrependPath }) => {
	const { component, componentProps } = config;
	const path = location.pathname;
	const View = useMemo(
		() => withErrorBoundary(path)(withWaypointing(component, componentProps)),
		[path, component, componentProps],
	);
	return <View location={location} match={match} mapFrom={root} modulePrependPath={modulePrependPath} />;
};

export default Segment;
