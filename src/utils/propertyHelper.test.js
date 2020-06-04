import React from "react";
import * as propertyHelper from "./propertyHelper";

describe("<propertyHelper.getPropertyOrDefault>", () => {
	it("get property value", () => {
		expect(
			propertyHelper.getPropertyOrDefault({ prop1: 123 }, "prop1", "XYZ"),
			"to equal",
			123,
		);
	});

	it("get default property value", () => {
		expect(
			propertyHelper.getPropertyOrDefault({ prop1: 123 }, "prop2", "XYZ"),
			"to equal",
			"XYZ",
		);
	});

	it("get default property value when obj is undefined", () => {
		expect(
			propertyHelper.getPropertyOrDefault(undefined, "prop2", "XYZ"),
			"to equal",
			"XYZ",
		);
	});

	it("get default property value when obj is null", () => {
		expect(propertyHelper.getPropertyOrDefault(null, "prop2", "XYZ"), "to equal", "XYZ");
	});

	it("get property value ignoring case", () => {
		expect(
			propertyHelper.getPropertyOrDefault({ prop1: 123 }, "pRoP1", "XYZ", true),
			"to equal",
			123,
		);
	});

	it("get property default value ignoring case", () => {
		expect(
			propertyHelper.getPropertyOrDefault({ prop1: 123 }, "pRoP2", "XYZ", true),
			"to equal",
			"XYZ",
		);
	});

	it("get property value starting with", () => {
		expect(
			propertyHelper.getPropertyOrDefault({ prop1: 123 }, "pRo", "XYZ", false, true),
			"to equal",
			123,
		);
	});

	it("get property default value starting with", () => {
		expect(
			propertyHelper.getPropertyOrDefault({ prop1: 123 }, "pR1", "XYZ", false, true),
			"to equal",
			"XYZ",
		);
	});

	it("get property value starting with", () => {
		expect(
			propertyHelper.getPropertyOrDefault(null, "pRo", "XYZ", false, true),
			"to equal",
			"XYZ",
		);
	});

	it("get property default value starting with", () => {
		expect(
			propertyHelper.getPropertyOrDefault(undefined, "pR1", "XYZ", false, true),
			"to equal",
			"XYZ",
		);
	});
});
