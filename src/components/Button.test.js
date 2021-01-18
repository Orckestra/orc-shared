import React from "react";
import Button from "./Button";

describe("Button", () => {
	let onClick;
	beforeEach(() => {
		onClick = () => {};
	});

	it("renders a button", () =>
		expect(
			<Button onClick={onClick}>Label</Button>,
			"when mounted",
			"to satisfy",
			<button onClick={onClick}>Label</button>,
		));

	it("sets an inactive background-color", () =>
		expect(<Button />, "when mounted", "to have style rules satisfying", "to contain", "background-color: #f7f7f7;"));

	it("sets an active background-color", () =>
		expect(
			<Button active />,
			"when mounted",
			"to have style rules satisfying",
			"to contain",
			"background-color: #efefef;",
		));

	describe("primary", () => {
		it("sets an inactive background gradient", () =>
			expect(
				<Button primary />,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"background-color: #fff;",
			));

		it("sets an active background-color", () =>
			expect(
				<Button primary active />,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"background-image: linear-gradient( #3d3d3d,#333 )",
			));
	});
});
