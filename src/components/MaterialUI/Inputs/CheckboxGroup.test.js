import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import CheckboxGroup from "./CheckboxGroup";
import Checkbox from "./Checkbox";
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
			{ value: "option3", sortOrder: 3 },
			{ value: "option3_special", sortOrder: 4 },
		];

		props.set(CheckboxGroupProps.propNames.update, update);
		props.set(CheckboxGroupProps.propNames.value, "option1|option3_special");
		props.set(CheckboxGroupProps.propNames.options, options);
		const component = <CheckboxGroup checkboxGroupProps={props} />;

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

		const checkbox3Props = new CheckboxProps();
		checkbox3Props.set(CheckboxProps.propNames.update, update);
		checkbox3Props.set(CheckboxProps.propNames.value, false);
		checkbox3Props.set(CheckboxProps.propNames.label, "option3");
		checkbox3Props.set(CheckboxProps.propNames.readOnly, false);
		checkbox3Props.set(CheckboxProps.propNames.disabled, false);

		const checkbox4Props = new CheckboxProps();
		checkbox4Props.set(CheckboxProps.propNames.update, update);
		checkbox4Props.set(CheckboxProps.propNames.value, true);
		checkbox4Props.set(CheckboxProps.propNames.label, "option3_special");
		checkbox4Props.set(CheckboxProps.propNames.readOnly, false);
		checkbox4Props.set(CheckboxProps.propNames.disabled, false);

		const expected = (
			<div>
				<div>
					<Checkbox key={1} checkboxProps={checkbox1Props} />
					<Checkbox key={2} checkboxProps={checkbox2Props} />
					<Checkbox key={3} checkboxProps={checkbox3Props} />
					<Checkbox key={4} checkboxProps={checkbox4Props} />
				</div>
			</div>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders CheckboxGroup component without errors when options are not specified", () => {
		const props = new CheckboxGroupProps();

		props.set(CheckboxGroupProps.propNames.update, update);
		props.set(CheckboxGroupProps.propNames.value, "option1");

		const component = <CheckboxGroup checkboxGroupProps={props} />;

		const expected = (
			<div>
				<div></div>
			</div>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders CheckboxGroup component with error", () => {
		const props = new CheckboxGroupProps();

		props.set(CheckboxGroupProps.propNames.update, update);
		props.set(CheckboxGroupProps.propNames.value, "option1");
		props.set(CheckboxGroupProps.propNames.error, "some error");

		const component = <CheckboxGroup checkboxGroupProps={props} />;

		const expected = (
			<div>
				<div></div>
				<div>{"some error"}</div>
			</div>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders CheckboxGroup component with label", () => {
		const props = new CheckboxGroupProps();

		props.set(CheckboxGroupProps.propNames.update, update);
		props.set(CheckboxGroupProps.propNames.value, "option1");
		props.set(CheckboxGroupProps.propNames.label, "aLabel");

		const component = <CheckboxGroup checkboxGroupProps={props} />;
		const mountedComponent = mount(component);
		expect(mountedComponent.children().first().props().label, "to equal", "aLabel");
	});

	it("CheckboxGroup component handles uncheck", async () => {
		const checkboxProps = new CheckboxGroupProps();
		const options = [{ value: "option1", sortOrder: 1 }];
		checkboxProps.set(CheckboxGroupProps.propNames.update, update);
		checkboxProps.set(CheckboxGroupProps.propNames.value, "option1");
		checkboxProps.set(CheckboxGroupProps.propNames.options, options);

		ReactDOM.render(<CheckboxGroup checkboxGroupProps={checkboxProps} />, container);

		const clickEvent = document.createEvent("MouseEvents");
		clickEvent.initEvent("click", true, false);

		const element = container.querySelector(".MuiCheckbox-root ");
		element.dispatchEvent(clickEvent);
		expect(update, "to have calls satisfying", [{ args: [""] }]);
	});

	it("CheckboxGroup component handles check", async () => {
		const checkboxProps = new CheckboxGroupProps();
		const options = [{ value: "option1", sortOrder: 1 }];
		checkboxProps.set(CheckboxGroupProps.propNames.update, update);
		checkboxProps.set(CheckboxGroupProps.propNames.value, "");
		checkboxProps.set(CheckboxGroupProps.propNames.options, options);

		ReactDOM.render(<CheckboxGroup checkboxGroupProps={checkboxProps} />, container);

		const clickEvent = document.createEvent("MouseEvents");
		clickEvent.initEvent("click", true, false);

		const element = container.querySelector(".MuiCheckbox-root ");
		element.dispatchEvent(clickEvent);
		expect(update, "to have calls satisfying", [{ args: ["option1"] }]);
	});
});
