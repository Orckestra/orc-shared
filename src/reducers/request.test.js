import Immutable from "immutable";
import reducer from "./request";

describe("Request reducer", () => {
	it("behaves as a reducer should", () =>
		expect(reducer, "to be a reducer with initial state", {}));

	it("sets flag when a request is started", () => {
		const oldState = Immutable.fromJS({
			SOME_FLAG: true,
		});
		const action = { type: "TEST_THIS_REQUEST" };
		const newState = reducer(oldState, action);
		expect(newState, "not to be", oldState).and(
			"to equal",
			Immutable.fromJS({
				SOME_FLAG: true,
				TEST_THIS: true,
			}),
		);
	});

	it("clears flag when a request succeeds", () => {
		const oldState = Immutable.fromJS({
			SOME_FLAG: true,
			TEST_THIS: true,
		});
		const action = { type: "TEST_THIS_SUCCESS" };
		const newState = reducer(oldState, action);
		expect(newState, "not to be", oldState).and(
			"to equal",
			Immutable.fromJS({
				SOME_FLAG: true,
			}),
		);
	});

	it("clears flag when a request fails", () => {
		const oldState = Immutable.fromJS({
			SOME_FLAG: true,
			TEST_THIS: true,
		});
		const action = { type: "TEST_THIS_FAILURE" };
		const newState = reducer(oldState, action);
		expect(newState, "not to be", oldState).and(
			"to equal",
			Immutable.fromJS({
				SOME_FLAG: true,
			}),
		);
	});
});
