import React from "react";
import { mount } from "enzyme";
import Input from "./Input";
import InputMUI from "@material-ui/core/Input";
import sinon from "sinon";
import { ignoreConsoleError } from "../../../utils/testUtils";
import InputProps from "./InputProps";

describe("Input Component", () => {
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
			const component = <Input inputProps="Wrong type" />;
			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(error, "to have message", "inputProps property is not of type InputProps");
			});
		});
	});

	it("Renders Input component without errors", () => {
		const inputProps = new InputProps();
		const aLabel = "aLabel";
		const aValue = "value";

		inputProps.set(InputProps.propNames.update, update);
		inputProps.set(InputProps.propNames.value, aValue);
		inputProps.set(InputProps.propNames.label, aLabel);
		inputProps.set(InputProps.propNames.type, "text");

		const component = <Input inputProps={inputProps} />;

		const mountedComponent = mount(component);
		const expected = <InputMUI disableUnderline={true} value={aValue} />;
		const expectedLabel = <label>{aLabel}</label>;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
		expect(mountedComponent.containsMatchingElement(expectedLabel), "to be truthy");
	});

	it("Renders Input component without labels", () => {
		const inputProps = new InputProps();
		const aValue = "value";
		const aPlaceholder = "placeholder";

		inputProps.set(InputProps.propNames.update, update);
		inputProps.set(InputProps.propNames.value, aValue);
		inputProps.set(InputProps.propNames.placeholder, aPlaceholder);

		const component = <Input inputProps={inputProps} />;

		const mountedComponent = mount(component);
		const expected = <InputMUI disableUnderline={true} value={aValue} placeholder={aPlaceholder} />;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Input component handles change", async () => {
		const inputProps = new InputProps();
		const aLabel = "aLabel";
		const aValue = "value";

		inputProps.set(InputProps.propNames.value, "");
		inputProps.set(InputProps.propNames.update, update);
		inputProps.set(InputProps.propNames.label, aLabel);

		const component = <Input inputProps={inputProps} />;
		const mountedComponent = mount(component);

		const input = mountedComponent.find("input");
		input.simulate("change", { target: { value: aValue } });
		expect(update, "to have calls satisfying", [{ args: [aValue] }]);
	});
});
