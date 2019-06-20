import Immutable from "immutable";
import { GET_APPLICATIONS_SUCCESS } from "../actions/applications";
import reducer from "./applications";

describe("applications", () => {
	it("behaves as a reducer should", () =>
		expect(reducer, "to be a reducer with initial state", {
			list: [],
		}));

	it("saves a list of applications", () => {
		const oldState = Immutable.fromJS({
			list: [{ foo: "bar" }],
			defaultApp: null,
		});
		const action = {
			type: GET_APPLICATIONS_SUCCESS,
			payload: [{ new: true, id: "item" }],
		};
		const newState = reducer(oldState, action);
		return expect(newState, "not to be", oldState).and(
			"to satisfy",
			Immutable.fromJS({ list: [{ new: true, id: "item" }] }),
		);
	});
});
