import Immutable from "immutable";
import { setTranslationWithFallbackField, setTranslationWithFallbackValue } from "./setTranslationWithFallback";

describe("setTranslationWithFallbackField", () => {
	it("replaces a i18n message structure with the selected locale's string", () =>
		expect(
			setTranslationWithFallbackField,
			"when called with",
			[
				"fr",
				Immutable.fromJS({
					name: "fallbackName",
					hat: { name: { en: "Straw hat", fr: "Chapeau de paille" } },
				}),
				"name",
				["hat", "name"],
			],
			"to equal",
			Immutable.fromJS({
				name: "fallbackName",
				hat: { name: "Chapeau de paille" },
			}),
		));

	it("returns the fallbackField Value if translation not found", () =>
		expect(
			setTranslationWithFallbackField,
			"when called with",
			[
				"fr",
				Immutable.fromJS({
					name: "fallbackName",
					hat: { name: {} },
				}),
				"name",
				["hat", "name"],
			],
			"to equal",
			Immutable.fromJS({
				name: "fallbackName",
				hat: { name: "fallbackName" },
			}),
		));

	it("returns empty String the fallbackField Value undefined", () =>
		expect(
			setTranslationWithFallbackField,
			"when called with",
			[
				"fr",
				Immutable.fromJS({
					name: "fallbackName",
					hat: { name: {} },
				}),
				"notEsixtentField",
				["hat", "name"],
			],
			"to equal",
			Immutable.fromJS({
				name: "fallbackName",
				hat: { name: "" },
			}),
		));

	it("returns same object if field does not exist", () =>
		expect(
			setTranslationWithFallbackField,
			"when called with",
			[
				"fr",
				Immutable.fromJS({
					name: "fallbackName",
					hat: { name: {} },
				}),
				"name",
				["pets", "name"],
			],
			"to equal",
			Immutable.fromJS({
				name: "fallbackName",
				hat: { name: {} },
				pets: { name: "fallbackName" },
			}),
		));
});

describe("setTranslationWithFallbackValue", () => {
	it("replaces a i18n message structure with the selected locale's string", () =>
		expect(
			setTranslationWithFallbackValue,
			"when called with",
			[
				"fr",
				Immutable.fromJS({
					hat: { name: { en: "Straw hat", fr: "Chapeau de paille" } },
				}),
				"fallbackHatName",
				["hat", "name"],
			],
			"to equal",
			Immutable.fromJS({
				hat: { name: "Chapeau de paille" },
			}),
		));

	it("returns the fallbacValue if translation not found", () =>
		expect(
			setTranslationWithFallbackValue,
			"when called with",
			[
				"fr",
				Immutable.fromJS({
					hat: { name: { en: "en Name" } },
				}),
				"fallbackHatName",
				["hat", "name"],
			],
			"to equal",
			Immutable.fromJS({
				hat: { name: "fallbackHatName" },
			}),
		));

	it("returns emptyString if  fallbacValue is not defined", () =>
		expect(
			setTranslationWithFallbackValue,
			"when called with",
			[
				"fr",
				Immutable.fromJS({
					hat: { name: { en: "en Name" } },
				}),
				undefined,
				["hat", "name"],
			],
			"to equal",
			Immutable.fromJS({
				hat: { name: "" },
			}),
		));

	it("returns same object if object does not exist", () =>
		expect(
			setTranslationWithFallbackValue,
			"when called with",
			["fr", null, "fallbakValue", ["pets", "name"]],
			"to equal",
			null,
		));

	it("returns value matched by language-culture when exist", () =>
		expect(
			setTranslationWithFallbackValue,
			"when called with",
			[
				"en-US",
				Immutable.fromJS({
					hat: { name: { "en-US": "en-US Name", "en-GB": "en-GB Name" } },
				}),
				"fallbakValue",
				["hat", "name"],
			],
			"to equal",
			Immutable.fromJS({
				hat: { name: "en-US Name" },
			}),
		));

	it("returns value matched by language when match by language-culture does not exist", () =>
		expect(
			setTranslationWithFallbackValue,
			"when called with",
			[
				"en-US",
				Immutable.fromJS({
					hat: { name: { "en-GB": "en-GB Name" } },
				}),
				"fallbakValue",
				["hat", "name"],
			],
			"to equal",
			Immutable.fromJS({
				hat: { name: "en-GB Name" },
			}),
		));

	it("returns first not empty value matched by language when match by language-culture does not exist", () =>
		expect(
			setTranslationWithFallbackValue,
			"when called with",
			[
				"en-US",
				Immutable.fromJS({
					hat: { name: { "en-GB": "", "en-CA": "en-CA Name" } },
				}),
				"fallbakValue",
				["hat", "name"],
			],
			"to equal",
			Immutable.fromJS({
				hat: { name: "en-CA Name" },
			}),
		));

	it("returns value fallback value  when match by language-culture and language does not exist", () =>
		expect(
			setTranslationWithFallbackValue,
			"when called with",
			[
				"en-GB",
				Immutable.fromJS({
					hat: { name: { "fr-CA": "fr-CA Name" } },
				}),
				"fallbakValue",
				["hat", "name"],
			],
			"to equal",
			Immutable.fromJS({
				hat: { name: "fallbakValue" },
			}),
		));

	it("returns fallbak Value when field value is empty ", () =>
		expect(
			setTranslationWithFallbackValue,
			"when called with",
			[
				"en-GB",
				Immutable.fromJS({
					hat: { name: {} },
				}),
				"fallbakValue",
				["hat", "name"],
			],
			"to equal",
			Immutable.fromJS({
				hat: { name: "fallbakValue" },
			}),
		));

	it("returns fallbakValue when field is undefined ", () =>
		expect(
			setTranslationWithFallbackValue,
			"when called with",
			[
				"en-GB",
				Immutable.fromJS({
					hat: { name: {} },
				}),
				"fallbakValue",
				["hat", "name2"],
			],
			"to equal",
			Immutable.fromJS({
				hat: { name: {}, name2: "fallbakValue" },
			}),
		));
});
