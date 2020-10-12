import Immutable from "immutable";
import { resetLastScope } from "./navigation";
import {
	currentScopeSelector,
	scopeGetter,
	localizedScopeSelector,
	selectLocalizedScopes
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
						fr: "Euro"
					}
				}
			},
			FirstChild: {
				name: { en: "First child", fr: "Premier fils" },
				id: "FirstChild",
				children: ["FirstGrandchild", "SecondGrandchild"],
				parentScopeId: "Global",
				currency: {
					displayName: {
						en: "US Dollar",
						fr: "US Dollar"
					}
				}
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
			}),
		));

	it("gets global scope when there is no current scope, not a default scope", () => {
		state = state
			.deleteIn(["navigation", "route", "match", "params", "scope"])
			.deleteIn(["settings", "defaultScope"]);
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
					displayName: 'Euro'
				}
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
				currency: { displayName: 'US Dollar' }
			}),
		);
	});

	it("gets null if scope not found", () => {
		state = state.setIn(
			["navigation", "route", "match", "params", "scope"],
			"WrongScope",
		);
		return expect(
			currentScopeSelector,
			"called with",
			[state],
			"to equal",
			Immutable.Map(),
		);
	});
});

describe("scopeGetter", () => {
	it("returns a getter function for scopes from the full scope index", () =>
		expect(
			scopeGetter,
			"called with",
			[state],
			"called with",
			["FifthGrandchild"],
			"to equal",
			{
				name: "Cinquième petit-fils",
				id: "FifthGrandchild",
				parentScopeId: "SecondChild",
			},
		));

	it("returns a getter function for scopes from a filtered scope index", () => {
		state = state.setIn(["view", "scopeSelector", "filter"], "deux");
		return expect(scopeGetter, "called with", [state]).then(getter => {
			expect(getter, "called with", ["FifthGrandchild"], "to equal", null);
			expect(getter, "called with", ["Global"], "to equal", {
				name: "Global",
				id: "Global",
				children: ["FirstChild", "SecondChild"],
				currency: {
					displayName: 'Euro'
				}
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
		return expect(
			scopeGetter,
			"called with",
			[state],
			"called with",
			["Global"],
			"to equal",
			{
				name: "Global",
				id: "Global",
				children: ["FirstChild", "SecondChild"],
				currency: {
					displayName: 'Euro'
				}
			},
		);
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
		expect(
			localizedScopeSelector,
			"when called with",
			[wrongScopeId],
			"called with",
			[state],
			"to equal",
			null,
		);
	});
});

describe("selectLocalizedScopes", () => {
	it("Retrieves localized scopes", () => {
		const scopes = ["Global", "FirstChild"];
		const expectedGlobal = state.toJS().scopes.Global;
		expectedGlobal.displayName = "Global";
		expectedGlobal.displayCurrency = "Euro";

		const expectedFirstChild = state.toJS().scopes.FirstChild;
		expectedFirstChild.displayName = "Premier fils";
		expectedFirstChild.displayCurrency = "US Dollar";

		expect(
			selectLocalizedScopes,
			"when called with",
			[scopes],
			"called with",
			[state],
			"to equal",
			[expectedGlobal, expectedFirstChild]
		);
	});

	it("Not adds scope in result array if it does not exist", () => {
		const scopes = ["Global", "WrongScopeId"];
		const expectedGlobal = state.toJS().scopes.Global;
		expectedGlobal.displayName = "Global";
		expectedGlobal.displayCurrency = "Euro";

		expect(
			selectLocalizedScopes,
			"when called with",
			[scopes],
			"called with",
			[state],
			"to equal",
			[expectedGlobal]
		);
	});
});