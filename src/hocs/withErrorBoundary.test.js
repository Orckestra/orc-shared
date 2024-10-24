import React from "react";
import { mount } from "unexpected-reaction";
import { spyOnConsole } from "../utils/testUtils";
import withErrorBoundary from "./withErrorBoundary";

const FailBall = ({ error }) => {
	if (!error) throw new Error("Fail");
	return <div>FailBall has fail: {error.message}</div>;
};

const BoundedFailBall = withErrorBoundary("Failed")(FailBall);
BoundedFailBall.displayName = "BoundedFailBall";

describe("withErrorBoundary", () => {
	spyOnConsole();
	it("catches errors and passes them to component", () =>
		expect(<BoundedFailBall />, "when mounted", "to have text", "FailBall has fail: Fail"));

	it("logs errors to console", () => {
		mount(<BoundedFailBall />);
		return expect(console.error, "to have calls satisfying", [
			{
				args: [expect.it("to begin with", "Error: Uncaught [Error: Fail]"), expect.it("to be an", Error)],
			},
			{
				args: [expect.it("to begin with", "The above error occurred in the <FailBall> component")],
			},
			{ args: ["Caught an error: Fail, at boundary Failed"] },
			{
				args: [
					expect.it(
						"to match",
						/at FailBall.*withErrorBoundary\.test\.js.*at ErrorBoundary.*withErrorBoundary\.js.*at BoundedFailBall/s,
					),
				],
			},
		]);
	});
});
