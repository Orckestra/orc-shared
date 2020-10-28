import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import SwitchMUI from "@material-ui/core/Switch";
import sinon from "sinon";
import { ignoreConsoleError } from "../../../utils/testUtils";
import SwitchProps from "./SwitchProps";
import Switch from "./Switch";

describe("Switch Component", () => {
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

	it("Fails if switchProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = <Switch switchProps="Wrong type" />;
			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(error, "to have message", "switchProps property is not of type SwitchProps");
			});
		});
	});

	it("Renders Switch component without errors", () => {
		const switchProps = new SwitchProps();

		switchProps.set(SwitchProps.propNames.update, update);
		switchProps.set(SwitchProps.propNames.value, true);
		switchProps.set(SwitchProps.propNames.onCaption, "on");
		switchProps.set(SwitchProps.propNames.offCaption, "off");

		const component = <Switch switchProps={switchProps} />;

		const mountedComponent = mount(component);
		const expected = <SwitchMUI checked={true} />;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Checkbox component handles check", async () => {
		const switchProps = new SwitchProps();

		switchProps.set(SwitchProps.propNames.update, update);
		switchProps.set(SwitchProps.propNames.value, false);

		ReactDOM.render(<Switch switchProps={switchProps} />, container);

		const clickEvent = document.createEvent("MouseEvents");
		clickEvent.initEvent("click", true, false);

		const element = container.querySelector(".MuiSwitch-input ");
		element.dispatchEvent(clickEvent);
		expect(update, "to have calls satisfying", [{ args: [true] }]);
	});

	it("Checkbox component handles uncheck", async () => {
		const switchProps = new SwitchProps();

		switchProps.set(SwitchProps.propNames.update, update);
		switchProps.set(SwitchProps.propNames.value, true);

		ReactDOM.render(<Switch switchProps={switchProps} />, container);

		const clickEvent = document.createEvent("MouseEvents");
		clickEvent.initEvent("click", true, false);

		const element = container.querySelector(".MuiSwitch-input ");
		element.dispatchEvent(clickEvent);
		expect(update, "to have calls satisfying", [{ args: [false] }]);
	});
});
