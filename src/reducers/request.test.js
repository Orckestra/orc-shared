import Immutable from "immutable";
import reducer, { ERROR, LOGOUT } from "./request";

describe("Request reducer", () => {
	it("behaves as a reducer should", () => expect(reducer, "to be a reducer with initial state", {}));

	it("sets activity flag when a request is started", () => {
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

	it("clears activity and logout flag when a request succeeds", () => {
		const oldState = Immutable.fromJS({
			SOME_FLAG: true,
			TEST_THIS: true,
			[LOGOUT]: true,
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

	it("clears activity flag and sets error flag when a request fails without payload", () => {
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
				TEST_THIS: action,
				[ERROR]: action,
			}),
		);
	});

	it("clears activity flag and sets error flag when a request fails with other status", () => {
		const oldState = Immutable.fromJS({
			SOME_FLAG: true,
			TEST_THIS: true,
		});
		const action = {
			type: "TEST_THIS_FAILURE",
			payload: { status: 500, message: "ServerError" },
		};
		const newState = reducer(oldState, action);
		expect(newState, "not to be", oldState).and(
			"to equal",
			Immutable.fromJS({
				SOME_FLAG: true,
				TEST_THIS: action,
				[ERROR]: action,
			}),
		);
	});

	it("clears activity flag and sets login flag when a request fails with status 403", () => {
		const oldState = Immutable.fromJS({
			SOME_FLAG: true,
			TEST_THIS: true,
		});
		const action = {
			type: "TEST_THIS_FAILURE",
			payload: { status: 403, message: "UnauthorizedAccessException" },
		};
		const newState = reducer(oldState, action);
		expect(newState, "not to be", oldState).and(
			"to equal",
			Immutable.fromJS({
				SOME_FLAG: true,
				[LOGOUT]: true,
			}),
		);
	});
});
