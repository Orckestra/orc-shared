import {
	parseGuid,
	concatObjectPropsWithDelimeter,
	getAllAfterPrependHref,
	getModuleNameFromHref,
	stringifyWithoutQuotes,
} from "./parseHelper";

describe("parseGuid", () => {
	it("Retrieves parsed guid if passed string is correct guid", () => {
		const guid = "9d447e3eb6f14082b1847a1b1854e78f";

		const parsedGuid = parseGuid(guid);

		const expectedParsedGuid = "9d447e3e-b6f1-4082-b184-7a1b1854e78f";

		expect(parsedGuid, "to be", expectedParsedGuid);
	});

	it("Retrieves empty string if passed string is not correct guid", () => {
		const guid = "Not guid";

		const parsedGuid = parseGuid(guid);

		expect(parsedGuid, "to be", "");
	});
});

describe("concatObjectPropsWithDelimeter", () => {
	it("Retrieves correct string when all used props exists in passed object", () => {
		const object = {
			prop1: "Test Prop 1",
			prop2: "Test Prop 2",
			prop3: "Test Prop 3",
		};

		const propsToUse = ["prop1", "prop2", "prop3"];

		const concatedString = concatObjectPropsWithDelimeter(object, propsToUse);

		expect(concatedString, "to equal", "Test Prop 1, Test Prop 2, Test Prop 3");
	});

	it("Retrieves correct string when  not all used props exists in passed object", () => {
		const object = {
			prop1: "Test Prop 1",
			prop3: "Test Prop 3",
		};

		const propsToUse = ["prop1", "prop2", "prop3"];

		const concatedString = concatObjectPropsWithDelimeter(object, propsToUse);

		expect(concatedString, "to equal", "Test Prop 1, Test Prop 3");
	});

	it("Retrieves correct string when delimeter is passed and spaces not used", () => {
		const object = {
			prop1: "Test Prop 1",
			prop2: "Test Prop 2",
			prop3: "Test Prop 3",
		};

		const propsToUse = ["prop1", "prop2", "prop3"];

		const concatedString = concatObjectPropsWithDelimeter(object, propsToUse, "_", false);

		expect(concatedString, "to equal", "Test Prop 1_Test Prop 2_Test Prop 3");
	});

	it("Retrieves correct string when delimeter is not defined", () => {
		const object = {
			prop1: "Test Prop 1",
			prop2: "Test Prop 2",
			prop3: "Test Prop 3",
		};

		const propsToUse = ["prop1", "prop2", "prop3"];

		const concatedString = concatObjectPropsWithDelimeter(object, propsToUse, undefined);

		expect(concatedString, "to equal", "Test Prop 1, Test Prop 2, Test Prop 3");
	});

	it("Retrieves correct string when delimeter is null", () => {
		const object = {
			prop1: "Test Prop 1",
			prop2: "Test Prop 2",
			prop3: "Test Prop 3",
		};

		const propsToUse = ["prop1", "prop2", "prop3"];

		const concatedString = concatObjectPropsWithDelimeter(object, propsToUse, null);

		expect(concatedString, "to equal", "Test Prop 1 Test Prop 2 Test Prop 3");
	});
});

describe("getAllAfterPrependHref", () => {
	it("Get all after prepend href ", () => {
		const href = "/test/test2/test3";
		const prependHref = "/test/";

		const result = getAllAfterPrependHref(prependHref, href);

		const expectedResult = "test2/test3";

		expect(result, "to be", expectedResult);
	});

	it("Retrieves empty string if href not valid", () => {
		const href = "/testHref";
		const prependHref = "/test/";

		const result = getAllAfterPrependHref(prependHref, href);

		expect(result, "to be", "");
	});

	it("Retrieves all string if prependHref not valid", () => {
		const href = "/testHref";
		const prependHref = undefined;

		const result = getAllAfterPrependHref(prependHref, href);

		expect(result, "to be", "/testHref");
	});
});

describe("getModuleNameFromHref", () => {
	it("Get module name and href to module from href ", () => {
		const href = "/test/test2/test3";
		const prependHref = "/test/";

		const [moduleName, moduleHref] = getModuleNameFromHref(prependHref, href);

		const expectedModuleName = "test2";
		const expectedModuleHref = "/test/test2";

		expect(moduleName, "to be", expectedModuleName);
		expect(moduleHref, "to be", expectedModuleHref);
	});

	it("Retrieves empty strings if href not valid", () => {
		const href = "/testHref";
		const prependHref = "/test/";

		const [moduleName, moduleHref] = getModuleNameFromHref(prependHref, href);

		expect(moduleName, "to be", "");
		expect(moduleHref, "to be", "");
	});

	it("Retrieves empty strings if prependHref not valid", () => {
		const href = "/test/test2/test3";
		const prependHref = undefined;

		const [moduleName, moduleHref] = getModuleNameFromHref(prependHref, href);

		expect(moduleName, "to be", "");
		expect(moduleHref, "to be", "");
	});
});

describe("stringifyWithoutQuotes", () => {
	it("Removes quotes", () => {
		const value = "asd";

		const obj = { a: value };

		const stringifiedObj = stringifyWithoutQuotes(obj);

		const expected = "{a:asd}";

		expect(stringifiedObj, "to equal", expected);
	});
});
