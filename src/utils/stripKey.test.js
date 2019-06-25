import stripKey from "./stripKey";

describe("stripKey", () => {
	it("returns a copied object with the named key removed", () => {
		const obj = { foo: 1, bar: 2, moo: 3 };
		return expect(stripKey, "called with", ["bar", obj]).then(copy =>
			expect(copy, "not to be", obj)
				.and("not to have key", "bar")
				.and("to satisfy", { foo: 1, moo: 3 }),
		);
	});
});
