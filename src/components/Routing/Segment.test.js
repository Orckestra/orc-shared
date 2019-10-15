import React from "react";
import Segment from "./Segment";
import withWaypointing from "./withWaypointing";
import withErrorBoundary from "../../hocs/withErrorBoundary";

const View = () => <div />;
const ShownView = withErrorBoundary("/")(withWaypointing(View));

describe("Segment", () => {
	// < Shows view as right side of segment list, redirects tab of parent segpage >
	// view
	// view / subpage
	it("shows the selected view", () =>
		expect(
			<Segment location={{ pathname: "/" }} config={{ component: View }} />,
			"to render as",
			<ShownView />,
		));
});
