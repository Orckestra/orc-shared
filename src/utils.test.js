import Immutable from "immutable";
import {
	safeGet,
	getThemeProp,
	ifFlag,
	unwrapImmutable,
	normalizeForSearch,
} from "utils";

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
});

describe("getThemeProp", () => {
	let props;
	beforeEach(() => {
		props = {
			theme: { hot: { potato: "ooh so tasty" } },
			temp: "hot",
			weird: "flavortown",
		};
	});

	it("returns a function that gets a value from the theme prop", () =>
		expect(
			getThemeProp,
			"when called with",
			[["hot", "potato"], "a mess"],
			"when called with",
			[props],
			"to equal",
			"ooh so tasty",
		));

	it("gets the default if theme prop not found", () =>
		expect(
			getThemeProp,
			"when called with",
			[["hot", "tomato"], "a mess"],
			"when called with",
			[props],
			"to equal",
			"a mess",
		));

	it("can use prop functions in the path", () =>
		expect(
			getThemeProp,
			"when called with",
			[[props => props.temp, "potato"], "a mess"],
			"when called with",
			[props],
			"to equal",
			"ooh so tasty",
		));

	it("can use prop functions in the default", () =>
		expect(
			getThemeProp,
			"when called with",
			[["hot", "tomato"], props => props.weird],
			"when called with",
			[props],
			"to equal",
			"flavortown",
		));

	describe("with function parameter", () => {
		let func;
		beforeEach(() => {
			func = x => x.toUpperCase();
		});

		it("calls the passed function on the value from the theme prop", () =>
			expect(
				getThemeProp,
				"when called with",
				[["hot", "potato"], "a mess", func],
				"when called with",
				[props],
				"to equal",
				"OOH SO TASTY",
			));

		it("calls the passed function on the default if theme prop not found", () =>
			expect(
				getThemeProp,
				"when called with",
				[["hot", "tomato"], "a mess", func],
				"when called with",
				[props],
				"to equal",
				"A MESS",
			));
	});
});

describe("ifFlag", () => {
	let props;
	beforeEach(() => {
		props = { yesFlag: true, noFlag: false, value: "this is it" };
	});

	it("makes a prop function that returns second parameter if first parameter true", () =>
		expect(
			ifFlag,
			"when called with",
			["yesFlag", "no fooling", "not this"],
			"when called with",
			[props],
			"to equal",
			"no fooling",
		));

	it("makes a prop function that returns third parameter if first parameter false", () =>
		expect(
			ifFlag,
			"when called with",
			["noFlag", "no fooling", "not this"],
			"when called with",
			[props],
			"to equal",
			"not this",
		));

	it("returns empty string if no third parameter", () =>
		expect(
			ifFlag,
			"when called with",
			["noFlag", "no fooling"],
			"when called with",
			[props],
			"to equal",
			"",
		));

	it("handles prop funcs as second parameter", () =>
		expect(
			ifFlag,
			"when called with",
			["yesFlag", props => props.value, "not this"],
			"when called with",
			[props],
			"to equal",
			"this is it",
		));

	it("handles prop funcs as third parameter", () =>
		expect(
			ifFlag,
			"when called with",
			["noFlag", "no fooling", props => props.value],
			"when called with",
			[props],
			"to equal",
			"this is it",
		));
});

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
