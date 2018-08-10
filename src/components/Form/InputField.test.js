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
		it("renders a " + type + " input as a form field", () => {
			const Input = inputs[type];
			return expect(
				<InputField
					type={type}
					label={`A ${type} field`}
					value="thing"
					otherProp
				/>,
				"to render as",
				<Field label={`A ${type} field`}>
					<Input value="thing" otherProp />
				</Field>,
			);
		});
	});
});
