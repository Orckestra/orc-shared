import normalizeForSearch from "./normalizeForSearch";

describe("normalizeForSearch", () => {
	it("transforms a string into lowercase", () =>
		expect(
			normalizeForSearch,
			"when called with",
			["ThIs iS A StRiNg"],
			"to equal",
			"this is a string",
		));

	if ("".normalize) {
		it("strips off accents", () =>
			expect(
				normalizeForSearch,
				"when called with",
				["áÈõÛÿæøå"],
				"to equal",
				"aeouyæøa",
			));
	}
});
