import React from "react";
import Text from "../Text";
import Field, { FieldBox, Label } from "./Field";

describe("Field", () => {
	it("renders a field with a label", () =>
		expect(
			<Field id="field" label="A test">
				<div id="child" />
			</Field>,
			"to exactly render as",
			<FieldBox>
				<Label htmlFor="field">
					<Text message="A test" />
				</Label>
				<div id="child" />
			</FieldBox>,
		));

	it("renders a field with no label", () =>
		expect(
			<Field id="field">
				<div id="child" />
			</Field>,
			"to exactly render as",
			<FieldBox>
				<div id="child" />
			</FieldBox>,
		));

	it("renders only its label when flagged", () =>
		expect(
			<Field id="field" label="A test" labelOnly>
				<div id="child" />
			</Field>,
			"to exactly render as",
			<FieldBox>
				<Label labelOnly>
					<Text message="A test" />
				</Label>
			</FieldBox>,
		));

	it("renders a field with a centered label", () =>
		expect(
			<Field id="field" label="A test" center>
				<div id="child" />
			</Field>,
			"to exactly render as",
			<FieldBox>
				<Label htmlFor="field" center>
					<Text message="A test" />
				</Label>
				<div id="child" />
			</FieldBox>,
		));
});

describe("Label", () => {
	it("when not flagged renders a label with bottom margin", () =>
		expect(
			<Label>A text</Label>,
			"to render style rules",
			"to contain",
			"margin-bottom:",
		));

	it("when flagged renders a label without margin", () =>
		expect(
			<Label labelOnly>A text</Label>,
			"to render style rules",
			"not to contain",
			"margin-bottom",
		));
});
