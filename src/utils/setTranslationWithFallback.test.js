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

	it("returns same object if field does not exist", () =>
		expect(
			setTranslationWithFallbackValue,
			"when called with",
			[
				"fr",
				Immutable.fromJS({
					name: "fallbackName",
					hat: { name: {} },
				}),
				"fallbakValue",
				["pets", "name"],
			],
			"to equal",
			Immutable.fromJS({
				name: "fallbackName",
				hat: { name: {} },
			}),
		));
});
