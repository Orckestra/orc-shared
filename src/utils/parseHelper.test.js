import { parseGuid, concatObjectPropsWithDelimeter } from "./parseHelper";

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
		}

		const propsToUse = ["prop1", "prop2", "prop3"]

		const concatedString = concatObjectPropsWithDelimeter(object, propsToUse);

		expect(concatedString, "to equal", "Test Prop 1, Test Prop 2, Test Prop 3");
	});

	it("Retrieves correct string when  not all used props exists in passed object", () => {
		const object = {
			prop1: "Test Prop 1",
			prop3: "Test Prop 3",
		}

		const propsToUse = ["prop1", "prop2", "prop3"]

		const concatedString = concatObjectPropsWithDelimeter(object, propsToUse);

		expect(concatedString, "to equal", "Test Prop 1, Test Prop 3");
	});

	it("Retrieves correct string when delimeter is passed and spaces not used", () => {
		const object = {
			prop1: "Test Prop 1",
			prop2: "Test Prop 2",
			prop3: "Test Prop 3",
		}

		const propsToUse = ["prop1", "prop2", "prop3"]

		const concatedString = concatObjectPropsWithDelimeter(object, propsToUse, "_", false);

		expect(concatedString, "to equal", "Test Prop 1_Test Prop 2_Test Prop 3");
	});

	it("Retrieves correct string when delimeter is not defined", () => {
		const object = {
			prop1: "Test Prop 1",
			prop2: "Test Prop 2",
			prop3: "Test Prop 3",
		}

		const propsToUse = ["prop1", "prop2", "prop3"]

		const concatedString = concatObjectPropsWithDelimeter(object, propsToUse, undefined);

		expect(concatedString, "to equal", "Test Prop 1, Test Prop 2, Test Prop 3");
	});

	it("Retrieves correct string when delimeter is null", () => {
		const object = {
			prop1: "Test Prop 1",
			prop2: "Test Prop 2",
			prop3: "Test Prop 3",
		}

		const propsToUse = ["prop1", "prop2", "prop3"]

		const concatedString = concatObjectPropsWithDelimeter(object, propsToUse, null);

		expect(concatedString, "to equal", "Test Prop 1 Test Prop 2 Test Prop 3");
	});
});
