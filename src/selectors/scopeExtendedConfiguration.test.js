import Immutable from "immutable";
import { doesScopeHaveGeolocationProviderSelector } from "./scopeExtendedConfiguration";

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
		scopesExtendedConfiguration: {
			theScope: { hasGeolocationProvider: true },
		},
		settings: {
			defaultScope: "FirstChild",
		},
	});
});

describe("doesScopeHaveGeolocationProviderSelector", () => {
	it("gets an unknown scope", () =>
		expect(
			doesScopeHaveGeolocationProviderSelector,
			"when called with",
			["Unknown"],
			"called with",
			[state],
			"to be",
			false,
		));

	it("gets a known scope", () =>
		expect(
			doesScopeHaveGeolocationProviderSelector,
			"when called with",
			["theScope"],
			"called with",
			[state],
			"to be",
			true,
		));
});
