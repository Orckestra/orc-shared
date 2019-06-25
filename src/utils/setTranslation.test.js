import Immutable from "immutable";
import setTranslation from "./setTranslation";

describe("setTranslation", () => {
	it("replaces a i18n message structure with the selected locale's string", () =>
		expect(
			setTranslation,
			"when called with",
			[
				"fr",
				Immutable.fromJS({
					hat: { name: { en: "Straw hat", fr: "Chapeau de paille" } },
				}),
				["hat", "name"],
			],
			"to equal",
			Immutable.fromJS({
				hat: { name: "Chapeau de paille" },
			}),
		));

	it("returns the unchanged object if the path isn't found", () =>
		expect(
			setTranslation,
			"when called with",
			[
				"fr",
				Immutable.fromJS({
					hat: { name: { en: "Straw hat", fr: "Chapeau de paille" } },
				}),
				["pants", "name"],
			],
			"to equal",
			Immutable.fromJS({
				hat: { name: { en: "Straw hat", fr: "Chapeau de paille" } },
			}),
		));

	it("replaces with the first string if the given language is unavailable", () =>
		expect(
			setTranslation,
			"when called with",
			[
				"de",
				Immutable.fromJS({
					hat: { name: { en: "Straw hat", fr: "Chapeau de paille" } },
				}),
				"hat",
				"name",
			],
			"to equal",
			Immutable.fromJS({
				hat: { name: "Straw hat" },
			}),
		));

	it("returns an empty string if no messages are available", () =>
		expect(
			setTranslation,
			"when called with",
			[
				"de",
				Immutable.fromJS({
					hat: { name: {} },
				}),
				["hat", "name"],
			],
			"to equal",
			Immutable.fromJS({
				hat: { name: "" },
			}),
		));

	it("returns if no object passed", () =>
		expect(
			setTranslation,
			"when called with",
			["de", undefined, ["hat", "name"]],
			"to equal",
			undefined,
		));
});
