import React from "react";
import { Dialog } from "./Dialog";

describe("Dialog", () => {
	it("renders a dialog with a default look", () =>
		expect(
			<Dialog />,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to contain", "background-color: white;"),
		));

	it("renders a dialog with dark look", () =>
		expect(
			<Dialog look="dark" />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "background-color: #333333;")
				.and("to contain", "border-radius: 15px;"),
		));
});
