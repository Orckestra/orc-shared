import Immutable from "immutable";
import { GET_SCOPE_EXTENDED_CONFIGURATION_SUCCESS } from "../actions/scopes";
import reducer from "./scopesExtendedConfiguration";

describe("scopesExtendedConfiguration", () => {
	it("behaves as a reducer should", () => expect(reducer, "to be a reducer with initial state", {}));

	it("save scope info to store", () => {
		const oldState = Immutable.Map({
			TheScope: { extConfig: 789 },
			anotherScope: { extConfig: 456 },
		});
		const action = {
			type: GET_SCOPE_EXTENDED_CONFIGURATION_SUCCESS,
			meta: {
				scope: "TheScope",
			},
			payload: {
				extConfig: 123,
			},
		};
		const newState = reducer(oldState, action);
		return expect(newState, "not to be", oldState).and(
			"to satisfy",
			Immutable.fromJS({
				TheScope: { extConfig: 123 },
				anotherScope: { extConfig: 456 },
			}),
		);
	});
});
