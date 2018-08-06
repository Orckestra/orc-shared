import Immutable from "immutable";
import {
	currentLocale,
	defaultLocale,
	cultures,
	cultureList,
	defaultCulture,
	orderedCultureList,
} from "./locale";

describe("default locale selector", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				locale: "fr",
				supportedLocales: ["en", "fr"],
			},
		});
	});

	it("gets the first supported locale", () =>
		expect(defaultLocale, "when called with", [state], "to equal", "en"));

	it("returns 'en' if no supported locales", () => {
		state = state.deleteIn(["locale", "supportedLocales"]);
		return expect(defaultLocale, "when called with", [state], "to equal", "en");
	});
});

describe("locale selector", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				locale: "fr",
				supportedLocales: ["en", "fr"],
			},
		});
	});

	it("gets the currently selected locale", () =>
		expect(currentLocale, "when called with", [state], "to equal", "fr"));

	it("gets first supported locale if none set", () => {
		state = state.deleteIn(["locale", "locale"]);
		return expect(currentLocale, "when called with", [state], "to equal", "en");
	});
});

describe("culture index selector", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
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
			},
		});
	});

	it("gets an index of all supported cultures", () =>
		expect(
			cultures,
			"called with",
			[state],
			"to equal",
			Immutable.fromJS({
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
			}),
		));
});

describe("supported cultures list selector", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
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
					"fr-CA": {
						cultureIso: "fr-CA",
						cultureName: "French - Canada",
						sortOrder: 0,
						isDefault: false,
					},
				},
			},
		});
	});

	it("gets a Seq of supported culture IETF tags", () =>
		expect(
			cultureList,
			"called with",
			[state],
			"to equal",
			Immutable.Seq(["en-US", "fr-FR", "fr-CA"]),
		));
});

describe("default culture selector", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				defaultCulture: "fr-FR",
			},
		});
	});

	it("gets the default culture", () =>
		expect(defaultCulture, "called with", [state], "to equal", "fr-FR"));
});

describe("orderedCultureList", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				cultures: {
					"en-US": {
						cultureIso: "en-US",
						cultureName: "English - United States",
						sortOrder: 0,
						isDefault: false,
					},
					"en-CA": {
						cultureIso: "en-CA",
						cultureName: "English - Canada",
						sortOrder: 0,
						isDefault: false,
					},
					"fr-FR": {
						cultureIso: "fr-FR",
						cultureName: "French - France",
						sortOrder: 0,
						isDefault: true,
					},
					"fr-CA": {
						cultureIso: "fr-CA",
						cultureName: "French - Canada",
						sortOrder: 0,
						isDefault: false,
					},
				},
				defaultCulture: "fr-FR",
			},
		});
	});

	it("returns a culture Seq with the default culture first", () =>
		expect(
			orderedCultureList,
			"called with",
			[state],
			"to equal",
			Immutable.Seq(["fr-FR", "en-US", "en-CA", "fr-CA"]),
		));
});
