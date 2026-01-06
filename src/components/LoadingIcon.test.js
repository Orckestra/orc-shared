import React from "react";
import Placeholder from "./MaterialUI/DataDisplay/PredefinedElements/Placeholder";
import LoadingIcon from "./LoadingIcon";

describe("LoadingIcon", () => {
	it("shows a spinning load icon", () =>
		expect(<LoadingIcon />, "when mounted", "to satisfy", <Placeholder icon="orckestra-loader" animateIcon />));
});
