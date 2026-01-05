import React from "react";
import { createMuiTheme, TestWrapper } from "../../utils/testUtils";
import { Root, Leaf } from "./Leaf";

describe("Root", () => {
	it("renders a <li>", () => expect(<Root />, "when mounted", "to satisfy", <li />));
});

describe("Leaf", () => {
	const theme = createMuiTheme();

	it("renders a <li>", () => expect(<Leaf />, "when mounted", "to satisfy", <li />));

	it("sets styling for a branch structure", () =>
		expect(
			<Leaf />,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to match", /:last-child::after {[^}]*left: -16px;[^}]*}/),
		));

	it("sets styling for a dark theme", () =>
		expect(
			<TestWrapper muiThemeProvider={{ theme }}>
				<Leaf dark />
			</TestWrapper>,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to match", /:last-child::after {[^}]*background-color: #333;[^}]*}/),
		));
});
