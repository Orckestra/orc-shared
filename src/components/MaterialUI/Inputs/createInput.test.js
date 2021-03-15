import React from "react";
import { createInput, inputTypes } from "./createInput";
import {
	InputBase,
	Checkbox,
	Radio,
	Select,
	StandaloneRadio,
	Switch,
	InputBaseProps,
	CheckboxProps,
	RadioProps,
	SelectProps,
	StandaloneRadioProps,
	SwitchProps,
} from "./index";
import { TestWrapper, createMuiTheme } from "./../../../utils/testUtils";

describe("createInput", () => {
	const theme = createMuiTheme();

	it("Creates InputBase correctly", () => {
		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				{createInput(inputTypes.inputBase, { value: "test" })}
			</TestWrapper>
		);

		const inputBaseProps = new InputBaseProps();
		inputBaseProps.set(InputBaseProps.propNames.value, "test");

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<InputBase inputProps={inputBaseProps} />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Creates Checkbox correctly", () => {
		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				{createInput(inputTypes.checkbox, { value: true })}
			</TestWrapper>
		);

		const checkboxProps = new CheckboxProps();
		checkboxProps.set(CheckboxProps.propNames.value, true);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Checkbox checkboxProps={checkboxProps} />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Creates Radio correctly", () => {
		const radios = [
			{
				label: "label1",
				value: "value1",
			},
			{
				label: "label2",
				value: "value2",
			},
		];

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				{createInput(inputTypes.radio, { value: radios[0].value, radios, name: "TestGroup" })}
			</TestWrapper>
		);

		const radioProps = new RadioProps();
		radioProps.set(RadioProps.propNames.value, radios[0].value);
		radioProps.set(RadioProps.propNames.radios, radios);
		radioProps.set(RadioProps.propNames.name, "TestGroup");

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Radio radioProps={radioProps} />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Creates Select correctly", () => {
		const options = [
			{
				value: "Value1",
				label: "Label1",
			},
			{
				value: "Value2",
				label: "Label2",
			},
		];

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				{createInput(inputTypes.select, { value: options[0].value, options, root: "root-Style" })}
			</TestWrapper>
		);

		const selectProps = new SelectProps();
		selectProps.set(SelectProps.propNames.value, options[0].value);
		selectProps.setStyle(SelectProps.ruleNames.root, "root-Style");

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Select options={options} selectProps={selectProps} />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Creates StandaloneRadio correctly", () => {
		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				{createInput(inputTypes.standaloneRadio, { value: "Test", checked: true })}
			</TestWrapper>
		);

		const standaloneRadioProps = new StandaloneRadioProps();
		standaloneRadioProps.set(StandaloneRadioProps.propNames.value, "Test");
		standaloneRadioProps.set(StandaloneRadioProps.propNames.checked, true);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<StandaloneRadio radioProps={standaloneRadioProps} />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Creates Switch correctly", () => {
		const component = (
			<TestWrapper intlProvider stylesProvider muiThemeProvider={{ theme }}>
				{createInput(inputTypes.switch, { value: true })}
			</TestWrapper>
		);

		const switchProps = new SwitchProps();
		switchProps.set(SwitchProps.propNames.value, true);

		const expected = (
			<TestWrapper intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<Switch switchProps={switchProps} />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});
});
