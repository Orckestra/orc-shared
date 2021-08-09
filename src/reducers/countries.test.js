import Immutable from "immutable";
import { GET_COUNTRIES_SUCCESS } from "../actions/countries";
import reducer from "./countries";

describe("countries", () => {
	it("behaves as a reducer should", () => expect(reducer, "to be a reducer with initial state", {}));

	it("saves countries", () => {
		const oldState = Immutable.fromJS({});
		const action = {
			type: GET_COUNTRIES_SUCCESS,
			payload: [
				{ id: "test1", isoCode: "code1" },
				{ id: "test2", isoCode: "code2" },
			],
		};
		const newState = reducer(oldState, action);
		return expect(newState, "not to be", oldState).and(
			"to equal",
			Immutable.fromJS({
				code1: { id: "test1", isoCode: "code1" },
				code2: { id: "test2", isoCode: "code2" },
			}),
		);
	});
});
