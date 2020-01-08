import { flatten } from "./flatten";

describe("flatten", () => {
	it("flattens nested arrays", () =>
		expect(
			flatten,
			"when called with",
			[["a", "b", ["c", ["d"], ["e", "f"]]]],
			"to equal",
			["a", "b", "c", "d", "e", "f"],
		));
});
