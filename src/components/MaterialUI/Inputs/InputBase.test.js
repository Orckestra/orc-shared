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
		inputProps.set(InputBaseProps.propNames.disabled, true);

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

		const metadata = {
			test: "value",
		};

		inputProps.set(InputBaseProps.propNames.value, "");
		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.label, aLabel);
		inputProps.set(InputBaseProps.propNames.metadata, metadata);

		const component = <InputBase inputProps={inputProps} />;
		const mountedComponent = mount(component);

		const input = mountedComponent.find("input");
		input.simulate("change", { target: { value: aValue } });
		expect(update, "to have calls satisfying", [{ args: [aValue, metadata] }]);
	});

	it("InputBase component handles focus on click", async () => {
		const onFocus = jest.fn();
		const inputProps = new InputBaseProps();
		const aLabel = "aLabel";

		const metadata = {
			test: "value",
		};

		inputProps.set(InputBaseProps.propNames.value, "");
		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.label, aLabel);
		inputProps.set(InputBaseProps.propNames.metadata, metadata);

		const component = <InputBase inputProps={inputProps} />;
		const mountedComponent = mount(component);

		const input = mountedComponent.find("input");
		input.simulate("click", { target: { focus: onFocus } });
		expect(onFocus.mock.calls.length, "to equal", 1);
	});

	it("Renders InputBase when error position is 'right'", () => {
		const inputProps = new InputBaseProps();
		const errorValue = "error";

		inputProps.set(InputBaseProps.propNames.error, errorValue);
		inputProps.set(InputBaseProps.propNames.errorPosition, "right");

		const component = mount(<InputBase inputProps={inputProps} />);
		const errorContainer = component.find("div").last().get(0);

		expect(errorContainer, "when mounted", "to have style rules satisfying", "to contain", "float: right");
	});

	it("Renders InputBase with start adornment", () => {
		const inputProps = new InputBaseProps();
		const aValue = "value";
		const aPlaceholder = "placeholder";
		const aStart = "$ ";

		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.placeholder, aPlaceholder);
		inputProps.set(InputBaseProps.propNames.startAdornment, aStart);

		const component = <InputBase inputProps={inputProps} />;

		const mountedComponent = mount(component);
		const expected = <InputBaseMUI value={aValue} placeholder={aPlaceholder} startAdornment={aStart} />;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Renders InputBase with end adornment", () => {
		const inputProps = new InputBaseProps();
		const aValue = "value";
		const aPlaceholder = "placeholder";
		const anEnd = " $";

		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.placeholder, aPlaceholder);
		inputProps.set(InputBaseProps.propNames.endAdornment, anEnd);

		const component = <InputBase inputProps={inputProps} />;

		const mountedComponent = mount(component);
		const expected = <InputBaseMUI value={aValue} placeholder={aPlaceholder} endAdornment={anEnd} />;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Renders InputBase with autoComplete as new-password", () => {
		const inputProps = new InputBaseProps();
		const aValue = "value";
		const aPlaceholder = "placeholder";
		const autoComplete = "new-password";

		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.placeholder, aPlaceholder);
		inputProps.set(InputBaseProps.propNames.autoComplete, autoComplete);

		const component = <InputBase inputProps={inputProps} />;

		const mountedComponent = mount(component);
		const expected = <InputBaseMUI value={aValue} placeholder={aPlaceholder} autoComplete={"new-password"} />;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});
});
