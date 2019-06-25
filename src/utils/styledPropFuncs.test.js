import { getThemeProp, ifFlag, switchEnum } from "./styledPropFuncs";

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

describe("switchEnum", () => {
	let cases;
	beforeEach(() => {
		cases = { one: "One 111", two: "Two 222" };
	});

	it("yields a property function which checks a field against a list of cases", () =>
		expect(switchEnum, "when called with", ["enum", cases]).then(func =>
			expect(func, "when called with", [{ enum: "one" }], "to equal", "One 111")
				.and("when called with", [{ enum: "two" }], "to equal", "Two 222")
				.and("when called with", [{ enum: "three" }], "to be undefined"),
		));

	it("yields a default if one is set", () => {
		cases.default = "A default";
		return expect(
			switchEnum,
			"when called with",
			["enum", cases],
			"when called with",
			[{ enum: "three" }],
			"to equal",
			"A default",
		);
	});
});
