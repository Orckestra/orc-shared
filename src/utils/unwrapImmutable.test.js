import Immutable from "immutable";
import unwrapImmutable from "./unwrapImmutable";

describe("unwrapImmutable", () => {
	it("converts an immutable value to a plain JS object", () =>
		expect(
			unwrapImmutable,
			"when called with",
			[Immutable.Map({ foo: Immutable.List([true, false]) })],
			"to equal",
			{ foo: [true, false] },
		));

	it("leaves non-immutable values alone", () => {
		const value = { foo: [true, false] };
		return expect(unwrapImmutable, "when called with", [value], "to be", value);
	});
});
