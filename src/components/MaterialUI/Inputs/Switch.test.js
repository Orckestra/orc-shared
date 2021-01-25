import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import SwitchMUI from "@material-ui/core/Switch";
import sinon from "sinon";
import { ignoreConsoleError } from "../../../utils/testUtils";
import SwitchProps from "./SwitchProps";
import Switch from "./Switch";
import { IntlProvider } from "react-intl";

const messages = {
	captionOn: "captionOn",
	captionOff: "captionOff",
};

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
			const component = (
				<IntlProvider locale="en-US">
					<Switch switchProps="Wrong type" />
				</IntlProvider>
			);
			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(error, "to have message", "switchProps property is not of type SwitchProps");
			});
		});
	});

	it("Renders Switch component without errors", () => {
		const switchProps = new SwitchProps();

		switchProps.set(SwitchProps.propNames.update, update);
		switchProps.set(SwitchProps.propNames.value, true);
		switchProps.set(SwitchProps.propNames.onCaption, { id: "captionOn" });
		switchProps.set(SwitchProps.propNames.offCaption, { id: "captionOff" });

		const component = (
			<IntlProvider messages={messages} locale="en-US">
				<Switch switchProps={switchProps} />
			</IntlProvider>
		);

		const mountedComponent = mount(component);
		const expected = <SwitchMUI checked={true} />;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Checkbox component handles check", () => {
		const switchProps = new SwitchProps();

		switchProps.set(SwitchProps.propNames.update, update);
		switchProps.set(SwitchProps.propNames.value, false);

		const component = (
			<IntlProvider locale="en-US">
				<Switch switchProps={switchProps} />
			</IntlProvider>
		);

		const mountedComponent = mount(component);

		const switchMui = mountedComponent.find(SwitchMUI).find("input");
		switchMui.simulate("change", { target: { checked: true } });
		expect(update, "to have calls satisfying", [{ args: [true] }]);
	});

	it("Checkbox component handles uncheck", () => {
		const switchProps = new SwitchProps();

		switchProps.set(SwitchProps.propNames.update, update);
		switchProps.set(SwitchProps.propNames.value, true);

		const component = (
			<IntlProvider locale="en-US">
				<Switch switchProps={switchProps} />
			</IntlProvider>
		);

		const mountedComponent = mount(component);

		const switchMui = mountedComponent.find(SwitchMUI).find("input");
		switchMui.simulate("change", { target: { checked: false } });
		expect(update, "to have calls satisfying", [{ args: [false] }]);
	});

	it("Checkbox component not handles check if it's read only", () => {
		const switchProps = new SwitchProps();

		switchProps.set(SwitchProps.propNames.update, update);
		switchProps.set(SwitchProps.propNames.value, false);
		switchProps.set(SwitchProps.propNames.readOnly, true);

		const component = (
			<IntlProvider locale="en-US">
				<Switch switchProps={switchProps} />
			</IntlProvider>
		);

		const mountedComponent = mount(component);

		const switchMui = mountedComponent.find(SwitchMUI).find("input");
		switchMui.simulate("change");
		expect(update, "to have calls satisfying", []);
	});
});
