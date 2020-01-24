import React, { useState, useEffect, useRef } from "react";
import loadable from "@loadable/component";
import { compose, branch, renderComponent } from "recompose";
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

const errorBoundary = compose(
	withErrorBoundary("Loader"),
	branch(({ error }) => !!error, renderComponent(Loading)),
);

const Loader = compLoader => {
	const Comp = loadable(compLoader, {
		fallback: <Loading />,
	});
	const BoundedComp = errorBoundary(Comp);
	BoundedComp.load = () => Comp.load();
	return BoundedComp;
};

export default Loader;
