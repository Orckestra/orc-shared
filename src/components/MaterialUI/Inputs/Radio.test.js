import React from "react";
import ReactDOM from "react-dom";
import sinon from "sinon";
import { mount } from "enzyme";
import { spyOnConsole } from "../../../utils/testUtils";
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
	const row = radioProps?.get(RadioProps.propNames.row) ?? true;
	const radios = radioProps?.get(RadioProps.propNames.radios) ?? [];
	const disabled = radioProps?.get(RadioProps.propNames.disabled) ?? false;

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
					x.props.label === radio.label &&
					x.props.disabled === disabled,
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
	spyOnConsole(["error"]);
	let radios, radioProps;

	beforeEach(() => {
		radios = [
			{ label: "Option 1", value: "option1" },
			{ label: "Option 2", value: "option2" },
			{ label: "Option 3", value: "option3" },
			{ label: "Option 4", value: "option4" },
		];

		radioProps = new RadioProps();
		radioProps.set(RadioProps.propNames.name, "aRadioName");
	});

	it("Fails if radioProps is missing or wrong type", () => {
		expect(() => mount(<Radio />), "to throw a", TypeError).then(error => {
			expect(error, "to have message", "radioProps property is not of type RadioProps");
		});
		expect(() => mount(<Radio radioProps="Wrong type" />), "to throw a", TypeError).then(error => {
			expect(error, "to have message", "radioProps property is not of type RadioProps");
		});
	});

	it("Fails if less than two options", () => {
		expect(
			() => mount(<Radio radioProps={radioProps} />),
			"to throw",
			"Radio component must have at least two options",
		);

		radioProps.set(RadioProps.propNames.radios, [{ label: "Option 1", value: "option1" }]);

		expect(
			() => mount(<Radio radioProps={radioProps} />),
			"to throw",
			"Radio component must have at least two options",
		);
	});

	it("Fails if two options with same value", () => {
		radioProps.set(RadioProps.propNames.radios, [
			{ label: "Option 1", value: "option1" },
			{ label: "Option 2", value: "option1" },
		]);

		expect(
			() => mount(<Radio radioProps={radioProps} />),
			"to throw",
			"Radio component must not have duplicated radio values",
		);
	});

	it("Fails if name is not specified", () => {
		radioProps.set(RadioProps.propNames.radios, radios);
		radioProps.set(RadioProps.propNames.name, null);

		expect(() => mount(<Radio radioProps={radioProps} />), "to throw", "Radio component name is required and missing");
	});

	it("Fails if no corresponding option for value", () => {
		radioProps.set(RadioProps.propNames.radios, radios);
		radioProps.set(RadioProps.propNames.value, "option9");

		expect(
			() => mount(<Radio radioProps={radioProps} />),
			"to throw",
			"Radio component must have a matching option for it's value",
		);
	});

	it("Fails if no corresponding option for default value", () => {
		radioProps.set(RadioProps.propNames.radios, radios);
		radioProps.set(RadioProps.propNames.value, "option1");
		radioProps.set(RadioProps.propNames.defaultVal, "option9");

		expect(
			() => mount(<Radio radioProps={radioProps} />),
			"to throw",
			"Radio component must have a matching option for it's default value",
		);
	});

	it("Renders Radio component properly with all options", () => {
		radioProps.set(RadioProps.propNames.label, "aRadioLabel");
		radioProps.set(RadioProps.propNames.defaultVal, "option3");
		radioProps.set(RadioProps.propNames.value, "option4");
		radioProps.set(RadioProps.propNames.radios, radios);
		radioProps.set(RadioProps.propNames.row, true);
		radioProps.set(RadioProps.propNames.disabled, true);

		ExpectComponentToBeRenderedProperly(radioProps);
	});

	it("Renders Radio component properly with no options", () => {
		radioProps.set(RadioProps.propNames.radios, radios);
		ExpectComponentToBeRenderedProperly(radioProps);
	});

	it("Radio component handles radios update", async () => {
		let update = sinon.spy().named("update");
		radioProps.set(RadioProps.propNames.update, update);
		radioProps.set(RadioProps.propNames.radios, radios);

		ExpectEventToBeFiredWithOptionValue(radioProps, update, "option3");
	});

	it("Radio component handles radios clickEvent", async () => {
		let clickEvent = sinon.spy().named("clickEvent");
		radios[1].clickEvent = clickEvent;
		radioProps.set(RadioProps.propNames.radios, radios);

		ExpectEventToBeFiredWithOptionValue(radioProps, clickEvent, "option2");
	});
});
