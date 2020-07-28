import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import Checkbox from "./Checkbox";
import CheckboxMUI from "@material-ui/core/Checkbox";
import sinon from "sinon";
import { ignoreConsoleError } from "../../../utils/testUtils";
import CheckboxProps from "./CheckboxProps";

describe("Checkbox Component", () => {
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

	it("Fails if checkboxProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = <Checkbox checkboxProps="Wrong type" />;
			expect(() => mount(component), "to throw a", TypeError);
		});
	});

	it("Renders Checkbox component without errors", () => {
		const checkboxProps = new CheckboxProps();
		const aLabel = "aLabel";

		checkboxProps.set(CheckboxProps.propNames.update, update);
		checkboxProps.set(CheckboxProps.propNames.value, true);
		checkboxProps.set(CheckboxProps.propNames.label, aLabel);

		const component = <Checkbox checkboxProps={checkboxProps} />;

		const mountedComponent = mount(component);
		const expected = <CheckboxMUI checked={true} />;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
		expect(mountedComponent.children().first().props().label, "to equal", "aLabel");
	});

	it("Renders Checkbox component without labels", () => {
		const checkboxProps = new CheckboxProps();

		checkboxProps.set(CheckboxProps.propNames.update, update);
		checkboxProps.set(CheckboxProps.propNames.value, true);

		const component = <Checkbox checkboxProps={checkboxProps} />;

		const mountedComponent = mount(component);
		const expected = <CheckboxMUI checked={true} />;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Checkbox component handles check", async () => {
		const checkboxProps = new CheckboxProps();
		const aLabel = "aLabel";

		checkboxProps.set(CheckboxProps.propNames.update, update);
		checkboxProps.set(CheckboxProps.propNames.value, false);
		checkboxProps.set(CheckboxProps.propNames.label, aLabel);

		ReactDOM.render(<Checkbox checkboxProps={checkboxProps} />, container);

		const clickEvent = document.createEvent("MouseEvents");
		clickEvent.initEvent("click", true, false);

		const element = container.querySelector(".MuiCheckbox-root ");
		element.dispatchEvent(clickEvent);
		expect(update, "to have calls satisfying", [{ args: [true] }]);
	});

	it("Checkbox component handles uncheck", async () => {
		const checkboxProps = new CheckboxProps();
		const aLabel = "aLabel";

		checkboxProps.set(CheckboxProps.propNames.update, update);
		checkboxProps.set(CheckboxProps.propNames.value, true);
		checkboxProps.set(CheckboxProps.propNames.label, aLabel);

		ReactDOM.render(<Checkbox checkboxProps={checkboxProps} />, container);

		const clickEvent = document.createEvent("MouseEvents");
		clickEvent.initEvent("click", true, false);

		const element = container.querySelector(".MuiCheckbox-root ");
		element.dispatchEvent(clickEvent);
		expect(update, "to have calls satisfying", [{ args: [false] }]);
	});
});
