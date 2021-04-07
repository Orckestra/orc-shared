import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import CheckboxGroup from "./CheckboxGroup";
import Checkbox from "./Checkbox";
import CheckboxMUI from "@material-ui/core/Checkbox";
import sinon from "sinon";
import { ignoreConsoleError } from "../../../utils/testUtils";
import CheckboxGroupProps from "./CheckboxGroupProps";
import CheckboxProps from "./CheckboxProps";

describe("CheckboxGroup Component", () => {
	let update, container;
	beforeEach(() => {
		container = document.createElement("div");
		document.body.appendChild(container);
		update = sinon.spy().named("update");
	});
	afterEach(() => {
		document.body.removeChild(container);
		container = null;
	});

	it("Fails if checkboxGroupProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = <CheckboxGroup checkboxGroupProps="Wrong type" />;
			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(error, "to have message", "checkboxGroupProps property is not of type CheckboxGroupProps");
			});
		});
	});

	it("Renders CheckboxGroup component without errors", () => {
		const props = new CheckboxGroupProps();
		const options = [
			{ value: "option1", sortOrder: 1 },
			{ value: "option2", sortOrder: 2 },
		];

		props.set(CheckboxGroupProps.propNames.update, update);
		props.set(CheckboxGroupProps.propNames.value, "option1");
		props.set(CheckboxGroupProps.propNames.options, options);
		const component = <CheckboxGroup checkboxGroupProps={props} />;

		//const mountedComponent = mount(component);
		const checkbox1Props = new CheckboxProps();
		checkbox1Props.set(CheckboxProps.propNames.update, update);
		checkbox1Props.set(CheckboxProps.propNames.value, true);
		checkbox1Props.set(CheckboxProps.propNames.label, "option1");
		checkbox1Props.set(CheckboxProps.propNames.readOnly, false);
		checkbox1Props.set(CheckboxProps.propNames.disabled, false);

		const checkbox2Props = new CheckboxProps();
		checkbox2Props.set(CheckboxProps.propNames.update, update);
		checkbox2Props.set(CheckboxProps.propNames.value, false);
		checkbox2Props.set(CheckboxProps.propNames.label, "option2");
		checkbox2Props.set(CheckboxProps.propNames.readOnly, false);
		checkbox2Props.set(CheckboxProps.propNames.disabled, false);
		const expected = (
			<div>
				<div>
					<Checkbox key={1} checkboxProps={checkbox1Props} />
					<Checkbox key={2} checkboxProps={checkbox2Props} />
				</div>
			</div>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});
});
