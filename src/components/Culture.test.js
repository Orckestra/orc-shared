import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { getDefaultLocale } from "react-datepicker";
import Culture from "./Culture";

describe("Culture", () => {
	let state, store, languageGetter;

	beforeEach(() => {
		languageGetter = jest.spyOn(window.navigator, "language", "get");

		state = Immutable.fromJS({
			requests: {},
			settings: {
				defaultScope: "aDefaultScope",
			},
			locale: {
				supportedLocales: [
					{ language: "English", cultureIso: "en" },
					{ language: "Français", cultureIso: "fr" },
				],
			},
		});
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: () => {},
		};
	});

	afterEach(() => {
		languageGetter.mockReset();
		jest.clearAllMocks();
	});

	it("shows the wrapped component if authenticated and default scope is known", () => {
		languageGetter.mockReturnValue(null);

		const component = (
			<Provider store={store}>
				<Culture />
			</Provider>
		);

		expect(component, "when mounted", "to satisfy", null);

		expect(getDefaultLocale(), "to be", undefined); // Default behavior for react-datepicker
	});

	it("shows the wrapped component if authenticated and default scope is known 222", () => {
		state = state.setIn(["locale", "supportedLocales"], [{ language: "English", cultureIso: "en" }]);
		languageGetter.mockReturnValue("en-GB");

		const component = (
			<Provider store={store}>
				<Culture />
			</Provider>
		);

		expect(component, "when mounted", "to satisfy", null);

		expect(getDefaultLocale(), "to equal", "en-GB");
	});

	it("shows the wrapped component if authenticated and default scope is known 333", () => {
		state = state.setIn(
			["locale", "supportedLocales"],
			[
				{ language: "French", cultureIso: "fr" },
				{ language: "EnglishMy", cultureIso: "enMy" },
			],
		);
		languageGetter.mockReturnValue("fr-FR");

		const component = (
			<Provider store={store}>
				<Culture />
			</Provider>
		);

		expect(component, "when mounted", "to satisfy", null);

		expect(getDefaultLocale(), "to equal", "fr-FR");
	});
});
