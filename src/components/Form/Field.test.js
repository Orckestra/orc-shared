import React from "react";
import Text from "../Text";
import Field, { FieldBox, Label, RequiredNotice } from "./Field";

describe("Field", () => {
	it("renders a field with a label", () =>
		expect(
			<Field id="field" label="A test">
				<div id="child" />
			</Field>,
			"to exactly render as",
			<FieldBox>
				<Label htmlFor="field" id="field_label">
					<Text message="A test" />
				</Label>
				<div id="child" />
			</FieldBox>,
		));

	it("renders a required field with a label", () =>
		expect(
			<Field id="field" label="A test" required="Required">
				<div id="child" />
			</Field>,
			"to exactly render as",
			<FieldBox>
				<Label htmlFor="field" id="field_label" required>
					<Text message="A test" />
				</Label>
				<div id="child" />
			</FieldBox>,
		));

	it("renders a missing required field with a label", () =>
		expect(
			<Field id="field" label="A test" required="Required" invalid>
				<div id="child" />
			</Field>,
			"to exactly render as",
			<FieldBox>
				<Label htmlFor="field" id="field_label" required invalid>
					<Text message="A test" />
				</Label>
				<div id="child" />
				<RequiredNotice>
					<Text message="Required" />
				</RequiredNotice>
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
			<Field id="field" label="A test" labelOnly required="Required">
				<div id="child" />
			</Field>,
			"to exactly render as",
			<FieldBox>
				<Label labelOnly id="field_label" required>
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
				<Label htmlFor="field" center id="field_label">
					<Text message="A test" />
				</Label>
				<div id="child" />
			</FieldBox>,
		));
});

describe("Label", () => {
	it("renders a mark on required labels", () =>
		expect(
			<Label required>A text</Label>,
			"to render style rules",
			"to contain",
			'::after {content: " *";',
		));

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
