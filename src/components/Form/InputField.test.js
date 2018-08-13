import React from "react";
import inputs from "./Inputs";
import Field from "./Field";
import InputField from "./InputField";

describe("InputField", () => {
	it("renders error message if given no type (with console.error)", () =>
		expect(
			<InputField label="A bad field" otherProp />,
			"to render as",
			<p>Cannot render unknown type "undefined"</p>,
		));

	Object.keys(inputs).forEach(type => {
		describe("input type " + type, () => {
			let Input;
			beforeEach(() => {
				Input = inputs[type];
			});

			it("renders a " + type + " input as a form field", () =>
				expect(
					<InputField
						name="fieldName"
						type={type}
						label={`A ${type} field`}
						value="thing"
						otherProp
					/>,
					"to render as",
					<Field id="fieldName" label={`A ${type} field`}>
						<Input id="fieldName" value="thing" otherProp />
					</Field>,
				),
			);

			it("modifies the field name if inside a list", () =>
				expect(
					<InputField
						name="fieldName"
						listIndex={12}
						type={type}
						label={`A ${type} field`}
						value="thing"
						otherProp
					/>,
					"to render as",
					<Field id="fieldName[12]" label={`A ${type} field`}>
						<Input id="fieldName[12]" value="thing" otherProp />
					</Field>,
				));
		});
	});
});
