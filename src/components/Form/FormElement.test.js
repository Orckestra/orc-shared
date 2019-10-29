import React from "react";
import Form from "./FormElement";

describe("Form wrapper", () => {
	it("sets column width based on span and full width", () =>
		expect(
			<Form spanWidth={2} colCount={4} />,
			"to render style rules",
			"to contain",
			"flex-basis: calc( 100% * 0.5 )",
		));

	it("sets default column width", () =>
		expect(
			<Form />,
			"to render style rules",
			"to contain",
			"flex-basis: calc( 100% * 1 )",
		));
});
