import React from "react";
import Loadable from "react-loadable";

/* istanbul ignore next */
const Loader = compLoader =>
	Loadable({
		loader: compLoader,
		loading() {
			return <div></div>;
		},
	});

export default Loader;
