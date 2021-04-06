import {
	isString,
	isObject,
	isStringNullOrWhitespace,
	isReactComponent,
	isPropertyBagAttribute,
} from "./propertyValidator";
import React from "react";

describe("isString", () => {
	it("Retrives true when passed value is string", () => {
		const value = "string";

		expect(isString(value), "to be true");
	});

	it("Retrives false when passed value is not a string", () => {
		const value = ["string"];

		expect(isString(value), "to be false");
	});
});

describe("isObject", () => {
	it("Retrives true when passed value is object", () => {
		const value = { key: "value" };

		expect(isObject(value), "to be true");

		expect(isObject(null), "to be true");
	});

	it("Retrives false when passed value is not an object", () => {
		const value = ["not object"];

		expect(isString(value), "to be false");
	});
});

describe("isStringNullOrWhitespace", () => {
	it("Retrieves true if passed string is undefined", () => {
		const result = isStringNullOrWhitespace();

		expect(result, "to be true");
	});

	it("Retrieves true if passed string is whitespace", () => {
		const string = "               ";
		const result = isStringNullOrWhitespace(string);

		expect(result, "to be true");
	});

	it("Retrieves false if passed string is not null or whitespace", () => {
		const string = "       15        ";
		const result = isStringNullOrWhitespace(string);

		expect(result, "to be false");
	});
});

describe("isReactComponent", () => {
	it("Retrives true when passed value is react component", () => {
		const reactComponent = <p>component</p>;
		const FunctionalComponent = () => <p>functional component</p>;

		expect(isReactComponent(reactComponent), "to be true");

		expect(isReactComponent(<FunctionalComponent />), "to be true");
	});

	it("Retrives false when passed value is not react component", () => {
		const notReactComponent = { key: "value" };

		expect(isReactComponent(null), "to be false");

		expect(isReactComponent(notReactComponent), "to be false");
	});
});

describe("isPropertyBagAttribute", () => {
	it("Retrives true when passed value is Attribute", () => {
		const value = { value: "value", __type: "ValueOfInt32" };

		expect(isPropertyBagAttribute(value), "to be true");
	});

	it("Retrives false when passed value is not an Attribute", () => {
		const value = ["not attribute"];

		expect(isPropertyBagAttribute(value), "to be false");
	});
});
