import curry from "./curry";

describe("curry", () => {
	let testFunc;
	beforeEach(() => {
		testFunc = (x, y) => `${x} and also ${y}`;
	});

	describe("0 < curried < arity", () => {
		it("returns a function", () =>
			expect(curry, "when called with", [testFunc, "foo"], "to be a function"));

		it("calls wrapped function with curried parameters and call parameters", () =>
			expect(
				curry,
				"when called with",
				[testFunc, "foo"],
				"when called with",
				["bar"],
				"to equal",
				"foo and also bar",
			));
	});

	describe("curried = 0", () => {
		it("returns a function", () =>
			expect(curry, "when called with", [testFunc], "to be a function"));

		it("has no curried parameters", () =>
			expect(
				curry,
				"when called with",
				[testFunc],
				"when called with",
				["bar", "foo"],
				"to equal",
				"bar and also foo",
			));
	});

	describe("curried = arity", () => {
		it("returns a function", () =>
			expect(
				curry,
				"when called with",
				[testFunc, "foo", "bar"],
				"to be a function",
			));

		it("calls wrapped function with curried parameters", () =>
			expect(
				curry,
				"when called with",
				[testFunc, "foo", "bar"],
				"when called with",
				["feep"],
				"to equal",
				"foo and also bar",
			));
	});

	describe("curried > arity", () => {
		it("returns a function", () =>
			expect(
				curry,
				"when called with",
				[testFunc, "feep", "meep", "foo"],
				"to be a function",
			));

		it("calls function with curried parameters", () =>
			expect(
				curry,
				"when called with",
				[testFunc, "feep", "meep", "foo"],
				"when called with",
				["bar"],
				"to equal",
				"feep and also meep",
			));
	});
});
