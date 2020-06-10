import safeGet from "./safeGet";

describe("safeGet", () => {
	it("gets a value from a nested object", () =>
		expect(
			safeGet,
			"when called with",
			[
				{
					foo: { bar: { feep: true } },
				},
				"foo",
				"bar",
				"feep",
			],
			"to equal",
			true,
		));

	it("gets a contained object from a nested object", () =>
		expect(
			safeGet,
			"when called with",
			[
				{
					foo: { bar: { feep: true } },
				},
				"foo",
				"bar",
			],
			"to equal",
			{ feep: true },
		));

	it("gets undefined if there is no such path in the object", () =>
		expect(
			safeGet,
			"when called with",
			[
				{
					foo: {},
				},
				"foo",
				"bar",
				"feep",
			],
			"to be undefined",
		));

	it("handles null gracefully", () =>
		expect(safeGet, "when called with", [null, "foo", "bar"], "to be null"));
});
