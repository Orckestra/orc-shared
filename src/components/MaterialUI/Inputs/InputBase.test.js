import React from "react";
import { mount } from "enzyme";
import InputBase from "./InputBase";
import InputBaseMUI from "@material-ui/core/InputBase";
import sinon from "sinon";
import { ignoreConsoleError } from "../../../utils/testUtils";
import InputBaseProps from "./InputBaseProps";

describe("InputBase Component", () => {
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

	it("Fails if inputProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = <InputBase inputProps="Wrong type" />;
			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(error, "to have message", "inputProps property is not of type InputBaseProps");
			});
		});
	});

	it("Renders InputBase component without errors", () => {
		const inputProps = new InputBaseProps();
		const aLabel = "aLabel";
		const aValue = "value";

		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.label, aLabel);
		inputProps.set(InputBaseProps.propNames.type, "text");

		const component = <InputBase inputProps={inputProps} />;

		const mountedComponent = mount(component);
		const expected = <InputBaseMUI value={aValue} />;
		const expectedLabel = <label>{aLabel}</label>;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
		expect(mountedComponent.containsMatchingElement(expectedLabel), "to be truthy");

		inputProps.set(InputBaseProps.propNames.value, aValue + aValue);
		mountedComponent.setProps({ inputProps });

		expect(mountedComponent.prop("inputProps").get(InputBaseProps.propNames.value), "to equal", aValue + aValue);
	});

	it("Renders InputBase component without labels", () => {
		const inputProps = new InputBaseProps();
		const aValue = "value";
		const aPlaceholder = "placeholder";

		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.placeholder, aPlaceholder);

		const component = <InputBase inputProps={inputProps} />;

		const mountedComponent = mount(component);
		const expected = <InputBaseMUI value={aValue} placeholder={aPlaceholder} />;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Renders InputBase component with error", () => {
		const inputProps = new InputBaseProps();
		const aValue = "value";
		const aPlaceholder = "placeholder";
		const aError = "error";

		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.placeholder, aPlaceholder);
		inputProps.set(InputBaseProps.propNames.error, aError);

		const component = <InputBase inputProps={inputProps} />;

		const mountedComponent = mount(component);
		const expected = <InputBaseMUI value={aValue} placeholder={aPlaceholder} />;
		const expectedError = aError;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
		expect(mountedComponent.containsMatchingElement(expectedError), "to be truthy");
	});

	it("InputBase component handles change", async () => {
		const inputProps = new InputBaseProps();
		const aLabel = "aLabel";
		const aValue = "value";

		inputProps.set(InputBaseProps.propNames.value, "");
		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.label, aLabel);

		const component = <InputBase inputProps={inputProps} />;
		const mountedComponent = mount(component);

		const input = mountedComponent.find("input");
		input.simulate("change", { target: { value: aValue } });
		expect(update, "to have calls satisfying", [{ args: [aValue] }]);
	});
});
