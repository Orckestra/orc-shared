/* istanbul ignore file */
import React from "react";

// If you want to investigate rerenderer of components, import that file before "react-hot-loader", usually in App.js
if (process.env.NODE_ENV === "development") {
	const whyDidYouRender = require("@welldone-software/why-did-you-render");
	whyDidYouRender(React, {
		trackAllPureComponents: true,
	});
}
