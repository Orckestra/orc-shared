import React, { useState, useEffect, useRef } from "react";
import loadable from "@loadable/component";
import withErrorBoundary from "../hocs/withErrorBoundary";
import LoadingIcon from "./LoadingIcon";
import ErrorPlaceholder from "./ErrorPlaceholder";

export const Loading = ({ error }) => {
	const [pastDelay, flagDelay] = useState(false);
	let timer = useRef(null);
	useEffect(() => {
		// Prevent refiring delay timeout
		if (!pastDelay && !timer.current) {
			timer.current = setTimeout(() => flagDelay(true), 200);
		}
		return () => clearTimeout(timer.current);
	});
	if (error) {
		return <ErrorPlaceholder message={error.message} />;
	} else if (pastDelay) {
		return <LoadingIcon />;
	} else {
		return null;
	}
};

const Loader = loaderFunc => {
	const Comp = loadable(loaderFunc, { fallback: <Loading /> });
	const BoundedComp = withErrorBoundary("Loader")(({ error, ...props }) =>
		error ? <Loading error={error} /> : <Comp {...props} />,
	);
	BoundedComp.load = () => Comp.load();
	return BoundedComp;
};

export default Loader;
