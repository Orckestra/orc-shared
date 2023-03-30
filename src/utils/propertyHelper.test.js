import * as propertyHelper from "./propertyHelper";
import { compareObjectProperty } from "./propertyHelper";
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

	it("Returns true if object contains specified property with boolean false value", () => {
		const obj = {
			prop1: {
				a: {
					m: false,
				},
			},
			prop2: {
				m: "Hello Bobbina",
			},
		};

		const result = propertyHelper.isObjectContainsPropertyWithValue(obj, "m", false);

		expect(result, "to be true");
	});

	it("Returns false if object doesn't contain specified property with boolean False value", () => {
		const obj = {
			prop1: {
				a: {
					m: true,
				},
			},
			prop2: {
				m: "Hello Bobbina",
			},
		};

		const result = propertyHelper.isObjectContainsPropertyWithValue(obj, "m", false);

		expect(result, "to be false");
	});

	it("Returns true if object contains specified property with boolean True value", () => {
		const obj = {
			prop1: {
				a: {
					m: true,
				},
			},
			prop2: {
				m: "Hello Bobbina",
			},
		};

		const result = propertyHelper.isObjectContainsPropertyWithValue(obj, "m", true);

		expect(result, "to be true");
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

	it("Return true of property has Null value", () => {
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

		const result = propertyHelper.isObjectContainsPropertyWithAnyValue(obj, "m");

		expect(result, "to be true");
	});

	it("Return true of property has False value", () => {
		const obj = {
			prop1: {
				a: {
					m: false,
				},
			},
			prop2: {
				m: "Hello Bob",
			},
		};

		const result = propertyHelper.isObjectContainsPropertyWithAnyValue(obj, "m");

		expect(result, "to be true");
	});

	it("Return true of property has True value", () => {
		const obj = {
			prop1: {
				a: {
					m: true,
				},
			},
			prop2: {
				m: "Hello Bob",
			},
		};

		const result = propertyHelper.isObjectContainsPropertyWithAnyValue(obj, "m");

		expect(result, "to be true");
	});
});

describe("compareObjectProperty", () => {
	it("Return 0 if both obj are null", () => {
		const result = propertyHelper.compareObjectProperty(null, null, "prop");

		expect(result, "to equal", 0);
	});

	it("Return 0 if obj1 is null and obj2 does not have property", () => {
		const result = propertyHelper.compareObjectProperty(null, {}, "prop");

		expect(result, "to equal", 0);
	});

	it("Return 0 if obj1 does not have property and obj1 is null", () => {
		const result = propertyHelper.compareObjectProperty({}, null, "prop");

		expect(result, "to equal", 0);
	});

	it("Return 0 if both obj does not have property", () => {
		const result = propertyHelper.compareObjectProperty({}, null, "prop");

		expect(result, "to equal", 0);
	});

	it("Return 0 if both obj have property with null value", () => {
		const result = propertyHelper.compareObjectProperty({ prop: null }, { prop: null }, "prop");

		expect(result, "to equal", 0);
	});

	it("Return 0 if propertyName is null", () => {
		const result = propertyHelper.compareObjectProperty({}, {}, null);

		expect(result, "to equal", 0);
	});

	it("Return 0 if propertyName is empty", () => {
		const result = propertyHelper.compareObjectProperty({}, {}, "");

		expect(result, "to equal", 0);
	});

	it("Return 0 if property has same value (string)", () => {
		const result = propertyHelper.compareObjectProperty({ prop: "a" }, { prop: "a" }, "prop");

		expect(result, "to equal", 0);
	});

	it("Return -1 if obj1 property is small than obj2 property (string)", () => {
		const result = propertyHelper.compareObjectProperty({ prop: "a" }, { prop: "b" }, "prop");

		expect(result, "to equal", -1);
	});

	it("Return 1 if obj1 property is bigger than obj2 property (string)", () => {
		const result = propertyHelper.compareObjectProperty({ prop: "b" }, { prop: "a" }, "prop");

		expect(result, "to equal", 1);
	});

	it("Return 0 if property has same value (numeric)", () => {
		const result = propertyHelper.compareObjectProperty({ prop: 1 }, { prop: 1 }, "prop");

		expect(result, "to equal", 0);
	});

	it("Return -1 if obj1 property is small than obj2 property (numeric)", () => {
		const result = propertyHelper.compareObjectProperty({ prop: 1 }, { prop: 2 }, "prop");

		expect(result, "to equal", -1);
	});

	it("Return 1 if obj1 property is bigger than obj2 property (numeric)", () => {
		const result = propertyHelper.compareObjectProperty({ prop: 2 }, { prop: 1 }, "prop");

		expect(result, "to equal", 1);
	});
});

describe("compareObjectPropertyDescending", () => {
	it("Return 0 if both obj are null", () => {
		const result = propertyHelper.compareObjectPropertyDescending(null, null, "prop");

		expect(result, "to equal", 0);
	});

	it("Return 0 if obj1 is null and obj2 does not have property", () => {
		const result = propertyHelper.compareObjectPropertyDescending(null, {}, "prop");

		expect(result, "to equal", 0);
	});

	it("Return 0 if obj1 does not have property and obj1 is null", () => {
		const result = propertyHelper.compareObjectPropertyDescending({}, null, "prop");

		expect(result, "to equal", 0);
	});

	it("Return 0 if both obj does not have property", () => {
		const result = propertyHelper.compareObjectPropertyDescending({}, null, "prop");

		expect(result, "to equal", 0);
	});

	it("Return 0 if both obj have property with null value", () => {
		const result = propertyHelper.compareObjectPropertyDescending({ prop: null }, { prop: null }, "prop");

		expect(result, "to equal", 0);
	});

	it("Return 0 if propertyName is null", () => {
		const result = propertyHelper.compareObjectPropertyDescending({}, {}, null);

		expect(result, "to equal", 0);
	});

	it("Return 0 if propertyName is empty", () => {
		const result = propertyHelper.compareObjectPropertyDescending({}, {}, "");

		expect(result, "to equal", 0);
	});

	it("Return 0 if property has same value (string)", () => {
		const result = propertyHelper.compareObjectPropertyDescending({ prop: "a" }, { prop: "a" }, "prop");

		expect(result, "to equal", 0);
	});

	it("Return -1 if obj1 property is small than obj2 property (string)", () => {
		const result = propertyHelper.compareObjectPropertyDescending({ prop: "a" }, { prop: "b" }, "prop");

		expect(result, "to equal", 1);
	});

	it("Return 1 if obj1 property is bigger than obj2 property (string)", () => {
		const result = propertyHelper.compareObjectPropertyDescending({ prop: "b" }, { prop: "a" }, "prop");

		expect(result, "to equal", -1);
	});

	it("Return 0 if property has same value (numeric)", () => {
		const result = propertyHelper.compareObjectPropertyDescending({ prop: 1 }, { prop: 1 }, "prop");

		expect(result, "to equal", 0);
	});

	it("Return -1 if obj1 property is small than obj2 property (numeric)", () => {
		const result = propertyHelper.compareObjectPropertyDescending({ prop: 1 }, { prop: 2 }, "prop");

		expect(result, "to equal", 1);
	});

	it("Return 1 if obj1 property is bigger than obj2 property (numeric)", () => {
		const result = propertyHelper.compareObjectPropertyDescending({ prop: 2 }, { prop: 1 }, "prop");

		expect(result, "to equal", -1);
	});
});
