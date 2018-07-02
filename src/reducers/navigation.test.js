import Immutable from "immutable";
import { LOCATION_CHANGED } from "redux-little-router";
import { removeTab } from "../actions/navigation";
import reducer from "./navigation";

describe("Navigation reducer", () => {
	it("behaves as a reducer should", () =>
		expect(reducer, "to be a reducer with initial state", {
			tabIndex: {},
			moduleTabs: {},
			segmentHrefs: {},
		}));

	describe("LOCATION_CHANGED", () => {
		it("saves pages navigated to", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "/test/old": {} },
				moduleTabs: {},
			});
			const action = {
				type: LOCATION_CHANGED,
				payload: {
					pathname: "/test/new",
					route: "/test/:page",
					result: {
						title: "Test page",
						parent: {
							module: "thing",
							route: "/test",
						},
					},
				},
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to have value at",
				["tabIndex", "/test/new"],
				Immutable.fromJS({
					href: "/test/new",
					label: "Test page",
				}),
			);
		});

		it("saves params for pages with message descriptor titles", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "/test/old": {} },
				moduleTabs: {},
			});
			const action = {
				type: LOCATION_CHANGED,
				payload: {
					route: "/test/:page",
					params: { page: "new" },
					pathname: "/test/new",
					result: {
						title: {
							id: "test.navigation.testpage",
							defaultMessage: "Test {page}",
						},
						parent: { module: "thing" },
					},
				},
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to have value at",
				["tabIndex", "/test/new"],
				Immutable.fromJS({
					href: "/test/new",
					label: {
						id: "test.navigation.testpage",
						defaultMessage: "Test {page}",
						values: { page: "new" },
					},
				}),
			);
		});

		it("creates a list of open tabs per module", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "/test/old": {} },
				moduleTabs: {},
			});
			const action = {
				type: LOCATION_CHANGED,
				payload: {
					pathname: "/test/new",
					result: {
						title: "Test page",
						parent: { module: "thing" },
					},
				},
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to have value at",
				["moduleTabs", "thing"],
				Immutable.fromJS(["/test/new"]),
			);
		});

		it("adds to the list of open tabs per module", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "/test/old": {} },
				moduleTabs: { thing: ["/test/other"] },
			});
			const action = {
				type: LOCATION_CHANGED,
				payload: {
					pathname: "/test/new",
					result: {
						title: "Test page",
						parent: { module: "thing" },
					},
				},
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to have value at",
				["moduleTabs", "thing"],
				Immutable.fromJS(["/test/other", "/test/new"]),
			);
		});

		it("does not add duplicate tabs to module list", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "/test/old": {}, "/test/new": {} },
				moduleTabs: { thing: ["/test/new"] },
			});
			const action = {
				type: LOCATION_CHANGED,
				payload: {
					pathname: "/test/new",
					result: {
						title: "Test page",
						parent: { module: "thing" },
					},
				},
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"value at",
				["moduleTabs", "thing"],
				"to equal",
				Immutable.fromJS(["/test/new"]),
			);
		});

		it("does not add a tab if there is no title", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "/test/old": {} },
				moduleTabs: { thing: ["/test/new"] },
			});
			const action = {
				type: LOCATION_CHANGED,
				payload: {
					pathname: "/test/new",
					result: {
						parent: { module: "thing" },
					},
				},
			};
			const newState = reducer(oldState, action);
			return expect(newState, "to be", oldState);
		});

		it("updates segment href map if navigating to a segment page", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "/test/old": {} },
				moduleTabs: { thing: ["/test/new"] },
				segmentHrefs: {},
			});
			const action = {
				type: LOCATION_CHANGED,
				payload: {
					pathname: "/test/new",
					result: {
						label: "Test page",
						parent: { module: "thing", segments: true },
					},
				},
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to satisfy",
				Immutable.fromJS({
					tabIndex: { "/test/old": {} },
					moduleTabs: { thing: ["/test/new"] },
					segmentHrefs: { "/test": "/test/new" },
				}),
			);
		});
	});

	describe("REMOVE_TAB", () => {
		it("can remove open tabs", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "/test/old": {}, "/test/new": {} },
				moduleTabs: { thing: ["/test/new", "/test/old"] },
			});
			const action = removeTab("thing", "/test/new");
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					tabIndex: { "/test/old": {} },
					moduleTabs: { thing: ["/test/old"] },
				}),
			);
		});

		it("handles missing module names gracefully", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "/test/old": {}, "/test/new": {} },
				moduleTabs: {},
			});
			const action = removeTab("thing", "/test/new");
			return expect(() => reducer(oldState, action), "not to error")
				.and("when called")
				.then(newState =>
					expect(newState, "not to be", oldState).and(
						"to equal",
						Immutable.fromJS({
							tabIndex: { "/test/old": {} },
							moduleTabs: {},
						}),
					),
				);
		});
	});
});
