import React from "react";
import { PropStruct, firstItemComparator } from "./testUtils";

describe("PropStruct", () => {
	it("handles symbols", () =>
		expect(
			<PropStruct symbol={Symbol("foo")} />,
			"when mounted",
			"to satisfy",
			<dl>
				<dt>symbol:</dt>
				<dd>symbol Symbol(foo)</dd>
			</dl>,
		));

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
