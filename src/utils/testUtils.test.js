import { firstItemComparator } from "./testUtils";

describe("PropStruct", () => {
	describe("comparator", () => {
		it("compares the first element of arrays, a > b", () =>
			expect(
				firstItemComparator,
				"called with",
				[
					[1, 0],
					[0, 1],
				],
				"to equal",
				1,
			));

		it("compares the first element of arrays, a < b", () =>
			expect(
				firstItemComparator,
				"called with",
				[
					[0, 1],
					[1, 0],
				],
				"to equal",
				-1,
			));

		it("compares the first element of arrays, a = b", () =>
			expect(
				firstItemComparator,
				"called with",
				[
					[1, 0],
					[1, 1],
				],
				"to equal",
				0,
			));
	});
});
