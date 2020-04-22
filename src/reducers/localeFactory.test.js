import Immutable from "immutable";
import reducerFactory from "./localeFactory";
import { changeLocale, GET_CULTURES_SUCCESS } from "../actions/locale";

describe("locale reducer factory", () => {
	it("creates a well-behaved reducer", () =>
		expect(
			reducerFactory,
			"when called with",
			[
				[
					{ language: "English", cultureIso: "en-US" },
					{ language: "Francais", cultureIso: "fr" },
				],
			],
			"to be a reducer with initial state",
			{
				locale: "en-US",
				supportedLocales: [
					{ language: "English", cultureIso: "en-US" },
					{ language: "Francais", cultureIso: "fr" },
				],
				cultures: {},
				defaultCulture: "en-US",
			},
		));

	it("falls back to default value after when creating the reducer", () =>
		expect(
			reducerFactory,
			"when called with",
			[[]],
			"to be a reducer with initial state",
			{
				locale: "en-US",
				supportedLocales: [],
				cultures: {},
				defaultCulture: "en-US",
			},
		));

	it("falls back to default value after when creating the reducer with undefined cultureIso", () =>
		expect(
			reducerFactory,
			"when called with",
			[[{ language: "English" }]],
			"to be a reducer with initial state",
			{
				locale: "en-US",
				supportedLocales: [{ language: "English" }],
				cultures: {},
				defaultCulture: "en-US",
			},
		));

	describe("created reducer", () => {
		let reducer;
		beforeEach(() => {
			reducer = reducerFactory([
				{ language: "English", cultureIso: "en-US" },
				{ language: "Francais", cultureIso: "fr" },
			]);
		});

		it("reacts to locale change by updating to the requested locale", () => {
			const oldState = Immutable.Map({
				locale: "en-US",
				supportedLocales: [
					{ language: "English", cultureIso: "en-US" },
					{ language: "Francais", cultureIso: "fr" },
				],
				cultures: {},
				defaultCulture: "en-US",
			});
			const action = changeLocale("fr");
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and("to satisfy", {
				locale: "fr",
			});
		});

		it("does not update the locale if the requested language is not supported", () => {
			const oldState = Immutable.Map({
				locale: "en-US",
				supportedLocales: [
					{ language: "English", cultureIso: "en-US" },
					{ language: "Francais", cultureIso: "fr" },
				],
				cultures: {},
				defaultCulture: "en-US",
			});
			const action = changeLocale("da");
			const newState = reducer(oldState, action);
			return expect(newState, "to be", oldState).and("to satisfy", {
				locale: "en-US",
			});
		});

		it("adds cultures fetched from API", () => {
			const oldState = Immutable.Map({
				locale: "en-US",
				supportedLocales: [
					{ language: "English", cultureIso: "en-US" },
					{ language: "Francais", cultureIso: "fr" },
				],
				cultures: {},
				defaultCulture: "en-US",
			});
			const action = {
				type: GET_CULTURES_SUCCESS,
				payload: [
					{
						cultureIso: "en-US",
						cultureName: "English - United States",
						sortOrder: 0,
						isDefault: false,
					},
					{
						cultureIso: "fr-FR",
						cultureName: "French - France",
						sortOrder: 0,
						isDefault: true,
					},
				],
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and("to satisfy", {
				cultures: {
					"en-US": {
						cultureIso: "en-US",
						cultureName: "English - United States",
						sortOrder: 0,
						isDefault: false,
					},
					"fr-FR": {
						cultureIso: "fr-FR",
						cultureName: "French - France",
						sortOrder: 0,
						isDefault: true,
					},
				},
				defaultCulture: "fr-FR",
			});
		});
	});
});
