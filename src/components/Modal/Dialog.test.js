import React from "react";
import { Dialog } from "./Dialog";

describe("Dialog", () => {
	it("renders a dialog with a default look", () =>
		expect(<Dialog />, "to render style rules").then(styles =>
			expect(styles, "to contain", "background-color: white;"),
		));

	it("renders a dialog with dark look", () =>
		expect(<Dialog look="dark" />, "to render style rules").then(styles =>
			expect(styles, "to contain", "background-color: #333;").and(
				"to contain",
				"border-radius: 15px;",
			),
		));
});
