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
		console.error(error);
		return <ErrorPlaceholder message={error.message} />;
	} else if (pastDelay) {
		return <LoadingIcon />;
	} else {
		return null;
	}
};

/* istanbul ignore next */
const Loader = compLoader =>
	withErrorBoundary("Loader")(
		Loadable({
			loader: compLoader,
			loading: Loading,
		}),
	);

export default Loader;
