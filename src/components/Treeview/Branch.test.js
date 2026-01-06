import React from "react";
import { createMuiTheme, TestWrapper } from "../../utils/testUtils";
import { Branch, Wrapper } from "./Branch";

describe("Branch", () => {
	const theme = createMuiTheme();

	it("renders a <ul>", () => expect(<Branch />, "when mounted", "to satisfy", <ul />));

	it("sets styling for showing a branch structure", () =>
		expect(
			<Branch />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "margin-left: 14px;")
				.and("to contain", "padding-left: 15px;")
				.and("to match", /:last-child::after {[^}]*left: -31px;[^}]*}/)
				.and("to match", /:last-child::after {[^}]*top: -20px;[^}]*}/),
		));

	it("sets styling for a dark theme", () =>
		expect(
			<TestWrapper muiThemeProvider={{ theme }}>
				<Branch dark />
			</TestWrapper>,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to match", /:last-child::after {[^}]*background-color: #333;[^}]*}/),
		));
});

describe("Wrapper", () => {
	it("renders a <ul>", () => expect(<Wrapper />, "when mounted", "to satisfy", <ul />));

	it("sets styling for showing the root of a tree structure", () =>
		expect(
			<Wrapper />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "margin-left: 0;")
				.and("to contain", "padding: 10px;")
				.and("to contain", "{margin-left: 21px;}"),
		));
});
