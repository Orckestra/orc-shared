import Immutable from "immutable";
import {
	selectTabGetter,
	selectCurrentModuleName,
	selectMappedCurrentModuleList,
	selectSegmentHrefMapper,
	selectRouteParams,
	getCurrentScope,
	resetLastScope,
	selectRouteHref,
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
				expect(
					getter,
					"called with",
					["/path/to/tab1"],
					"to equal",
					Immutable.fromJS({ tab: 1 }),
				),
				expect(
					getter,
					"called with",
					["/path/to/tab2"],
					"to equal",
					Immutable.fromJS({ tab: 2 }),
				),
				expect(getter, "called with", ["/path/to/tab3"], "to equal", undefined),
			]),
		));
});

describe("selectCurrentModuleName", () => {
	it("finds the module name in the routing result", () =>
		expect(
			selectCurrentModuleName,
			"called with",
			[
				Immutable.fromJS({
					navigation: { route: { match: { path: "/:scope/thing" } } },
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
					navigation: { route: { match: { path: "/dev/foo" } } },
				}),
			],
			"to be",
			"",
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
		state = state.setIn(
			["navigation", "route", "match", "path"],
			"/:scope/other",
		);
		return expect(
			selectMappedCurrentModuleList,
			"called with",
			[state],
			"to equal",
			Immutable.fromJS([]),
		);
	});
});

describe("selectSegmentHrefMapper", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				route: { match: { path: "/:scope/thing" } },
				tabIndex: {
					"/path/to/tab1": { tab: 1 },
					"/path/to/tab2": { tab: 2 },
				},
				moduleTabs: { thing: ["/path/to/tab1"] },
				mappedHrefs: {
					"/path/to/tab1": "/path/to/tab1/subpage",
				},
			},
		});
	});

	it("returns a function", () =>
		expect(
			selectSegmentHrefMapper,
			"when called with",
			[state],
			"to be a function",
		));

	describe("returned function", () => {
		let mapper;
		beforeEach(() => {
			mapper = selectSegmentHrefMapper(state);
		});

		it("maps segment hrefs", () =>
			expect(
				mapper,
				"when called with",
				["/path/to/tab1"],
				"to equal",
				"/path/to/tab1/subpage",
			));

		it("passes unmapped hrefs", () =>
			expect(
				mapper,
				"when called with",
				["/path/to/tab2"],
				"to equal",
				"/path/to/tab2",
			));
	});
});

describe("selectRouteParams", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				route: { location: {}, match: { params: { foo: "true", bar: 12 } } },
			},
		});
	});

	it("selects the currently matched route's parameters.", () =>
		expect(
			selectRouteParams,
			"when called with",
			[state],
			"to equal",
			Immutable.fromJS({ foo: "true", bar: 12 }),
		));
});

describe("getCurrentScope", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				route: { location: {}, match: { params: { scope: "thing" } } },
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
		return expect(
			getCurrentScope,
			"when called with",
			[state],
			"to be",
			"thing",
		);
	});

	it("gets the default scope, if no scope set and no previous known", () => {
		state = state.deleteIn(["navigation", "route", "match", "params", "scope"]);
		return expect(
			getCurrentScope,
			"when called with",
			[state],
			"to be",
			"Global",
		);
	});
});

describe("selectRouteHref", () => {
	expect(
		selectRouteHref,
		"when called with",
		[
			Immutable.fromJS({
				navigation: {
					route: { match: { url: "/TestScope/thing/further/pages" } },
				},
			}),
		],
		"to equal",
		"/TestScope/thing/further/pages",
	);
});
