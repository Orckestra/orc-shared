import React from "react";
import Form from "./FormElement";

describe("Form wrapper", () => {
	it("wraps children around", () =>
		expect(
			<Form />,
			"to render style rules",
			"to contain",
			"flex-wrap: wrap;",
		));

	it("sets height according to parameter", () =>
		expect(
			<Form h={325} />,
			"to render style rules",
			"to contain",
			"height: 345px;",
		));

	it("does not wrap or set height when flagged as wide", () =>
		expect(<Form wide />, "to render style rules").then(styles =>
			expect(styles, "not to contain", "flex-wrap").and(
				"not to contain",
				"height",
			),
		));
});
