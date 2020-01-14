import { flatten, flattenObj } from "./flatten";

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

describe("flattenObj", () => {
	it("flattens nested objects by creating prefixed key names", () =>
		expect(
			flattenObj,
			"when called with",
			[
				{
					a: { a: 1, b: { a: 2 } },
					b: { a: 0 },
					c: 3,
				},
			],
			"to equal",
			{
				"a.a": 1,
				"a.b.a": 2,
				"b.a": 0,
				c: 3,
			},
		));

	it("allows custom separators", () =>
		expect(
			flattenObj,
			"when called with",
			[
				{
					a: { a: 1, b: { a: 2 } },
					b: { a: 0 },
					c: 3,
				},
				"***",
			],
			"to equal",
			{
				"a***a": 1,
				"a***b***a": 2,
				"b***a": 0,
				c: 3,
			},
		));

	it("allows custom prefixes", () =>
		expect(
			flattenObj,
			"when called with",
			[
				{
					a: { a: 1, b: { a: 2 } },
					b: { a: 0 },
					c: 3,
				},
				"***",
				"Flattened:",
			],
			"to equal",
			{
				"Flattened:a***a": 1,
				"Flattened:a***b***a": 2,
				"Flattened:b***a": 0,
				"Flattened:c": 3,
			},
		));
});
