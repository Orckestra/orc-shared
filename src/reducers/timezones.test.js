import Immutable from "immutable";
import { GET_TIMEZONES_SUCCESS } from "../actions/timezones";
import reducer from "./timezones";

describe("timezones", () => {
	it("behaves as a reducer should", () => expect(reducer, "to be a reducer with initial state", {}));

	it("saves countries", () => {
		const oldState = Immutable.fromJS({});
		const action = {
			type: GET_TIMEZONES_SUCCESS,
			payload: [{ id: "test1" }, { id: "test2" }],
		};
		const newState = reducer(oldState, action);
		return expect(newState, "not to be", oldState).and(
			"to equal",
			Immutable.fromJS({
				test1: { id: "test1" },
				test2: { id: "test2" },
			}),
		);
	});
});
