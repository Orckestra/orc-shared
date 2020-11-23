import Immutable from "immutable";
import { setRoute, removeTab, mapHref, setHrefConfig } from "../actions/navigation";
import reducer from "./navigation";

describe("Navigation reducer", () => {
	it("behaves as a reducer should", () =>
		expect(reducer, "to be a reducer with initial state", {
			route: {},
			tabIndex: {},
			moduleTabs: {},
			mappedHrefs: {},
			config: {},
			currentPrependPath: null,
		}));

	describe("SET_ROUTE", () => {
		it("saves the current matched route", () => {
			const oldState = Immutable.fromJS({
				route: {
					location: {},
					match: {},
				},
				config: { prependPath: "/:scope/" },
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
				config: { prependPath: "/:scope/" },
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
				["tabIndex", "test"],
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
				config: { prependPath: "/:scope/" },
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
					url: "/test",
				},
			);
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to have value at",
				["moduleTabs", "test"],
				Immutable.fromJS(["test"]),
			);
		});

		it("adds to the list of open tabs per module", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "test/old": {} },
				moduleTabs: { test: ["test/other"] },
				config: { prependPath: "/:scope/" },
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
				Immutable.fromJS(["test/other", "test/page"]),
			);
		});

		it("does not add duplicate tabs to module list", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "test/old": {}, "test/new": {} },
				moduleTabs: { test: ["test/new"] },
				config: { prependPath: "/:scope/" },
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
				Immutable.fromJS(["test/new"]),
			);
		});

		it("does nothing if path is invalid", () => {
			const oldState = Immutable.fromJS({
				route: {
					location: {},
					match: {},
				},
				config: { prependPath: "/:scope/" },
			});
			const action = setRoute(
				{
					hash: "",
					pathname: "te111st",
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
	});

	describe("MAP_HREF", () => {
		it("updates segment href map if navigating to a segment page", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "test/old": {}, "test/new": {} },
				moduleTabs: { test: ["test/new"] },
				mappedHrefs: {},
				config: { prependPath: "/:scope/" },
			});
			const action = mapHref("/Value/test", "/Value/test/new");
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to satisfy",
				Immutable.fromJS({
					tabIndex: { "test/old": {}, "test/new": {} },
					moduleTabs: { test: ["test/new"] },
					mappedHrefs: { test: "test/new" },
				}),
			);
		});

		it("does nothing if from path is invalid", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "test/old": {}, "test/new": {} },
				moduleTabs: { test: ["test/new"] },
				mappedHrefs: {},
				config: { prependPath: "/:scope/" },
			});
			const action = mapHref("te111st", "/Value/test/new");
			const newState = reducer(oldState, action);
			return expect(newState, "to be", oldState);
		});

		it("does nothing if to path is invalid", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "test/old": {}, "test/new": {} },
				moduleTabs: { test: ["test/new"] },
				mappedHrefs: {},
				config: { prependPath: "/:scope/" },
			});
			const action = mapHref("/Value/test", "te111st");
			const newState = reducer(oldState, action);
			return expect(newState, "to be", oldState);
		});
	});

	describe("REMOVE_TAB", () => {
		it("can remove open tabs", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "test/old": {}, "test/new": {} },
				moduleTabs: { thing: ["test/new", "test/old"] },
				config: { prependPath: "/:scope/" },
			});
			const action = removeTab("thing", "/scope/test/new");
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					tabIndex: { "test/old": {} },
					moduleTabs: { thing: ["test/old"] },
					config: { prependPath: "/:scope/" },
				}),
			);
		});

		it("handles missing module names gracefully", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "test/old": {}, "test/new": {} },
				moduleTabs: {},
				config: { prependPath: "/:scope/" },
			});
			const action = removeTab("thing", "/scope/test/new");
			return expect(() => reducer(oldState, action), "not to error")
				.and("when called")
				.then(newState =>
					expect(newState, "not to be", oldState).and(
						"to equal",
						Immutable.fromJS({
							tabIndex: { "test/old": {} },
							moduleTabs: {},
							config: { prependPath: "/:scope/" },
						}),
					),
				);
		});

		it("does nothing if the tab to remove is not found", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "/test/old": {}, "/test/new": {} },
				moduleTabs: { thing: ["/test/new", "/test/old"] },
				config: { prependPath: "/:scope/" },
			});
			const action = removeTab("thing", "/test/fail");
			const newState = reducer(oldState, action);
			return expect(newState, "to be", oldState);
		});

		it("does nothing if path is invalid", () => {
			const oldState = Immutable.fromJS({
				tabIndex: { "/test/old": {}, "/test/new": {} },
				moduleTabs: { thing: ["/test/new", "/test/old"] },
				config: { prependPath: "/:scope/" },
			});
			const action = removeTab("thing", "te111st");
			const newState = reducer(oldState, action);
			return expect(newState, "to be", oldState);
		});
	});

	describe("SET_HREF_CONFIG", () => {
		it("update href config in navigation state", () => {
			const oldState = Immutable.fromJS({
				config: {},
			});
			const action = setHrefConfig("/:scope/", "/scope/");
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to satisfy",
				Immutable.fromJS({
					config: { prependPath: "/:scope/" },
				}),
			);
		});
	});
});
