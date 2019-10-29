import React from "react";
import Form from "./FormElement";

describe("Form wrapper", () => {
	it("sets column width based on given span width", () =>
		expect(
			<Form spanWidth={2} />,
			"to render style rules",
			"to contain",
			"flex-grow: 2",
		));

	it("sets default column width", () =>
		expect(<Form />, "to render style rules", "to contain", "flex-grow: 1"));
});
