import React from "react";
import ReactDOM from "react-dom";
import sinon from "sinon";
import { IntlProvider } from "react-intl";
import { mount } from "enzyme";
import { ignoreConsoleError } from "../../../utils/testUtils";
import RadioGroupMui from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "./Radio";
import RadioProps from "./RadioProps";

const ValidRadioComponent = radioProps => (
	<IntlProvider locale="en">
		<Radio radioProps={radioProps} />;
	</IntlProvider>
);

const ExpectComponentToBeRenderedProperly = radioProps => {
	const name = radioProps?.get(RadioProps.propNames.name);
	const label = radioProps?.get(RadioProps.propNames.label);
	const defaultVal = radioProps?.get(RadioProps.propNames.defaultVal);
	const value = radioProps?.get(RadioProps.propNames.value) ?? defaultVal;
	const row = radioProps?.get(RadioProps.propNames.row);
	const radios = radioProps?.get(RadioProps.propNames.radios) ?? [];

	const component = ValidRadioComponent(radioProps);
	const mountedComponent = mount(component);

	const formControl = mountedComponent.find(FormControl);
	const formControlElement = formControl.getElements()[0];
	expect(formControlElement, "not to be", null);

	const formLabelElement = formControl.find(FormLabel).getElements()[0];
	expect(formLabelElement, "not to be", null);
	expect(formLabelElement.props.children, "to be", label?.id ? label?.defaultMessage ?? null : label);

	const radioGroup = formControl.find(RadioGroupMui);
	const radioGroupElement =
		radioGroup
			.getElements()
			.find(
				x =>
					x.props &&
					x.props["aria-label"] === name &&
					x.props.name === name &&
					x.props.defaultValue === defaultVal &&
					x.props.value === value &&
					x.props.row === row,
			) || null;
	expect(radioGroupElement, "not to be", null);

	const radioElements = radioGroup.find(FormControlLabel).getElements();
	expect(radioElements.length, "to equal", radios.length);

	radios.forEach(radio => {
		let option =
			radioElements.find(x =>
				x.props &&
				x.props.control.type.options.name === "MuiRadio" &&
				x.props.name === radio.name &&
				x.props.value === radio.value &&
				x.props.label === radio.label?.id
					? radio.label?.defaultMessage ?? null
					: radio.label,
			) || null;
		expect(option, "not to be", null);
	});
};

const ExpectEventToBeFiredWithValue = (radioProps, event, option) => {
	const component = ValidRadioComponent(radioProps);

	let container = document.createElement("div");
	document.body.appendChild(container);
	ReactDOM.render(component, container);

	const click = document.createEvent("MouseEvents");
	click.initEvent("click", true, false);

	let element = container.querySelector(`span.MuiIconButton-label input[value='${option}']`);
	element.dispatchEvent(click);
	expect(event, "to have calls satisfying", [{ args: [option] }]);
};

describe("Radio Component", () => {
	let radios = [
		{ label: { id: "radio.option1", defaultMessage: "Option 1 translated" }, value: "option1", name: "option1" },
		{ label: { id: "radio.option2", defaultMessage: "Option 2 translated" }, value: "option2", name: "option2" },
		{ label: { id: "radio.option3", defaultMessage: "Option 3 translated" }, value: "option3", name: "option3" },
	];

	let radioProps;
	beforeEach(() => {
		radioProps = new RadioProps();
		radioProps.set(RadioProps.propNames.name, "aRadioName");
		radioProps.set(RadioProps.propNames.defaultVal, "option1");
		radioProps.set(RadioProps.propNames.value, "option2");
		radioProps.set(RadioProps.propNames.radios, radios);
		radioProps.set(RadioProps.propNames.row, true);
	});

	it("Fails if radioProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = <Radio radioProps="Wrong type" />;
			expect(() => mount(component), "to throw a", TypeError);
		});
	});

	it("fails on attempt to translate intl message outside an IntlProvider", () => {
		ignoreConsoleError(() => {
			const component = <Radio radioProps={radioProps} />;
			expect(() => mount(component), "to throw a", Error);
		});
	});

	it("Fails if less than two options", () => {
		ignoreConsoleError(() => {
			radioProps.set(RadioProps.propNames.radios, [{ label: "Option 1", value: "option1", name: "option1" }]);

			const component = ValidRadioComponent(radioProps);
			expect(() => mount(component), "to throw a", Error);
		});
	});

	it("Fails if no corresponding option for value", () => {
		ignoreConsoleError(() => {
			radioProps.set(RadioProps.propNames.value, "option99");

			const component = ValidRadioComponent(radioProps);
			expect(() => mount(component), "to throw a", Error);
		});
	});

	it("Fails if no corresponding option for default value", () => {
		ignoreConsoleError(() => {
			radioProps.set(RadioProps.propNames.defaultVal, "option99");

			const component = ValidRadioComponent(radioProps);
			expect(() => mount(component), "to throw a", Error);
		});
	});

	it("Renders Radio component properly with translation", () => {
		radioProps.set(RadioProps.propNames.label, { id: "toolbar.radio", defaultMessage: "aRadioLabel translated" });
		ExpectComponentToBeRenderedProperly(radioProps);
	});

	it("Renders Radio component properly without translation", () => {
		radioProps.set(RadioProps.propNames.label, "some label without translation");
		radioProps.set(RadioProps.propNames.radios, [
			{ label: "option 1 without translation", value: "option1", name: "option1" },
			{ label: "option 2 without translation", value: "option2", name: "option2" },
			{ label: "option 3 without translation", value: "option3", name: "option3" },
		]);

		ExpectComponentToBeRenderedProperly(radioProps);
	});

	it("Renders Radio component properly without label", () => {
		radioProps.set(RadioProps.propNames.label, null);
		ExpectComponentToBeRenderedProperly(radioProps);
	});

	it("Radio component handles option change", async () => {
		let update = sinon.spy().named("update");
		radioProps.set(RadioProps.propNames.update, update);

		ExpectEventToBeFiredWithValue(radioProps, update, "option3");
	});

	it("Radio component handles options clickEvent", async () => {
		let clickEvent = sinon.spy().named("clickEvent");
		radioProps.set(RadioProps.propNames.radios, [
			{ label: "Option 1", value: "option1", name: "option1" },
			{ label: "Option 2", value: "option2", name: "option2", clickEvent: clickEvent },
			{ label: "Option 3", value: "option3", name: "option3" },
		]);

		ExpectEventToBeFiredWithValue(radioProps, clickEvent, "option2");
	});
});
