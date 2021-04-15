import Immutable from "immutable";
import { resetLastScope } from "./navigation";
import {
	currentScopeSelector,
	scopeGetter,
	localizedScopeSelector,
	localizedScopesSelectorByIds,
	isCurrentScopeAuthorizedSelector,
} from "./scope";

let state;
beforeEach(() => {
	state = Immutable.fromJS({
		navigation: {
			route: { location: {}, match: { params: { scope: "SecondChild" } } },
		},
		locale: {
			locale: "fr",
			supportedLocales: ["en", "fr"],
		},
		scopes: {
			Global: {
				name: { en: "Global", fr: "Global" },
				id: "Global",
				children: ["FirstChild", "SecondChild"],
				currency: {
					displayName: {
						en: "Euro",
						fr: "Euro",
					},
				},
			},
			FirstChild: {
				name: { en: "First child", fr: "Premier fils" },
				id: "FirstChild",
				children: ["FirstGrandchild", "SecondGrandchild"],
				parentScopeId: "Global",
				currency: {
					displayName: {
						en: "US Dollar",
						fr: "US Dollar",
					},
				},
			},
			FirstGrandchild: {
				name: { en: "First grandchild", fr: "Premier petit-fils" },
				id: "FirstGrandchild",
				parentScopeId: "FirstChild",
			},
			SecondGrandchild: {
				name: { en: "Second grandchild", fr: "Deuxième petit-fils" },
				id: "SecondGrandchild",
				parentScopeId: "FirstChild",
			},
			SecondChild: {
				name: { en: "Second child", fr: "Deuxième fils" },
				id: "SecondChild",
				children: ["ThirdGrandchild", "FourthGrandchild", "FifthGrandchild"],
				parentScopeId: "Global",
				isAuthorizedScope: true,
				currency: {
					isoCode: "USD",
					displayName: {
						en: "US Dollar",
					},
				},
			},
			ThirdGrandchild: {
				name: { en: "Third grandchild", fr: "Troisième petit-fils" },
				id: "ThirdGrandchild",
				parentScopeId: "SecondChild",
			},
			FourthGrandchild: {
				name: { en: "Fourth grandchild", fr: "Quatrième petit-fils" },
				id: "FourthGrandchild",
				parentScopeId: "SecondChild",
			},
			FifthGrandchild: {
				name: { en: "Fifth grandchild", fr: "Cinquième petit-fils" },
				id: "FifthGrandchild",
				parentScopeId: "SecondChild",
			},
			SixthGrandchild: {
				name: { en: "Sixth grandchild" },
				id: "SixthGrandchild",
				parentScopeId: "SecondChild",
			},
		},
		settings: {
			defaultScope: "FirstChild",
		},
	});
});

describe("currentScopeSelector", () => {
	afterEach(() => {
		resetLastScope();
	});

	it("gets the current scope in the selected language", () =>
		expect(
			currentScopeSelector,
			"called with",
			[state],
			"to equal",
			Immutable.fromJS({
				name: "Deuxième fils",
				id: "SecondChild",
				children: ["ThirdGrandchild", "FourthGrandchild", "FifthGrandchild"],
				parentScopeId: "Global",
				isAuthorizedScope: true,
				currency: { isoCode: "USD", displayName: "US Dollar" },
			}),
		));

	it("gets global scope when there is no current scope, not a default scope", () => {
		state = state.deleteIn(["navigation", "route", "match", "params", "scope"]).deleteIn(["settings", "defaultScope"]);
		return expect(
			currentScopeSelector,
			"called with",
			[state],
			"to equal",
			Immutable.fromJS({
				name: "Global",
				id: "Global",
				children: ["FirstChild", "SecondChild"],
				currency: {
					displayName: "Euro",
				},
			}),
		);
	});

	it("gets default scope from settings if no scope selected", () => {
		state = state.deleteIn(["navigation", "route", "match", "params", "scope"]);
		return expect(
			currentScopeSelector,
			"called with",
			[state],
			"to equal",
			Immutable.fromJS({
				name: "Premier fils",
				id: "FirstChild",
				children: ["FirstGrandchild", "SecondGrandchild"],
				parentScopeId: "Global",
				currency: { displayName: "US Dollar" },
			}),
		);
	});

	it("gets null if scope not found", () => {
		state = state.setIn(["navigation", "route", "match", "params", "scope"], "WrongScope");
		return expect(currentScopeSelector, "called with", [state], "to equal", Immutable.Map());
	});
});

describe("isCurrentScopeAuthorizedSelector", () => {
	afterEach(() => {
		resetLastScope();
	});

	it("get current scope is Authorized", () =>
		expect(isCurrentScopeAuthorizedSelector, "called with", [state], "to equal", true));

	it("get true because scopes list is empty", () => {
		state = state.set("scopes", Immutable.List());
		return expect(isCurrentScopeAuthorizedSelector, "called with", [state], "to equal", true);
	});

	it("get false if scope not found", () => {
		state = state.setIn(["navigation", "route", "match", "params", "scope"], "WrongScope");
		return expect(isCurrentScopeAuthorizedSelector, "called with", [state], "to equal", false);
	});
});

describe("scopeGetter", () => {
	it("returns a getter function for scopes from the full scope index", () =>
		expect(scopeGetter, "called with", [state], "called with", ["FifthGrandchild"], "to equal", {
			name: "Cinquième petit-fils",
			id: "FifthGrandchild",
			parentScopeId: "SecondChild",
		}));

	it("returns a getter function for scopes from a filtered scope index", () => {
		state = state.setIn(["view", "scopeSelector", "filter"], "deux");
		return expect(scopeGetter, "called with", [state]).then(getter => {
			expect(getter, "called with", ["FifthGrandchild"], "to equal", null);
			expect(getter, "called with", ["Global"], "to equal", {
				name: "Global",
				id: "Global",
				children: ["FirstChild", "SecondChild"],
				currency: {
					displayName: "Euro",
				},
			});
			expect(getter, "called with", ["SecondGrandchild"], "to equal", {
				name: "Deuxième petit-fils",
				id: "SecondGrandchild",
				parentScopeId: "FirstChild",
			});
		});
	});

	it("will reach Global scope even if no scopes match search", () => {
		state = state.setIn(["view", "scopeSelector", "filter"], "scaramouche");
		return expect(scopeGetter, "called with", [state], "called with", ["Global"], "to equal", {
			name: "Global",
			id: "Global",
			children: ["FirstChild", "SecondChild"],
			currency: {
				displayName: "Euro",
			},
		});
	});
});

describe("localizedScopeSelector", () => {
	it("returns localized scope name by id", () => {
		const scopeId = "FirstGrandchild";
		expect(
			localizedScopeSelector,
			"when called with",
			[scopeId],
			"called with",
			[state],
			"to equal",
			"Premier petit-fils",
		);
	});

	it("returns default value if scope name doesn't contain value for current locale", () => {
		const scopeId = "SixthGrandchild";
		expect(
			localizedScopeSelector,
			"when called with",
			[scopeId],
			"called with",
			[state],
			"to equal",
			"[SixthGrandchild]",
		);
	});

	it("returns null when scope id is not found", () => {
		const wrongScopeId = "TestWrongScope";
		expect(localizedScopeSelector, "when called with", [wrongScopeId], "called with", [state], "to equal", null);
	});
});

describe("localizedScopesSelectorByIds", () => {
	it("Retrieves localized scopes", () => {
		const scopes = ["Global", "FirstChild"];

		const stateAsJS = state.toJS();

		const expectedGlobal = stateAsJS.scopes.Global;
		expectedGlobal.name = "Global";
		expectedGlobal.currency.displayName = "Euro";

		const expectedFirstChild = stateAsJS.scopes.FirstChild;
		expectedFirstChild.name = "Premier fils";
		expectedFirstChild.currency.displayName = "US Dollar";

		const expected = Immutable.fromJS({
			Global: expectedGlobal,
			FirstChild: expectedFirstChild,
		});

		expect(localizedScopesSelectorByIds, "when called with", [scopes], "called with", [state], "to equal", expected);
	});

	it("Retrieves localized scopes with fallback currency", () => {
		const scopes = ["SecondChild"];

		const stateAsJS = state.toJS();

		const expectedSecondChild = stateAsJS.scopes.SecondChild;
		expectedSecondChild.name = "Deuxième fils";
		expectedSecondChild.currency.displayName = "USD";

		const expected = Immutable.fromJS({
			SecondChild: expectedSecondChild,
		});

		expect(localizedScopesSelectorByIds, "when called with", [scopes], "called with", [state], "to equal", expected);
	});

	it("Not adds scope in result array if it does not exist", () => {
		const scopes = ["Global", "WrongScopeId"];

		const stateAsJS = state.toJS();

		const expectedGlobal = stateAsJS.scopes.Global;
		expectedGlobal.name = "Global";
		expectedGlobal.currency.displayName = "Euro";

		const expected = Immutable.fromJS({
			Global: expectedGlobal,
		});

		expect(localizedScopesSelectorByIds, "when called with", [scopes], "called with", [state], "to equal", expected);
	});
});
