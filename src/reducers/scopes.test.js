import Immutable from "immutable";
import { GET_MY_SCOPE_SUCCESS, GET_SCOPES_SUCCESS } from "../actions/scopes";
import reducer from "./scopes";

describe("scopes", () => {
	it("behaves as a reducer should", () =>
		expect(reducer, "to be a reducer with initial state", {
			scopes: {},
			defaultScope: null,
		}));

	it("saves a normalized index of scopes with child lists, keys all lower case", () => {
		const oldState = Immutable.fromJS({
			scopes: Immutable.Map({ Global: {} }),
		});
		const action = {
			type: GET_SCOPES_SUCCESS,
			payload: {
				id: "Global",
				children: [
					{
						id: "FirstChild",
						children: [{ id: "FirstGrandchild" }, { id: "SecondGrandchild" }],
					},
					{
						id: "SecondChild",
						children: [
							{ id: "ThirdGrandchild" },
							{ id: "FourthGrandchild" },
							{ id: "FifthGrandchild" },
						],
					},
				],
			},
		};
		const newState = reducer(oldState, action);
		return expect(newState, "not to be", oldState).and(
			"to have value at",
			["scopes"],
			Immutable.fromJS({
				Global: {
					id: "Global",
					children: ["FirstChild", "SecondChild"],
				},
				FirstChild: {
					id: "FirstChild",
					children: ["FirstGrandchild", "SecondGrandchild"],
				},
				FirstGrandchild: { id: "FirstGrandchild" },
				SecondGrandchild: { id: "SecondGrandchild" },
				SecondChild: {
					id: "SecondChild",
					children: ["ThirdGrandchild", "FourthGrandchild", "FifthGrandchild"],
				},
				ThirdGrandchild: { id: "ThirdGrandchild" },
				FourthGrandchild: { id: "FourthGrandchild" },
				FifthGrandchild: { id: "FifthGrandchild" },
			}),
		);
	});

	it("saves a newly set default scope", () => {
		const oldState = Immutable.fromJS({
			defaultScope: null,
		});
		const action = {
			type: GET_MY_SCOPE_SUCCESS,
			payload: { id: "aScope" },
		};
		const newState = reducer(oldState, action);
		expect(newState, "not to be", oldState).and("to satisfy", {
			defaultScope: "aScope",
		});
	});
});
