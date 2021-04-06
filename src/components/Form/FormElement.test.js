import React from "react";
import Form from "./FormElement";

describe("Form wrapper", () => {
	it("sets column width based on given span width", () =>
		expect(<Form spanWidth={2} />, "when mounted", "to have style rules satisfying", "to contain", "flex-grow: 2"));

	it("sets default column width", () =>
		expect(<Form />, "when mounted", "to have style rules satisfying", "to contain", "flex-grow: 1"));
});
