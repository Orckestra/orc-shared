import React from "react";
import Segment from "./Segment";

const View = () => <div />;

describe("Segment", () => {
	// < Shows view as right side of segment list, redirects tab of parent segpage >
	// view
	// view / subpage
	it("shows the selected view", () =>
		expect(<Segment config={{ component: View }} />, "to render as", <View />));
});
