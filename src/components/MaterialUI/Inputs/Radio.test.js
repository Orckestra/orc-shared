import React from "react";
import ReactDOM from "react-dom";
import sinon from "sinon";
import { mount } from "enzyme";
import { ignoreConsoleError } from "../../../utils/testUtils";
import RadioGroupMui from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "./Radio";
import RadioProps from "./RadioProps";

const ExpectComponentToBeRenderedProperly = radioProps => {
	const component = <Radio radioProps={radioProps} />;
	const mountedComponent = mount(component);

	const name = radioProps?.get(RadioProps.propNames.name);
	const label = radioProps?.get(RadioProps.propNames.label);
	const defaultVal = radioProps?.get(RadioProps.propNames.defaultVal);
	const value = radioProps?.get(RadioProps.propNames.value) ?? defaultVal;
	const row = radioProps?.get(RadioProps.propNames.row);
	const radios = radioProps?.get(RadioProps.propNames.radios) ?? [];

	const formControl = mountedComponent.find(FormControl);
	const formControlElement = formControl.getElements()[0];
	expect(formControlElement, "not to be", null);

	const formLabelElement = formControl.find(FormLabel).getElements()[0];
	expect(formLabelElement, "not to be", null);
	expect(formLabelElement.props.children, "to be", label);

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
			radioElements.find(
				x =>
					x.key === `radiobutton_${radio.value}` &&
					x.props &&
					x.props.control.type.options.name === "MuiRadio" &&
					x.props.name === radio.value &&
					x.props.value === radio.value &&
					x.props.label === radio.label,
			) || null;
		expect(option, "not to be", null);
	});
};

const ExpectEventToBeFiredWithOptionValue = (radioProps, event, option) => {
	const component = <Radio radioProps={radioProps} />;

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
	let radios, radioProps;
	beforeEach(() => {
		radios = [
			{ label: "Option 1", value: "option1" },
			{ label: "Option 2", value: "option2" },
			{ label: "Option 3", value: "option3" },
		];

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

	it("Fails if less than two options", () => {
		ignoreConsoleError(() => {
			radioProps.set(RadioProps.propNames.radios, [{ label: "Option 1", value: "option1" }]);

			const component = <Radio radioProps={radioProps} />;
			expect(() => mount(component), "to throw a", Error);
		});
	});

	it("Fails if no corresponding option for value", () => {
		ignoreConsoleError(() => {
			radioProps.set(RadioProps.propNames.value, "option9");

			const component = <Radio radioProps={radioProps} />;
			expect(() => mount(component), "to throw a", Error);
		});
	});

	it("Fails if no corresponding option for default value", () => {
		ignoreConsoleError(() => {
			radioProps.set(RadioProps.propNames.defaultVal, "option9");

			const component = <Radio radioProps={radioProps} />;
			expect(() => mount(component), "to throw a", Error);
		});
	});

	it("Fails if two options with same value", () => {
		ignoreConsoleError(() => {
			radios[1].value = "option1";
			radioProps.set(RadioProps.propNames.radios, radios);

			const component = <Radio radioProps={radioProps} />;
			expect(() => mount(component), "to throw a", Error);
		});
	});

	it("Renders Radio component properly with label", () => {
		radioProps.set(RadioProps.propNames.label, "aRadioLabel");
		ExpectComponentToBeRenderedProperly(radioProps);
	});

	it("Renders Radio component properly without label", () => {
		radioProps.set(RadioProps.propNames.label, null);
		ExpectComponentToBeRenderedProperly(radioProps);
	});

	it("Radio component handles option change", async () => {
		let update = sinon.spy().named("update");
		radioProps.set(RadioProps.propNames.update, update);

		ExpectEventToBeFiredWithOptionValue(radioProps, update, "option3");
	});

	it("Radio component handles options clickEvent", async () => {
		let clickEvent = sinon.spy().named("clickEvent");
		radios[1].clickEvent = clickEvent;
		radioProps.set(RadioProps.propNames.radios, radios);

		ExpectEventToBeFiredWithOptionValue(radioProps, clickEvent, "option2");
	});
});
