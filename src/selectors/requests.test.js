import Immutable from "immutable";
import { selectActivity } from "./requests";

describe("selectActivity", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			requests: {
				FOO: true,
				BAR: {
					type: "BAR_FAILURE",
					payload: { status: 500, message: "ServerError" },
				},
			},
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
});
