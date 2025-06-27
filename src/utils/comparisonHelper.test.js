import {
	areEqualCaseInsensitive,
	areGuidsEquals,
	doesObjectContainsTextCaseInsensitive,
	partialDeepEqual,
	compareTextCaseInsensitive,
	compareNumeric,
	compareBoolean,
	getBooleanValue,
} from "./comparisonHelper";

describe("partialDeepEqual function", () => {
	it.each([
		["empty with non empty object", {}, { a: 1 }],
		["different properties", { b: 2 }, { a: 1 }],
		["same properties different values", { a: 2 }, { a: 1 }],
		["same nested properties different values", { a: { b: 3 } }, { a: { b: 4 } }],
	])("returns false if the objects are ", (msg, obj1, obj2) => {
		const result = partialDeepEqual(obj1, obj2);
		expect(result, "to equal", false);
	});

	it.each([
		["empty objects", {}, {}],
		["same properties", { a: 1 }, { a: 1 }],
		["same nested properties same values", { a: { b: 3 } }, { a: { b: 3 } }],
	])("returns true if the objects are ", (msg, obj1, obj2) => {
		const result = partialDeepEqual(obj1, obj2);
		expect(result, "to equal", true);
	});

	it("returns false even with ignored property", () => {
		const obj1 = {
			a: 2,
			b: 1,
		};

		const obj2 = {
			a: 1,
			b: 1,
		};

		const result = partialDeepEqual(obj1, obj2, ["b"]);
		expect(result, "to equal", false);
	});

	it("returns true with ignored property", () => {
		const obj1 = {
			a: 2,
			b: 1,
		};

		const obj2 = {
			a: 1,
			b: 1,
		};

		const result = partialDeepEqual(obj1, obj2, ["a"]);
		expect(result, "to equal", true);
	});

	it("returns true if both are null", () => {
		const obj1 = null;

		const obj2 = null;

		const result = partialDeepEqual(obj1, obj2);
		expect(result, "to equal", true);
	});

	it("returns true if both are undefined", () => {
		const obj1 = undefined;

		const obj2 = undefined;

		const result = partialDeepEqual(obj1, obj2);
		expect(result, "to equal", true);
	});

	it("returns true if one is null and the other undefined", () => {
		const obj1 = null;

		const obj2 = undefined;

		const result = partialDeepEqual(obj1, obj2);
		expect(result, "to equal", false);
	});
});

describe("areGuidsEquals function", () => {
	it.each([
		[true, "AAA123", "aaa123"],
		[true, "123", "1-2-3"],
		[true, "1-2-3", "1-2-3"],
		[true, "123", "123"],
		[false, "123", "1-2-3-4"],
		[false, "123", "1-2-3-4"],
		[false, "123", null],
		[false, "123", undefined],
		[false, null, "123"],
		[false, undefined, "123"],
		[true, null, null],
		[true, undefined, undefined],
		[true, undefined, null],
		[true, null, undefined],
	])("returns %s for values %s and %s ", (expectedResult, value1, value2) => {
		const result = areGuidsEquals(value1, value2);
		expect(result, "to equal", expectedResult);
	});
});

describe("areEqualCaseInsensitive function", () => {
	it.each([
		[true, "AAA123", "aaa123"],
		[false, "123", "1-2-3"],
		[true, "123", "123"],
		[false, "123", null],
		[false, "123", undefined],
		[false, null, "123"],
		[false, undefined, "123"],
		[true, null, null],
		[true, undefined, undefined],
		[true, undefined, null],
		[true, null, undefined],
	])("returns %s for values %s and %s ", (expectedResult, value1, value2) => {
		const result = areEqualCaseInsensitive(value1, value2);
		expect(result, "to equal", expectedResult);
	});
});

describe("getBooleanValue function", () => {
	it.each([
		[true, true],
		[false, false],
		["trUE", true],
		["faLSe", false],
		["faLSeInvalid", null],
		["InvalidTrue", null],
	])("value %s returned the result %s ", (value, expectedResult) => {
		const result = getBooleanValue(value);
		expect(result, "to equal", expectedResult);
	});
});

describe("compareBoolean function", () => {
	it.each([
		[true, "tRuE", true],
		[true, "tRuE1", false],
		[true, "false", false],
		[true, false, false],
		["tRuE", true, true],
		["tRuE1", true, false],
		["false", true, false],
		[true, true, true],
		[false, true, false],
		[false, "FaLSe", true],
		[false, "FaLSe1", false],
		[false, "TrUe", false],
		["FaLSe", false, true],
		["FaLSe1", false, false],
		["TrUe", false, false],
		[false, false, true],
		[false, null, false],
		["FaLSe", null, false],
		[false, undefined, false],
		["FaLSe", undefined, false],
		["FaLSeInvalid", "TrueInvalid", false],
	])("values %s and %s returned the result %s ", (value1, value2, expectedResult) => {
		const result = compareBoolean(value1, value2);
		expect(result, "to equal", expectedResult);
	});
});

describe("doesObjectContainsTextCaseInsensitive function", () => {
	it("returns false if object is null", function () {
		const result = doesObjectContainsTextCaseInsensitive(null, "val");
		expect(result, "to be", false);
	});

	it("returns false if object is undefined", function () {
		const result = doesObjectContainsTextCaseInsensitive(undefined, "val");
		expect(result, "to be", false);
	});

	it("returns true if searchTerm is null", function () {
		const result = doesObjectContainsTextCaseInsensitive({}, null);
		expect(result, "to be", true);
	});

	it("returns true if searchTerm is undefined", function () {
		const result = doesObjectContainsTextCaseInsensitive({}, undefined);
		expect(result, "to be", true);
	});

	it("returns true if searchTerm is an empty string", function () {
		const result = doesObjectContainsTextCaseInsensitive({}, "");
		expect(result, "to be", true);
	});

	it("returns false if object has no properties", function () {
		const result = doesObjectContainsTextCaseInsensitive({}, "val");
		expect(result, "to be", false);
	});

	it("returns false if text cannot be found in property", function () {
		const result = doesObjectContainsTextCaseInsensitive({ prop: "another" }, "val");
		expect(result, "to be", false);
	});

	it("returns true if text is found in property (exact match)", function () {
		const result = doesObjectContainsTextCaseInsensitive({ prop: "another", prop2: "val" }, "val");
		expect(result, "to be", true);
	});

	it("returns true if text is found in property (contains)", function () {
		const result = doesObjectContainsTextCaseInsensitive({ prop: "another", prop2: "some value" }, "val");
		expect(result, "to be", true);
	});

	it("returns true if text is found in property (case insensitive)", function () {
		const result = doesObjectContainsTextCaseInsensitive({ prop: "another", prop2: "VALUE" }, "val");
		expect(result, "to be", true);
	});

	it("ignores non string properties", function () {
		const result = doesObjectContainsTextCaseInsensitive({ prop: 123, prop2: "VALUE" }, "val");
		expect(result, "to be", true);
	});

	it("only look at first level properties (not deep)", function () {
		const result = doesObjectContainsTextCaseInsensitive({ prop: { prop2: "VALUE" } }, "val");
		expect(result, "to be", false);
	});

	it("does not crash if prop value is null", function () {
		const result = doesObjectContainsTextCaseInsensitive({ prop: null, prop2: "bob" }, "val");
		expect(result, "to be", false);
	});

	it("returns false because property with value is not looked at", function () {
		const result = doesObjectContainsTextCaseInsensitive({ prop: "123", prop2: "VALUE" }, "val", ["prop"]);
		expect(result, "to be", false);
	});

	it("returns true because property with value is looked at", function () {
		const result = doesObjectContainsTextCaseInsensitive({ prop: "123", prop2: "VALUE" }, "val", ["prop2"]);
		expect(result, "to be", true);
	});
});

describe("compareTextCaseInsensitive function", () => {
	it.each([
		[0, "AAA123", "aaa123"],
		[-1, "AAA123", "AAA1234"],
		[-1, "123", "123a"],
		[-1, null, "123"],
		[-1, undefined, "123"],
		[0, null, null],
		[0, undefined, undefined],
		[0, undefined, null],
		[0, null, undefined],
	])("returns %s for values %s and %s ", (expectedResult, value1, value2) => {
		const result = compareTextCaseInsensitive(value1, value2);
		expect(result, "to equal", expectedResult);
	});

	it.each([
		[0, "AAA123", "aaa123"],
		[1, "AAA123", "AAA1234"],
		[1, "123", "123a"],
		[1, null, "123"],
		[1, undefined, "123"],
		[0, null, null],
		[0, undefined, undefined],
		[0, undefined, null],
		[0, null, undefined],
	])("returns %s for values %s and %s for descending order", (expectedResult, value1, value2) => {
		const result = compareTextCaseInsensitive(value1, value2, false);
		expect(result, "to equal", expectedResult);
	});
});

describe("compareNumeric function", () => {
	it.each([
		[0, 42, 42],
		[-1, 42, 42.42],
		[-1, null, 42],
		[-1, undefined, 42],
		[0, null, null],
		[0, undefined, undefined],
		[0, undefined, null],
		[0, null, undefined],
		[-1, "9", "42"],
		[1, "9", null],
		[1, "9", undefined],
		[1, 9, 7],
		[1, 9, undefined],
		[1, undefined, -1],
		[-1, null, "1"],
		[-1, undefined, "1"],
	])("returns %s for values %s and %s ", (expectedResult, value1, value2) => {
		const result = compareNumeric(value1, value2);
		expect(result, "to equal", expectedResult);
	});

	it.each([
		[0, 42, 42],
		[1, 42, 42.42],
		[1, null, 42],
		[1, undefined, 42],
		[0, null, null],
		[0, undefined, undefined],
		[0, undefined, null],
		[0, null, undefined],
		[1, "9", "42"],
		[-1, "9", null],
		[-1, "9", undefined],
		[1, null, "1"],
		[1, undefined, "1"],
	])("returns %s for values %s and %s for descending order", (expectedResult, value1, value2) => {
		const result = compareNumeric(value1, value2, false);
		expect(result, "to equal", expectedResult);
	});
});
