import React from "react";
import inputs from "./Inputs";
import Field from "./Field";
import InputField, { Null } from "./InputField";

const {
	TextInput,
	EmailInput,
	DateInput,
	TimeInput,
	NumberInput,
	CheckboxInput,
	SwitchInput,
	ReadOnly,
	LineLabel,
	SmallButton,
	Selector,
	TranslationInput,
} = inputs;

describe("InputField", () => {
	it("renders a null field if given no type", () =>
		expect(
			<InputField label="A bad field" otherProp />,
			"to render as",
			<p>Cannot render unknown type "undefined"</p>,
		));

	it("renders a TextInput input as a form field", () =>
		expect(
			<InputField
				type="TextInput"
				label="A TextInput field"
				value="thing"
				otherProp
			/>,
			"to render as",
			<Field label="A TextInput field">
				<TextInput value="thing" otherProp />
			</Field>,
		));

	it("renders a EmailInput input as a form field", () =>
		expect(
			<InputField
				type="EmailInput"
				label="A EmailInput field"
				value="thing"
				otherProp
			/>,
			"to render as",
			<Field label="A EmailInput field">
				<EmailInput value="thing" otherProp />
			</Field>,
		));

	it("renders a DateInput input as a form field", () =>
		expect(
			<InputField
				type="DateInput"
				label="A DateInput field"
				value="thing"
				otherProp
			/>,
			"to render as",
			<Field label="A DateInput field">
				<DateInput value="thing" otherProp />
			</Field>,
		));

	it("renders a TimeInput input as a form field", () =>
		expect(
			<InputField
				type="TimeInput"
				label="A TimeInput field"
				value="thing"
				otherProp
			/>,
			"to render as",
			<Field label="A TimeInput field">
				<TimeInput value="thing" otherProp />
			</Field>,
		));

	it("renders a NumberInput input as a form field", () =>
		expect(
			<InputField
				type="NumberInput"
				label="A NumberInput field"
				value="thing"
				otherProp
			/>,
			"to render as",
			<Field label="A NumberInput field">
				<NumberInput value="thing" otherProp />
			</Field>,
		));

	it("renders a CheckboxInput input as a form field", () =>
		expect(
			<InputField
				type="CheckboxInput"
				label="A CheckboxInput field"
				value="thing"
				otherProp
			/>,
			"to render as",
			<Field label="A CheckboxInput field">
				<CheckboxInput value="thing" otherProp />
			</Field>,
		));

	it("renders a SwitchInput input as a form field", () =>
		expect(
			<InputField
				type="SwitchInput"
				label="A SwitchInput field"
				value="thing"
				otherProp
			/>,
			"to render as",
			<Field label="A SwitchInput field">
				<SwitchInput value="thing" otherProp />
			</Field>,
		));

	it("renders a ReadOnly input as a form field", () =>
		expect(
			<InputField
				type="ReadOnly"
				label="A ReadOnly field"
				value="thing"
				otherProp
			/>,
			"to render as",
			<Field label="A ReadOnly field">
				<ReadOnly value="thing" otherProp />
			</Field>,
		));

	it("renders a LineLabel input as a form field", () =>
		expect(
			<InputField
				type="LineLabel"
				label="A LineLabel field"
				value="thing"
				otherProp
			/>,
			"to render as",
			<Field label="A LineLabel field">
				<LineLabel value="thing" otherProp />
			</Field>,
		));

	it("renders a SmallButton input as a form field", () =>
		expect(
			<InputField
				type="SmallButton"
				label="A SmallButton field"
				value="thing"
				otherProp
			/>,
			"to render as",
			<Field label="A SmallButton field">
				<SmallButton value="thing" otherProp />
			</Field>,
		));

	it("renders a Selector input as a form field", () =>
		expect(
			<InputField
				type="Selector"
				label="A Selector field"
				value="thing"
				otherProp
			/>,
			"to render as",
			<Field label="A Selector field">
				<Selector value="thing" otherProp />
			</Field>,
		));

	it("renders a TranslationInput input as a form field", () =>
		expect(
			<InputField
				type="TranslationInput"
				label="A TranslationInput field"
				value="thing"
				otherProp
			/>,
			"to render as",
			<Field label="A TranslationInput field">
				<TranslationInput value="thing" otherProp />
			</Field>,
		));
});
