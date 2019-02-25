import Immutable from "immutable";
import { setRoute, removeTab, mapHref } from "../actions/navigation";
import reducer from "./navigation";

describe("Navigation reducer", () => {
	it("behaves as a reducer should", () =>
		expect(reducer, "to be a reducer with initial state", {
			route: {},
			tabIndex: {},
			moduleTabs: {},
			mappedHrefs: {},
		}));

	describe("SET_ROUTE", () => {
		it("saves the current matched route", () => {
			const oldState = Immutable.fromJS({
				route: {
					location: {},
					match: {},
				},
			});
			const action = setRoute(
				{
					hash: "",
					pathname: "/Value/test",
					search: "",
				},
				{
					isExact: true,
					params: { scope: "Value" },
					path: "/:scope/test",
					url: "/Value/test",
				},
			);
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState);
		});

		it("saves pages navigated to", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "/test/old": {} },
				moduleTabs: {},
			});
			const action = setRoute(
				{
					hash: "",
					pathname: "/Value/test",
					search: "",
				},
				{
					isExact: true,
					params: { scope: "Value" },
					path: "/:scope/test",
					url: "/Value/test",
				},
			);
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to have value at",
				["tabIndex", "/Value/test"],
				Immutable.fromJS({
					href: "/Value/test",
					path: "/:scope/test",
					params: { scope: "Value" },
				}),
			);
		});

		it("creates a list of open tabs per module", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "/test/old": {} },
				moduleTabs: {},
			});
			const action = setRoute(
				{
					hash: "",
					pathname: "/Value/test/page",
					search: "",
				},
				{
					isExact: true,
					params: { scope: "Value" },
					path: "/:scope/test/page",
					url: "/Value/test/page",
				},
			);
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to have value at",
				["moduleTabs", "test"],
				Immutable.fromJS(["/Value/test/page"]),
			);
		});

		it("adds to the list of open tabs per module", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "/Value/test/old": {} },
				moduleTabs: { test: ["/Value/test/other"] },
			});
			const action = setRoute(
				{
					hash: "",
					pathname: "/Value/test/page",
					search: "",
				},
				{
					isExact: true,
					params: { scope: "Value" },
					path: "/:scope/test/page",
					url: "/Value/test/page",
				},
			);
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to have value at",
				["moduleTabs", "test"],
				Immutable.fromJS(["/Value/test/other", "/Value/test/page"]),
			);
		});

		it("does not add duplicate tabs to module list", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "/Value/test/old": {}, "/Value/test/new": {} },
				moduleTabs: { test: ["/Value/test/new"] },
			});
			const action = setRoute(
				{
					hash: "",
					pathname: "/Value/test/new",
					search: "",
				},
				{
					isExact: true,
					params: { scope: "Value" },
					path: "/:scope/test/new",
					url: "/Value/test/new",
				},
			);
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"value at",
				["moduleTabs", "test"],
				"to equal",
				Immutable.fromJS(["/Value/test/new"]),
			);
		});
	});

	describe("MAP_HREF", () => {
		it("updates segment href map if navigating to a segment page", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "/Value/test/old": {}, "/Value/test/new": {} },
				moduleTabs: { test: ["/Value/test/new"] },
				mappedHrefs: {},
			});
			const action = mapHref("/Value/test", "/Value/test/new");
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to satisfy",
				Immutable.fromJS({
					tabIndex: { "/Value/test/old": {}, "/Value/test/new": {} },
					moduleTabs: { test: ["/Value/test/new"] },
					mappedHrefs: { "/Value/test": "/Value/test/new" },
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

		it("does nothing if the tab to remove is not found", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "/test/old": {}, "/test/new": {} },
				moduleTabs: { thing: ["/test/new", "/test/old"] },
			});
			const action = removeTab("thing", "/test/fail");
			const newState = reducer(oldState, action);
			return expect(newState, "to be", oldState);
		});
	});
});
