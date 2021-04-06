import Immutable from "immutable";
import { requestRunningSelector, selectActivity } from "./requests";

describe("selectActivity", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			requests: {
				actives: {
					FOO: true,
					BAR: {
						type: "BAR_FAILURE",
						payload: { status: 500, message: "ServerError" },
					},
				},
			},
			view: {},
		});
	});

	it("gets the activity of a request from state", () => {
		expect(selectActivity, "called with", ["FOO"], "called with", [state], "to be true");
		expect(selectActivity, "called with", ["BAR"], "called with", [state], "to satisfy", {
			type: "BAR_FAILURE",
			payload: { status: 500, message: "ServerError" },
		});
		expect(selectActivity, "called with", ["MEEP"], "called with", [state], "to be falsy");
	});

	it("returns an identical selector for identical request names", () =>
		expect(selectActivity, "called with", ["FOO"], "to be", selectActivity("FOO")));

	it("returns true when at least one request is running when loadingScreen state is not set", () =>
		expect(requestRunningSelector, "when called with", [state], "to be truthy"));

	it("returns true when at least one request is running when loadingScreen state is set", () => {
		state = state.setIn(["view", "loadingScreen", "enabled"], true);
		expect(requestRunningSelector, "when called with", [state], "to be truthy");
	});

	it("returns true when at least one request is running when loadingScreen state is unset", () => {
		state = state.setIn(["view", "loadingScreen", "enabled"], false);
		expect(requestRunningSelector, "when called with", [state], "to be falsy");
	});
});
