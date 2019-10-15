import React from "react";
import Loadable from "react-loadable";
import LoadingIcon from "./LoadingIcon";
import ErrorPlaceholder from "./ErrorPlaceholder";

export const Loading = ({ error, retry, pastDelay }) => {
	if (error) {
		console.error(error);
		return <ErrorPlaceholder message={error.message} onClick={retry} />;
	} else if (pastDelay) {
		return <LoadingIcon />;
	} else {
		return null;
	}
};

/* istanbul ignore next */
const Loader = compLoader =>
	Loadable({
		loader: compLoader,
		loading: Loading,
	});

export default Loader;
