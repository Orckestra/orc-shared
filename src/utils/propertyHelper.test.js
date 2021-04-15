import * as propertyHelper from "./propertyHelper";
const { Map } = require("immutable");

const immutableMap = Map({ prop1: 123 });

describe("<propertyHelper.getPropertyOrDefault> for object", () => {
	it("get property value", () => {
		expect(propertyHelper.getPropertyOrDefault({ prop1: 123 }, "prop1", "XYZ"), "to equal", 123);
	});

	it("get default property value", () => {
		expect(propertyHelper.getPropertyOrDefault({ prop1: 123 }, "prop2", "XYZ"), "to equal", "XYZ");
	});

	it("get default property value when obj is undefined", () => {
		expect(propertyHelper.getPropertyOrDefault(undefined, "prop2", "XYZ"), "to equal", "XYZ");
	});

	it("get default property value when obj is null", () => {
		expect(propertyHelper.getPropertyOrDefault(null, "prop2", "XYZ"), "to equal", "XYZ");
	});

	it("get property value ignoring case", () => {
		expect(propertyHelper.getPropertyOrDefault({ prop1: 123 }, "pRoP1", "XYZ", true), "to equal", 123);
	});

	it("get property default value ignoring case", () => {
		expect(propertyHelper.getPropertyOrDefault({ prop1: 123 }, "pRoP2", "XYZ", true), "to equal", "XYZ");
	});

	it("get property value starting with", () => {
		expect(propertyHelper.getPropertyOrDefault({ prop1: 123 }, "pRo", "XYZ", false, true), "to equal", 123);
	});

	it("get property default value starting with", () => {
		expect(propertyHelper.getPropertyOrDefault({ prop1: 123 }, "pR1", "XYZ", false, true), "to equal", "XYZ");
	});

	it("get property value starting with", () => {
		expect(propertyHelper.getPropertyOrDefault(null, "pRo", "XYZ", false, true), "to equal", "XYZ");
	});

	it("get property default value starting with", () => {
		expect(propertyHelper.getPropertyOrDefault(undefined, "pR1", "XYZ", false, true), "to equal", "XYZ");
	});
});

describe("<propertyHelper.getPropertyOrDefault> for Map", () => {
	it("get property value", () => {
		expect(propertyHelper.getPropertyOrDefault(immutableMap, "prop1", "XYZ"), "to equal", 123);
	});

	it("get default property value", () => {
		expect(propertyHelper.getPropertyOrDefault(immutableMap, "prop2", "XYZ"), "to equal", "XYZ");
	});

	it("get property value ignoring case", () => {
		expect(propertyHelper.getPropertyOrDefault(immutableMap, "pRoP1", "XYZ", true), "to equal", 123);
	});

	it("get property default value ignoring case", () => {
		expect(propertyHelper.getPropertyOrDefault(immutableMap, "pRoP2", "XYZ", true), "to equal", "XYZ");
	});

	it("get property value starting with", () => {
		expect(propertyHelper.getPropertyOrDefault(immutableMap, "pRo", "XYZ", false, true), "to equal", 123);
	});

	it("get property default value starting with", () => {
		expect(propertyHelper.getPropertyOrDefault(immutableMap, "pR1", "XYZ", false, true), "to equal", "XYZ");
	});
});

describe("isObjectContainsPropertyWithValue", () => {
	it("Returns true if object contains specified property with specified value", () => {
		const obj = {
			prop1: {
				a: {
					m: "Hello",
				},
			},
			prop2: {
				m: "Hello Bob",
			},
			prop3: {
				m: "Hello Bobbina",
			},
		};

		const result = propertyHelper.isObjectContainsPropertyWithValue(obj, "m", "Hello Bob");

		expect(result, "to be true");
	});

	it("Returns false if object does not contain specified property with specified value", () => {
		const obj = {
			prop1: {
				a: {
					m: "Hello",
				},
			},
			prop2: {
				m: "Hello Bob",
			},
		};

		const result = propertyHelper.isObjectContainsPropertyWithValue(obj, "m", "Bye Bob");

		expect(result, "to be false");
	});

	it("Does not fail if some property has Null value", () => {
		const obj = {
			prop1: {
				a: {
					m: null,
				},
			},
			prop2: {
				m: "Hello Bob",
			},
		};

		const result = propertyHelper.isObjectContainsPropertyWithValue(obj, "m", "Bye Bob");

		expect(result, "to be false");
	});
});

describe("isObjectContainsPropertyWithAnyValue", () => {
	it("Returns true if object contains specified property with any value", () => {
		const obj = {
			prop1: {
				a: {
					m: "Hello",
				},
			},
			prop2: {
				m: "Hello Bobbina",
			},
		};

		const result = propertyHelper.isObjectContainsPropertyWithAnyValue(obj, "m");

		expect(result, "to be true");
	});

	it("Returns false if object does not contain specified property with any value", () => {
		const obj = {
			prop1: {
				a: {
					m: "Hello",
				},
			},
			prop2: {
				m: "Hello Bob",
			},
		};

		const result = propertyHelper.isObjectContainsPropertyWithAnyValue(obj, "error");

		expect(result, "to be false");
	});

	it("Does not fail if some property has Null value", () => {
		const obj = {
			prop1: {
				a: {
					m: null,
				},
			},
			prop2: {
				m: "Hello Bob",
			},
		};

		const result = propertyHelper.isObjectContainsPropertyWithAnyValue(obj, "error");

		expect(result, "to be false");
	});
});
