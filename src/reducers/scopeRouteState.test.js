import Immutable from "immutable";
import { applicationScopeHasChanged } from "../actions/scopes";
import reducer from "./scopeRouteState";
import { setRoute } from "../actions/navigation";

describe("scopeRouteState", () => {
	it("behaves as a reducer should", () =>
		expect(reducer, "to be a reducer with initial state", { scopeChangeInProgress: false }));

	it("set scopeChangeInProgress to true if scope is different", () => {
		const oldState = Immutable.Map({
			scopeChangeInProgress: false,
		});
		const action = applicationScopeHasChanged("prevScope", "newScope", "module");

		const newState = reducer(oldState, action);
		return expect(newState, "not to be", oldState).and(
			"to satisfy",
			Immutable.fromJS({
				scopeChangeInProgress: true,
			}),
		);
	});

	it("scopeChangeInProgress stays false if prev and new scope are identical", () => {
		const oldState = Immutable.Map({
			scopeChangeInProgress: false,
		});
		const action = applicationScopeHasChanged("sameScope", "sameScope", "module");

		const newState = reducer(oldState, action);
		return expect(newState, "to be", oldState);
	});

	it("set scopeChangeInProgress to false when route changes", () => {
		const oldState = Immutable.Map({
			scopeChangeInProgress: true,
		});
		const action = setRoute("loc", {});

		const newState = reducer(oldState, action);
		return expect(newState, "not to be", oldState).and(
			"to satisfy",
			Immutable.fromJS({
				scopeChangeInProgress: false,
			}),
		);
	});
});
