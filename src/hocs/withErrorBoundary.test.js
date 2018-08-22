import React from "react";
import withErrorBoundary from "./withErrorBoundary";

const FailBall = ({ error }) => {
	if (!error) throw new Error("Fail");
	return <div>FailBall has fail: {error.message}</div>;
};

const BoundedFailBall = withErrorBoundary("Failed")(FailBall);

describe("withErrorBoundary", () => {
	it("catches errors and passes them to component", () =>
		expect(
			<BoundedFailBall />,
			"to deeply render as",
			<div>FailBall has fail: Fail</div>,
		));
});
