import Immutable from "immutable";
import {
	selectTabGetter,
	selectCurrentModuleName,
	selectMappedCurrentModuleList,
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
			[Immutable.fromJS({ router: { result: { module: "thing" } } })],
			"to be",
			"thing",
		));

	it("finds the module name when nested", () =>
		expect(
			selectCurrentModuleName,
			"called with",
			[
				Immutable.fromJS({
					router: { result: { parent: { parent: { module: "thing" } } } },
				}),
			],
			"to be",
			"thing",
		));

	it("returns empty string if no module", () =>
		expect(
			selectCurrentModuleName,
			"called with",
			[Immutable.fromJS({ router: { result: {} } })],
			"to be",
			"",
		));
});

describe("selectMappedCurrentModuleList", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			router: { result: { module: "thing" } },
			navigation: {
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
		state = state.setIn(["router", "result", "module"], "other");
		return expect(
			selectMappedCurrentModuleList,
			"called with",
			[state],
			"to equal",
			Immutable.fromJS([]),
		);
	});
});
