import Immutable from "immutable";
import {
	selectTabGetter,
	selectCurrentModuleName,
	selectCurrentSectionName,
	selectMappedCurrentModuleList,
	selectSegmentHrefMapper,
	selectRouteParams,
	getCurrentScope,
	getCurrentScopeFromRoute,
	resetLastScope,
	selectRouteHref,
	selectRoutePath,
	selectPrependPathConfig,
} from "./navigation";

describe("selectTabGetter", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				tabIndex: { "/path/to/tab1": { tab: 1 }, "/path/to/tab2": { tab: 2 } },
			},
		});
	});

	it("provides a function that returns a named tab", () =>
		expect(selectTabGetter, "called with", [state]).then(getter =>
			Promise.all([
				expect(getter, "called with", ["/path/to/tab1"], "to equal", Immutable.fromJS({ tab: 1 })),
				expect(getter, "called with", ["/path/to/tab2"], "to equal", Immutable.fromJS({ tab: 2 })),
				expect(getter, "called with", ["/path/to/tab3"], "to equal", undefined),
			]),
		));
});

describe("selectPrependPathConfig", () => {
	it("finds the prepend path in config", () =>
		expect(
			selectPrependPathConfig,
			"called with",
			[
				Immutable.fromJS({
					navigation: {
						config: { prependPath: "/:scope/", prependHref: "/scope/" },
					},
				}),
			],
			"to be",
			"/:scope/",
		));
});

describe("selectCurrentModuleName", () => {
	it("finds the module name in the routing result", () =>
		expect(
			selectCurrentModuleName,
			"called with",
			[
				Immutable.fromJS({
					navigation: {
						route: { match: { path: "/:scope/thing" } },
						config: { prependPath: "/:scope/", prependHref: "/scope/" },
					},
				}),
			],
			"to be",
			"thing",
		));

	it("finds the module name when nested", () =>
		expect(
			selectCurrentModuleName,
			"called with",
			[
				Immutable.fromJS({
					navigation: {
						route: { match: { path: "/:scope/thing/further/pages" } },
						config: { prependPath: "/:scope/", prependHref: "/scope/" },
					},
				}),
			],
			"to be",
			"thing",
		));

	it("returns empty string if no module", () =>
		expect(
			selectCurrentModuleName,
			"called with",
			[
				Immutable.fromJS({
					navigation: {
						route: { match: { path: "/dev/foo" } },
						config: { prependPath: "/:scope/", prependHref: "/scope/" },
					},
				}),
			],
			"to be",
			"",
		));
});

describe("selectCurrentSectionName", () => {
	it("finds the section name in the routing result", () =>
		expect(
			selectCurrentSectionName,
			"called with",
			[
				Immutable.fromJS({
					navigation: {
						route: { match: { path: "/:scope/thing/id/mySection" } },
						config: { prependPath: "/:scope/", prependHref: "/scope/" },
					},
				}),
			],
			"to be",
			"mySection",
		));

	it("finds the section name in the routing result when route is deeper than just section", () =>
		expect(
			selectCurrentSectionName,
			"called with",
			[
				Immutable.fromJS({
					navigation: {
						route: { match: { path: "/:scope/thing/id/mySection/foo/boo" } },
						config: { prependPath: "/:scope/", prependHref: "/scope/" },
					},
				}),
			],
			"to be",
			"mySection",
		));
});

describe("selectMappedCurrentModuleList", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				route: { match: { path: "/:scope/thing" } },
				tabIndex: {
					"/path/to/tab1": { tab: 1 },
					"/path/to/tab2": { tab: 2 },
					"/path/to/tab3": { tab: 3 },
					"/path/to/tab4": { tab: 4 },
				},
				moduleTabs: { thing: ["/path/to/tab1", "/path/to/tab3"] },
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
		});
	});

	it("returns a list of tabs open within the current module", () =>
		expect(
			selectMappedCurrentModuleList,
			"called with",
			[state],
			"to equal",
			Immutable.fromJS([{ tab: 1 }, { tab: 3 }]),
		));

	it("returns an empty list if there is no list in state", () => {
		state = state.setIn(["navigation", "route", "match", "path"], "/:scope/other");
		return expect(selectMappedCurrentModuleList, "called with", [state], "to equal", Immutable.fromJS([]));
	});
});

describe("selectSegmentHrefMapper", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				route: { match: { path: "/:scope/thing" } },
				tabIndex: {
					"to/tab1": { tab: 1 },
					"to/tab2": { tab: 2 },
				},
				moduleTabs: { thing: ["to/tab1"] },
				mappedHrefs: {
					"to/tab1": "to/tab1/subpage",
				},
				config: { prependPath: "/:scope/", prependHref: "/scope/" },
			},
		});
	});

	it("returns a function", () => expect(selectSegmentHrefMapper, "when called with", [state], "to be a function"));

	describe("returned function", () => {
		let mapper;
		beforeEach(() => {
			mapper = selectSegmentHrefMapper(state);
		});

		it("maps segment hrefs", () =>
			expect(mapper, "when called with", ["/path/to/tab1"], "to equal", "/path/to/tab1/subpage"));

		it("passes unmapped hrefs", () =>
			expect(mapper, "when called with", ["/path/to/tab2"], "to equal", "/path/to/tab2"));
	});
});

describe("getCurrentScope", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				route: { location: {}, match: { params: { scope: "thing" } } },
			},
			settings: {
				defaultScope: "myScope",
			},
		});
	});
	afterEach(() => {
		resetLastScope();
	});

	it("gets the current scope, if one is set", () =>
		expect(getCurrentScope, "when called with", [state], "to be", "thing"));

	it("gets the last scope, if no scope set and previous scope is known", () => {
		getCurrentScope(state);
		state = state.deleteIn(["navigation", "route", "match", "params", "scope"]);
		return expect(getCurrentScope, "when called with", [state], "to be", "thing");
	});

	it("gets the default scope, if no scope set and no previous known", () => {
		state = state.deleteIn(["navigation", "route", "match", "params", "scope"]);
		return expect(getCurrentScope, "when called with", [state], "to be", "myScope");
	});

	it("gets the Global scope, if no scope set, if no default scope and no previous known", () => {
		state = state
			.deleteIn(["navigation", "route", "match", "params", "scope"])
			.setIn(["settings", "defaultScope"], null);
		return expect(getCurrentScope, "when called with", [state], "to be", "Global");
	});
});

describe("getCurrentScopeFromRoute", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				route: { location: {}, match: { params: { scope: "thing" } } },
			},
			settings: {
				defaultScope: "myScope",
			},
		});
	});
	afterEach(() => {
		resetLastScope();
	});

	it("gets the current scope, if one is set", () =>
		expect(getCurrentScopeFromRoute, "when called with", [state], "to be", "thing"));

	it("gets the last scope, if no scope set and previous scope is known", () => {
		getCurrentScope(state);
		state = state.deleteIn(["navigation", "route", "match", "params", "scope"]);
		return expect(getCurrentScopeFromRoute, "when called with", [state], "to be", "thing");
	});

	it("gets null if no scope set and no previous known", () => {
		state = state.deleteIn(["navigation", "route", "match", "params", "scope"]);
		return expect(getCurrentScopeFromRoute, "when called with", [state], "to be", null);
	});
});

describe("route selectors", () => {
	let state, noMatchState, noParamState, noHrefState, noPathState;
	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				route: {
					location: {},
					match: {
						params: { foo: "true", bar: 12 },
						path: "/:scope/thing/further/pages",
						url: "/TestScope/thing/further/pages",
					},
				},
			},
		});
		noMatchState = state.deleteIn(["navigation", "route", "match"]);
		noParamState = state.deleteIn(["navigation", "route", "match", "params"]);
		noHrefState = state.deleteIn(["navigation", "route", "match", "url"]);
		noPathState = state.deleteIn(["navigation", "route", "match", "path"]);
	});

	describe("selectRouteParams", () => {
		it("selects the currently matched route's parameters.", () =>
			expect(selectRouteParams, "when called with", [state], "to equal", Immutable.fromJS({ foo: "true", bar: 12 })));

		it("handles missing data", () =>
			expect(selectRouteParams, "when called with", [noMatchState], "to equal", Immutable.Map()).and(
				"when called with",
				[noParamState],
				"to equal",
				Immutable.Map(),
			));
	});

	describe("selectRouteHref", () => {
		it("selects the currently matched route's href.", () =>
			expect(selectRouteHref, "when called with", [state], "to equal", "/TestScope/thing/further/pages"));

		it("handles missing data", () =>
			expect(selectRouteHref, "when called with", [noMatchState], "to equal", "").and(
				"when called with",
				[noHrefState],
				"to equal",
				"",
			));
	});

	describe("selectRoutePath", () => {
		it("selects the currently matched route's path.", () =>
			expect(selectRoutePath, "when called with", [state], "to equal", "/:scope/thing/further/pages"));

		it("handles missing data", () =>
			expect(selectRoutePath, "when called with", [noMatchState], "to equal", "").and(
				"when called with",
				[noPathState],
				"to equal",
				"",
			));
	});
});
