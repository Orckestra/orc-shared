import Immutable from "immutable";
import { GET_SCOPES_SUCCESS } from "../actions/scopes";
import reducer from "./scopes";

describe("scopes", () => {
	it("behaves as a reducer should", () => expect(reducer, "to be a reducer with initial state", {}));

	it("saves a normalized index of scopes with child lists, keys all lower case", () => {
		const oldState = Immutable.Map({});
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
						children: [{ id: "ThirdGrandchild" }, { id: "FourthGrandchild" }, { id: "FifthGrandchild" }],
					},
				],
			},
		};
		const newState = reducer(oldState, action);
		return expect(newState, "not to be", oldState).and(
			"to satisfy",
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

	it("updates a normalized index of scopes with child lists, keys all lower case", () => {
		const oldState = Immutable.Map({
			Global: {
				id: "Global",
				isAuthorizedScope: false,
				children: ["Child1", "Child2", "Child3"],
				scopePath: ["Global"],
			},
			Child1: { id: "Child1", isAuthorizedScope: true, scopePath: ["Global", "Child1"], children: [] },
			Child2: { id: "Child2", isAuthorizedScope: false, scopePath: ["Global", "Child2"], children: [] },
		});

		const action = {
			type: GET_SCOPES_SUCCESS,
			payload: {
				id: "Global",
				isAuthorized: false,
				children: [
					{ id: "Child1", isAuthorizedScope: false, children: [], parentScopeId: "Global" },
					{ id: "Child2", isAuthorizedScope: true, children: [], parentScopeId: "Global" },
					{ id: "Child3", isAuthorizedScope: false, children: [], parentScopeId: "Global" },
					{ id: "Child4", isAuthorizedScope: true, children: [], parentScopeId: "Global" },
					{ id: "Child5", isAuthorizedScope: true, children: [], parentScopeId: "UnknownParent" },
				],
			},
		};
		const newState = reducer(oldState, action);
		return expect(newState, "not to be", oldState).and(
			"to satisfy",
			Immutable.fromJS({
				Global: {
					id: "Global",
					isAuthorizedScope: false,
					children: ["Child1", "Child2", "Child3", "Child4"],
					scopePath: ["Global"],
				},
				Child1: { id: "Child1", isAuthorizedScope: true, scopePath: ["Global", "Child1"], children: [] },
				Child2: { id: "Child2", isAuthorizedScope: true, scopePath: ["Global", "Child2"], children: [] },
				Child3: { id: "Child3", isAuthorizedScope: false, scopePath: ["Global", "Child3"], children: [] },
				Child4: { id: "Child4", isAuthorizedScope: true, scopePath: ["Global", "Child4"], children: [] },
			}),
		);
	});
});
