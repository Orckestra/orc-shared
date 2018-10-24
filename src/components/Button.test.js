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
			"to render as",
			<button onClick={onClick}>Label</button>,
		));

	it("sets an inactive background-color", () =>
		expect(
			<Button />,
			"to render style rules",
			"to contain",
			"background-color: #f7f7f7;",
		));

	it("sets an active background-color", () =>
		expect(
			<Button active />,
			"to render style rules",
			"to contain",
			"background-color: #efefef;",
		));

	describe("primary", () => {
		it("sets an inactive background gradient", () =>
			expect(
				<Button primary />,
				"to render style rules",
				"to contain",
				"background-image: linear-gradient( #3d3d3d,#333 )",
			));

		it("sets an active background-color", () =>
			expect(
				<Button primary active />,
				"to render style rules",
				"to contain",
				"background-color: #fff;",
			));
	});
});
