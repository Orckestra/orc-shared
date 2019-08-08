import React from "react";
import inputs from "./Inputs";
import Field from "./Field";
import { InputField } from "./InputField";

describe("InputField", () => {
	it("renders error message if given no type (with console.error)", () =>
		expect(
			<InputField label="A bad field" otherProp />,
			"to render as",
			<p>Cannot render unknown type "undefined"</p>,
		));

	Object.keys(inputs).forEach(type => {
		describe("input type " + type, () => {
			let Input, intl, val, emptyVal;
			beforeEach(() => {
				Input = inputs[type];
				intl = {
					formatMessage: message => message.defaultMessage,
				};
				if (type === "MultiSelector") {
					val = ["thing"];
					emptyVal = [];
				} else {
					val = "thing";
					emptyVal = "";
				}
			});

			it("renders a " + type + " input as a form field", () =>
				expect(
					<InputField
						intl={intl}
						name="fieldName"
						type={type}
						label={`A ${type} field`}
						value={val}
						placeholder={{ id: "foo.bar", defaultMessage: "Placeholder" }}
						otherProp
					/>,
					"to render as",
					<Field id="fieldName" label={`A ${type} field`}>
						<Input
							id="fieldName"
							value={val}
							otherProp
							placeholder="Placeholder"
						/>
					</Field>,
				),
			);

			it("renders a required field", () =>
				expect(
					<InputField
						intl={intl}
						name="fieldName"
						type={type}
						label={`A ${type} field`}
						value={val}
						placeholder={{ id: "foo.bar", defaultMessage: "Placeholder" }}
						required={`A ${type} field is a required field`}
						wasBlurred
						otherProp
					/>,
					"to render as",
					<Field
						id="fieldName"
						label={`A ${type} field`}
						required={`A ${type} field is a required field`}
					>
						<Input
							id="fieldName"
							value={val}
							otherProp
							placeholder="Placeholder"
						/>
					</Field>,
				));

			it("renders a required and empty field", () =>
				expect(
					<InputField
						intl={intl}
						name="fieldName"
						type={type}
						label={`A ${type} field`}
						value={emptyVal}
						placeholder={{ id: "foo.bar", defaultMessage: "Placeholder" }}
						required={`A ${type} field is a required field`}
						wasBlurred
						otherProp
					/>,
					"to render as",
					<Field
						id="fieldName"
						label={`A ${type} field`}
						required={`A ${type} field is a required field`}
						invalid
					>
						<Input
							id="fieldName"
							value={emptyVal}
							otherProp
							placeholder="Placeholder"
							required
						/>
					</Field>,
				));

			it("modifies the field name if inside a list", () =>
				expect(
					<InputField
						intl={intl}
						name="fieldName"
						listIndex={12}
						type={type}
						label={`A ${type} field`}
						value={val}
						otherProp
					/>,
					"to render as",
					<Field id="fieldName[12]" label={`A ${type} field`}>
						<Input id="fieldName[12]" value={val} otherProp />
					</Field>,
				));
		});
	});
});
