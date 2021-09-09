import Immutable from "immutable";
import {
	currentLocaleOrDefault,
	defaultLocale,
	cultures,
	cultureList,
	defaultCulture,
	orderedCultureList,
	cultureOptionList,
	currentLocale,
	cultureNameByIsoCode,
} from "./locale";

describe("default locale selector", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				supportedLocales: [
					{ language: "English", cultureIso: "en" },
					{ language: "Français", cultureIso: "fr" },
				],
			},
		});
	});

	it("gets the first supported locale", () => expect(defaultLocale, "when called with", [state], "to equal", "en"));

	it("returns 'en' if no supported locales", () => {
		state = state.deleteIn(["locale", "supportedLocales"]);
		return expect(defaultLocale, "when called with", [state], "to equal", "en-US");
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

	it("gets the currently selected locale", () => expect(currentLocale, "when called with", [state], "to equal", "fr"));

	it("gets null locale if none set", () => {
		state = state.setIn(["locale", "locale"], null);
		return expect(currentLocale, "when called with", [state], "to equal", null);
	});
});

describe("locale or default selector", () => {
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
		expect(currentLocaleOrDefault, "when called with", [state], "to equal", "fr"));

	it("gets first supported locale if none set", () => {
		state = state.deleteIn(["locale", "locale"]);
		return expect(currentLocaleOrDefault, "when called with", [state], "to equal", "en-US");
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
		expect(cultureList, "called with", [state], "to equal", Immutable.Seq(["en-US", "fr-FR", "fr-CA"])));
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

	it("gets the default culture", () => expect(defaultCulture, "called with", [state], "to equal", "fr-FR"));
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

	it("returns a list of culture ISO names with the default culture first", () =>
		expect(
			orderedCultureList,
			"called with",
			[state],
			"to equal",
			Immutable.Seq(["fr-FR", "en-US", "en-CA", "fr-CA"]),
		));
});

describe("cultureOptionList", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				supportedLocales: [
					{ language: "English", cultureIso: "en" },
					{ language: "Français", cultureIso: "fr" },
				],
			},
		});
	});

	it("returns a list of label/value pairs with the default culture first", () =>
		expect(
			cultureOptionList,
			"called with",
			[state],
			"to satisfy",
			Immutable.List([
				{ value: "en", label: "English" },
				{ value: "fr", label: "Français" },
			]),
		));

	it("returns empty list if there is no locales supported", () => {
		state = state.deleteIn(["locale", "supportedLocales"]);
		expect(cultureOptionList, "called with", [state], "to satisfy", Immutable.List([]));
	});
});

describe("cultureNameByIsoCode", () => {
	let state;

	const culturesList = [
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
	];
	beforeEach(() => {
		const cultures = Immutable.Map()
			.set(culturesList[0].cultureIso, culturesList[0])
			.set(culturesList[1].cultureIso, culturesList[1]);

		state = Immutable.fromJS({
			locale: {
				cultures: cultures,
			},
		});
	});

	it("return culture name by culture iso code", () =>
		expect(
			cultureNameByIsoCode,
			"when called with",
			["en-US"],
			"called with",
			[state],
			"to equal",
			"English - United States",
		));

	it("return culture iso code if it is not found", () =>
		expect(cultureNameByIsoCode, "when called with", ["it-IT"], "called with", [state], "to equal", "[it-IT]"));

	it("return null if iso code is undefined", () =>
		expect(cultureNameByIsoCode, "when called with", [undefined], "called with", [state], "to equal", null));

	it("return null if iso code is null", () =>
		expect(cultureNameByIsoCode, "when called with", [null], "called with", [state], "to equal", null));
});
