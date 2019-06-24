import React from "react";
import Immutable from "immutable";
import sinon from "sinon";
import {
	safeGet,
	getThemeProp,
	ifFlag,
	switchEnum,
	unwrapImmutable,
	normalizeForSearch,
	flatten,
	setTranslation,
	debounce,
	stripKey,
	modulesToRoutes,
	memoize,
	curry,
	loadConfig,
	resetConfig,
	buildUrl,
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

describe("setTranslation", () => {
	it("replaces a i18n message structure with the selected locale's string", () =>
		expect(
			setTranslation,
			"when called with",
			[
				"fr",
				Immutable.fromJS({
					hat: { name: { en: "Straw hat", fr: "Chapeau de paille" } },
				}),
				["hat", "name"],
			],
			"to equal",
			Immutable.fromJS({
				hat: { name: "Chapeau de paille" },
			}),
		));

	it("returns the unchanged object if the path isn't found", () =>
		expect(
			setTranslation,
			"when called with",
			[
				"fr",
				Immutable.fromJS({
					hat: { name: { en: "Straw hat", fr: "Chapeau de paille" } },
				}),
				["pants", "name"],
			],
			"to equal",
			Immutable.fromJS({
				hat: { name: { en: "Straw hat", fr: "Chapeau de paille" } },
			}),
		));

	it("replaces with the first string if the given language is unavailable", () =>
		expect(
			setTranslation,
			"when called with",
			[
				"de",
				Immutable.fromJS({
					hat: { name: { en: "Straw hat", fr: "Chapeau de paille" } },
				}),
				"hat",
				"name",
			],
			"to equal",
			Immutable.fromJS({
				hat: { name: "Straw hat" },
			}),
		));

	it("returns an empty string if no messages are available", () =>
		expect(
			setTranslation,
			"when called with",
			[
				"de",
				Immutable.fromJS({
					hat: { name: {} },
				}),
				["hat", "name"],
			],
			"to equal",
			Immutable.fromJS({
				hat: { name: "" },
			}),
		));

	it("returns if no object passed", () =>
		expect(
			setTranslation,
			"when called with",
			["de", undefined, ["hat", "name"]],
			"to equal",
			undefined,
		));
});

describe("debounce", () => {
	let handler, clock;
	beforeEach(() => {
		handler = sinon.spy().named("handler");
		clock = sinon.useFakeTimers();
	});
	afterEach(() => {
		clock.restore();
	});

	it("returns a function", () =>
		expect(debounce, "when called with", [handler, 10], "to be a function"));

	it("does not call the handler immediately", () =>
		expect(debounce, "called with", [handler, 10])
			.then(debouncedHandler => expect(debouncedHandler, "called"))
			.then(() => expect(handler, "was not called"))
			.then(() => clock.tick(10))
			.then(() => expect(handler, "was called")));

	it("calls the handler at the start of the timeout if immediate flag given", () =>
		expect(debounce, "called with", [handler, 10, true])
			.then(debouncedHandler =>
				expect(debouncedHandler, "called with", ["arg1", { arg2: 2 }]),
			)
			.then(() =>
				expect(handler, "to have calls satisfying", [
					{ args: ["arg1", { arg2: 2 }] },
				]),
			)
			.then(() => clock.tick(10))
			.then(() =>
				expect(handler, "to have calls satisfying", [
					{ args: ["arg1", { arg2: 2 }] },
				]),
			));

	it("delays calling until it has been long enough between calls", () =>
		expect(debounce, "called with", [handler, 10]).then(debouncedHandler =>
			expect(debouncedHandler, "called")
				.then(() => expect(handler, "was not called"))
				.then(() => {
					clock.tick(5);
					debouncedHandler();
				})
				.then(() => expect(handler, "was not called"))
				.then(() => {
					clock.tick(5);
					debouncedHandler();
				})
				.then(() => expect(handler, "was not called"))
				.then(() => {
					clock.tick(5);
					debouncedHandler();
				})
				.then(() => expect(handler, "was not called"))
				.then(() => clock.tick(10))
				.then(() => expect(handler, "was called")),
		));

	it("calls only with latest arguments if multiple calls made", () =>
		expect(debounce, "called with", [handler, 10]).then(debouncedHandler =>
			expect(debouncedHandler, "called with", 1)
				.then(() => expect(handler, "was not called"))
				.then(() => {
					clock.tick(1);
					debouncedHandler(2);
				})
				.then(() => expect(handler, "was not called"))
				.then(() => {
					clock.tick(1);
					debouncedHandler(3);
				})
				.then(() => expect(handler, "was not called"))
				.then(() => {
					clock.tick(1);
					debouncedHandler(4);
				})
				.then(() => expect(handler, "was not called"))
				.then(() => clock.tick(20))
				.then(() =>
					expect(handler, "to have calls satisfying", [{ args: [4] }]),
				),
		));

	it("only calls handler once during repeated calls immediate flag given", () =>
		expect(debounce, "called with", [handler, 10, true]).then(
			debouncedHandler =>
				expect(debouncedHandler, "called with", ["arg1", { arg2: 0 }])
					.then(() =>
						expect(handler, "to have calls satisfying", [
							{ args: ["arg1", { arg2: 0 }] },
						]),
					)
					.then(() => {
						clock.tick(5);
						debouncedHandler("arg1", { arg2: 1 });
					})
					.then(() =>
						expect(handler, "to have calls satisfying", [
							{ args: ["arg1", { arg2: 0 }] },
						]),
					)
					.then(() => {
						clock.tick(5);
						debouncedHandler("arg1", { arg2: 2 });
					})
					.then(() =>
						expect(handler, "to have calls satisfying", [
							{ args: ["arg1", { arg2: 0 }] },
						]),
					)
					.then(() => clock.tick(10))
					.then(() =>
						expect(handler, "to have calls satisfying", [
							{ args: ["arg1", { arg2: 0 }] },
						]),
					)
					.then(() => {
						debouncedHandler("arg1", { arg2: 3 });
					})
					.then(() =>
						expect(handler, "to have calls satisfying", [
							{ args: ["arg1", { arg2: 0 }] },
							{ args: ["arg1", { arg2: 3 }] },
						]),
					)
					.then(() => clock.tick(10))
					.then(() =>
						expect(handler, "to have calls satisfying", [
							{ args: ["arg1", { arg2: 0 }] },
							{ args: ["arg1", { arg2: 3 }] },
						]),
					),
		));
});

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

describe("modulesToRoutes", () => {
	let modules, Mod2, Mod3, Page1, Page2, Page3, SubPage1;
	beforeEach(() => {
		Mod2 = () => <div />;
		Mod3 = () => <div />;
		Page1 = () => <div />;
		Page2 = () => <div />;
		Page3 = () => <div />;
		SubPage1 = () => <div />;
		modules = {
			users: {
				label: "Module 1",
				icon: "user",
				mode: "segments",
				pages: {
					"/:page1": {
						component: Page1,
						label: "Page 1",
					},
					"/:page2": {
						component: Page2,
						label: "Page 2",
						pages: {
							"/sub1": {
								label: "Sub-page 1",
								component: SubPage1,
							},
						},
					},
				},
			},
			photos: {
				label: "Module 2",
				icon: "image",
				component: Mod2,
				pages: {
					"/:page3": {
						component: Page3,
						label: "Page 3",
					},
				},
			},
			demos: {
				label: "Module 3",
				icon: "cloud",
				component: Mod3,
			},
		};
	});

	it("converts a module table to a route table", () =>
		expect(modulesToRoutes, "called with", [modules], "to satisfy", {
			"/:scope": {
				"/users": {
					module: "users",
					segments: true,
					"/:page1": {
						label: "Page 1",
					},
					"/:page2": {
						label: "Page 2",
						"/sub1": {
							label: "Sub-page 1",
						},
					},
				},
				"/photos": {
					module: "photos",
					"/:page3": {
						label: "Page 3",
					},
				},
				"/demos": {
					module: "demos",
				},
			},
		}));
});

describe("memoize", () => {
	let func;
	beforeEach(() => {
		func = sinon.spy(x => x + 1).named("testFunc");
	});

	it("returns a function", () =>
		expect(memoize, "when called with", [func], "to be a function"));

	it("returns correct results but only calls the function if new params given", () =>
		expect(memoize, "when called with", [func])
			.then(memoizedFunc =>
				expect(memoizedFunc, "called with", [1], "to be", 2)
					.and("called with", [1], "to be", 2)
					.and("called with", [2], "to be", 3)
					.and("called with", [1], "to be", 2)
					.and("called with", [1], "to be", 2)
					.and("called with", [5], "to be", 6)
					.and("called with", [2], "to be", 3)
					.and("called with", [3], "to be", 4)
					.and("called with", [3], "to be", 4)
					.and("called with", [1], "to be", 2)
					.and("called with", [2], "to be", 3)
					.and("called with", [3], "to be", 4)
					.and("called with", [4], "to be", 5)
					.and("called with", [5], "to be", 6),
			)
			.then(() =>
				expect(func, "to have calls satisfying", [
					{ args: [1] },
					{ args: [2] },
					{ args: [5] },
					{ args: [3] },
					{ args: [4] },
				]),
			));
});

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

describe("loadConfig", () => {
	let oldFetch, fail, response, placeholderBuildUrl;
	beforeEach(() => {
		oldFetch = window.fetch;
		response = "";
		fail = false;
		window.fetch = sinon
			.spy(() => {
				if (fail) {
					return Promise.reject();
				} else {
					return Promise.resolve({ json: () => response });
				}
			})
			.named("fetch");
		placeholderBuildUrl = buildUrl;
	});
	afterEach(() => {
		window.fetch = oldFetch;
		resetConfig();
	});

	it("loads the /config.json file and resets dependent functions from placeholders", () => {
		response = {
			serviceApiUrl: "https://example.com/api",
		};
		return expect(loadConfig, "when called").then(() => {
			expect(placeholderBuildUrl, "not to be", buildUrl);
			expect(console.warn, "was not called");
		});
	});

	it("gets defaults if fetch fails, warns of this", () => {
		fail = true;
		return expect(loadConfig, "when called").then(() => {
			expect(placeholderBuildUrl, "not to be", buildUrl);
			expect(
				console.warn,
				"was called with",
				"Failed to load config.json, falling back to dev defaults",
			);
		});
	});

	describe("buildUrl", () => {
		it("throws an error if called before loadConfig()", () =>
			expect(
				buildUrl,
				"to throw",
				"Config not yet loaded. " +
					"Please call util.js#loadConfig() and await resolution of the returned Promise.",
			));

		describe("with config loaded", () => {
			beforeEach(() => {
				response = {
					serviceApiUrl: "https://example.com/api",
				};
				return loadConfig();
			});

			it("constructs an URL from path segments", () =>
				expect(
					buildUrl,
					"called with",
					[["foo", "bar"]],
					"to equal",
					"https://example.com/api/foo/bar",
				));

			it("constructs an URL with parameters", () =>
				expect(
					buildUrl,
					"called with",
					[undefined, { lavish: true, people: 15 }],
					"to equal",
					"https://example.com/api/?lavish=true&people=15",
				));
		});
	});
});
