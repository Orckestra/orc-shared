import React, { useState, useEffect, useRef } from "react";
import Loadable from "react-loadable";
import withErrorBoundary from "../hocs/withErrorBoundary";
import LoadingIcon from "./LoadingIcon";
import ErrorPlaceholder from "./ErrorPlaceholder";

export const Loading = ({ error }) => {
	const [pastDelay, flagDelay] = useState(false);
	let timer = useRef(null);
	useEffect(() => {
		// Prevent refiring delay timeout
		if (!timer.current) {
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

/* istanbul ignore next */
const Loader = compLoader => {
	const Comp = Loadable({
		loader: compLoader,
		loading: Loading,
	});
	const BoundedComp = withErrorBoundary("Loader")(Comp);
	BoundedComp.preload = () => Comp.preload();
	return BoundedComp;
};

export default Loader;
