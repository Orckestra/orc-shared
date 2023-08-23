import React from "react";
import { mount } from "enzyme";
import InputBase, { AdvancedNumericInput } from "./InputBase";
import InputBaseMUI from "@material-ui/core/InputBase";
import sinon from "sinon";
import { ignoreConsoleError } from "../../../utils/testUtils";
import InputBaseProps from "./InputBaseProps";
import { act } from "unexpected-reaction";
import { fireEvent, render, getByDisplayValue } from "@testing-library/react";

describe("InputBase Component", () => {
	let update, container;
	beforeEach(() => {
		window.bypassDebounce = true;

		container = document.createElement("div");
		document.body.appendChild(container);
		update = sinon.spy().named("update");
	});
	afterEach(() => {
		delete window.bypassDebounce;
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

	it("Renders multiline InputBase component with default number of rows", () => {
		const inputProps = new InputBaseProps();
		const aLabel = "aLabel";
		const aValue = "value";
		const defaultRows = 4;

		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.label, aLabel);
		inputProps.set(InputBaseProps.propNames.type, "text");
		inputProps.set(InputBaseProps.propNames.multiline, true);

		const component = <InputBase inputProps={inputProps} />;

		const mountedComponent = mount(component);
		const expected = <InputBaseMUI value={aValue} title={aValue} minRows={defaultRows} />;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Renders multiline InputBase component with desired number of rows", () => {
		const inputProps = new InputBaseProps();
		const aLabel = "aLabel";
		const aValue = "value";
		const desiredNumberOfRows = 20;

		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.label, aLabel);
		inputProps.set(InputBaseProps.propNames.type, "text");
		inputProps.set(InputBaseProps.propNames.multiline, true);
		inputProps.set(InputBaseProps.propNames.rows, desiredNumberOfRows);

		const component = <InputBase inputProps={inputProps} />;

		const mountedComponent = mount(component);
		const expected = <InputBaseMUI value={aValue} title={aValue} minRows={desiredNumberOfRows} />;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Renders InputBase component with title attribute for input of type text", () => {
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
		const expected = <InputBaseMUI value={aValue} title={aValue} />;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Renders InputBase component with title attribute for input types other than text", () => {
		const inputProps = new InputBaseProps();
		const aLabel = "aLabel";
		const aValue = "value";

		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.label, aLabel);
		inputProps.set(InputBaseProps.propNames.type, "number");
		inputProps.set(InputBaseProps.propNames.disabled, true);

		const component = <InputBase inputProps={inputProps} />;

		const mountedComponent = mount(component);
		const expected = <InputBaseMUI value={aValue} title="" />;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
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

	it("Change value on blur with pending timer", () => {
		window.bypassDebounce = false;
		const inputProps = new InputBaseProps();
		const aLabel = "aLabel";
		const aValue = "12.2";
		const metadata = {
			test: "value",
		};
		const onBlur = sinon.spy().named("blur");

		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.label, aLabel);
		inputProps.set(InputBaseProps.propNames.metadata, metadata);
		inputProps.set(InputBaseProps.propNames.onBlur, onBlur);
		inputProps.set(InputBaseProps.propNames.timeoutDelay, 1000);

		const component = <InputBase inputProps={inputProps} />;
		const mountedComponent = mount(component);
		const input = mountedComponent.find("input");

		input.simulate("change", { target: { value: "13", focus: () => {} } });
		input.simulate("blur", {});

		expect(onBlur, "was called once");
		expect(update, "not to have calls satisfying", [{ args: [aValue, metadata] }]);
		expect(update, "to have calls satisfying", [{ args: ["13", metadata] }]);
	});
});

describe("InputBase component debouce", () => {
	const clock = sinon.useFakeTimers();
	let update, container;

	beforeEach(() => {
		container = document.createElement("div");
		document.body.appendChild(container);
		update = sinon.spy().named("update");
	});

	afterEach(() => {
		clock.restore();
	});

	it("InputBase component updates when debounced update", async () => {
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

		act(() => {
			clock.tick(200);
		});

		input.simulate("change", { target: { value: "differentValue" } });
		expect(update, "to have calls satisfying", [{ args: [aValue, metadata] }]);
	});

	it("InputBase component update to empty when text to display is null", async () => {
		const inputProps = new InputBaseProps();
		const aLabel = "aLabel";

		const metadata = {
			test: "value",
		};

		inputProps.set(InputBaseProps.propNames.value, null);
		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.label, aLabel);
		inputProps.set(InputBaseProps.propNames.metadata, metadata);

		const component = <InputBase inputProps={inputProps} />;
		const mountedComponent = mount(component);

		const input = mountedComponent.find("input");
		input.simulate("change", { target: { value: null } });
		expect(input.get(0).props.value, "to equal", "");
	});
});

describe("AdvancedNumericInput", () => {
	const noop = function () {};
	let update, container;
	beforeEach(() => {
		window.bypassDebounce = true;
		jest.useFakeTimers();

		container = document.createElement("div");
		document.body.appendChild(container);
		update = sinon.spy().named("update");
	});
	afterEach(() => {
		jest.useRealTimers();
		delete window.bypassDebounce;
		document.body.removeChild(container);
		container = null;
	});

	it("Renders InputBase component as advanced numeric input", () => {
		const inputProps = new InputBaseProps();
		const aLabel = "aLabel";
		const aValue = "value";

		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.label, aLabel);
		inputProps.set(InputBaseProps.propNames.type, "AdvancedNumericInput");

		const component = <InputBase inputProps={inputProps} />;

		const mountedComponent = mount(component);
		const expected = <InputBaseMUI value={aValue} title="" inputComponent={AdvancedNumericInput} />;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Renders InputBase component as advanced numeric input with custom numeric props", () => {
		const inputProps = new InputBaseProps();
		const aLabel = "aLabel";
		const aValue = "value";

		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.label, aLabel);
		inputProps.set(InputBaseProps.propNames.type, "AdvancedNumericInput");
		inputProps.set(InputBaseProps.propNames.numericInputProps, { decimalScale: 2 });

		const component = <InputBase inputProps={inputProps} />;

		const mountedComponent = mount(component);

		const advInput = mountedComponent.find("AdvancedNumericInput");
		expect(advInput.props().decimalScale, "to be", 2);
	});

	it("Change advanced numeric input value", () => {
		const inputProps = new InputBaseProps();
		const aLabel = "aLabel";
		const aValue = "12.2";
		const metadata = {
			test: "value",
		};

		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.label, aLabel);
		inputProps.set(InputBaseProps.propNames.type, "AdvancedNumericInput");
		inputProps.set(InputBaseProps.propNames.numericInputProps, { decimalScale: 2 });
		inputProps.set(InputBaseProps.propNames.metadata, metadata);

		const component = <InputBase inputProps={inputProps} />;
		const mountedComponent = mount(component);
		const input = mountedComponent.find("input");
		input.simulate("change", { target: { value: "13", focus: noop } });

		expect(update, "to have calls satisfying", [{ args: ["13", metadata] }]);
	});

	it("Change advanced numeric input on blur without custom blur method", () => {
		const inputProps = new InputBaseProps();
		const aLabel = "aLabel";
		const aValue = "12.2";
		const metadata = {
			test: "value",
		};

		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.label, aLabel);
		inputProps.set(InputBaseProps.propNames.type, "AdvancedNumericInput");
		inputProps.set(InputBaseProps.propNames.numericInputProps, { decimalScale: 2 });
		inputProps.set(InputBaseProps.propNames.metadata, metadata);

		const component = <InputBase inputProps={inputProps} />;
		const mountedComponent = mount(component);
		const input = mountedComponent.find("input");

		input.simulate("blur", {});

		expect(update, "to have calls satisfying", [{ args: ["12.20", metadata] }]);
	});

	it("Onblur send a formatted string instead of a number", () => {
		const inputProps = new InputBaseProps();
		const aLabel = "aLabel";
		const aValue = 12.2;
		const metadata = {
			test: "value",
		};

		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.label, aLabel);
		inputProps.set(InputBaseProps.propNames.type, "AdvancedNumericInput");
		inputProps.set(InputBaseProps.propNames.numericInputProps, { decimalScale: 2 });
		inputProps.set(InputBaseProps.propNames.metadata, metadata);

		const component = <InputBase inputProps={inputProps} />;
		const mountedComponent = mount(component);
		const input = mountedComponent.find("input");

		input.simulate("blur", {});

		expect(update, "to have calls satisfying", [{ args: ["12.20", metadata] }]);
	});

	it("Onblur send a formatted string with default numeric input props", () => {
		const inputProps = new InputBaseProps();
		const aLabel = "aLabel";
		const aValue = 12.2;
		const metadata = {
			test: "value",
		};

		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.label, aLabel);
		inputProps.set(InputBaseProps.propNames.type, "AdvancedNumericInput");
		inputProps.set(InputBaseProps.propNames.metadata, metadata);

		const component = <InputBase inputProps={inputProps} />;
		const mountedComponent = mount(component);
		const input = mountedComponent.find("input");

		input.simulate("blur", {});

		expect(update, "to have calls satisfying", [{ args: ["12.2", metadata] }]);
	});

	it("Onblur send an unformatted string when blurFormattingSkipFixedDecimalScale is true", () => {
		const inputProps = new InputBaseProps();
		const aLabel = "aLabel";
		const aValue = 12.2;
		const metadata = {
			test: "value",
		};

		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.label, aLabel);
		inputProps.set(InputBaseProps.propNames.type, "AdvancedNumericInput");
		inputProps.set(InputBaseProps.propNames.numericInputProps, {
			decimalScale: 2,
			blurFormattingSkipFixedDecimalScale: true,
		});
		inputProps.set(InputBaseProps.propNames.metadata, metadata);

		const component = <InputBase inputProps={inputProps} />;
		const mountedComponent = mount(component);
		const input = mountedComponent.find("input");

		input.simulate("blur", {});

		expect(update, "to have calls satisfying", [{ args: ["12.2", metadata] }]);
	});

	it("Onblur send an empty string when the initial value is empty", () => {
		const inputProps = new InputBaseProps();
		const aLabel = "aLabel";
		const aValue = null;
		const metadata = {
			test: "value",
		};

		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.label, aLabel);
		inputProps.set(InputBaseProps.propNames.type, "AdvancedNumericInput");
		inputProps.set(InputBaseProps.propNames.numericInputProps, { decimalScale: 2 });
		inputProps.set(InputBaseProps.propNames.metadata, metadata);

		const component = <InputBase inputProps={inputProps} />;
		const mountedComponent = mount(component);
		const input = mountedComponent.find("input");

		input.simulate("blur", {});

		expect(update, "to have calls satisfying", [{ args: ["", metadata] }]);
	});

	it("Change advanced numeric input on blur with no pending timer", () => {
		const inputProps = new InputBaseProps();
		const aLabel = "aLabel";
		const aValue = "12.2";
		const metadata = {
			test: "value",
		};
		const onBlur = sinon.spy().named("blur");

		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.label, aLabel);
		inputProps.set(InputBaseProps.propNames.type, "AdvancedNumericInput");
		inputProps.set(InputBaseProps.propNames.numericInputProps, { decimalScale: 2 });
		inputProps.set(InputBaseProps.propNames.metadata, metadata);
		inputProps.set(InputBaseProps.propNames.onBlur, onBlur);

		const component = <InputBase inputProps={inputProps} />;
		const mountedComponent = mount(component);
		const input = mountedComponent.find("input");

		input.simulate("blur", {});

		expect(onBlur, "was called once");
		expect(update, "to have calls satisfying", [{ args: ["12.20", metadata] }]);
	});

	it("Change advanced numeric input on blur with pending timer", () => {
		window.bypassDebounce = false;
		const inputProps = new InputBaseProps();
		const aLabel = "aLabel";
		const aValue = "12.2";
		const metadata = {
			test: "value",
		};
		const onBlur = sinon.spy().named("blur");

		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.label, aLabel);
		inputProps.set(InputBaseProps.propNames.type, "AdvancedNumericInput");
		inputProps.set(InputBaseProps.propNames.numericInputProps, { decimalScale: 2 });
		inputProps.set(InputBaseProps.propNames.metadata, metadata);
		inputProps.set(InputBaseProps.propNames.onBlur, onBlur);
		inputProps.set(InputBaseProps.propNames.timeoutDelay, 1000);

		const component = <InputBase inputProps={inputProps} />;
		const mountedComponent = mount(component);
		const input = mountedComponent.find("input");

		input.simulate("change", { target: { value: "13", focus: noop } });
		input.simulate("blur", {});

		expect(onBlur, "was called once");
		expect(update, "not to have calls satisfying", [{ args: [aValue, metadata] }]);
		expect(update, "to have calls satisfying", [{ args: ["13.00", metadata] }]);
	});

	it("Local state is reset when the value props changes for the same value as inputText", () => {
		window.bypassDebounce = false;
		const inputProps = new InputBaseProps();
		const aLabel = "aLabel";
		const aValue = "12.2";
		const metadata = {
			test: "value",
		};
		const onBlur = sinon.spy().named("blur");

		inputProps.set(InputBaseProps.propNames.update, update);
		inputProps.set(InputBaseProps.propNames.value, aValue);
		inputProps.set(InputBaseProps.propNames.label, aLabel);
		inputProps.set(InputBaseProps.propNames.type, "AdvancedNumericInput");
		inputProps.set(InputBaseProps.propNames.numericInputProps, { decimalScale: 2 });
		inputProps.set(InputBaseProps.propNames.metadata, metadata);
		inputProps.set(InputBaseProps.propNames.onBlur, onBlur);
		inputProps.set(InputBaseProps.propNames.timeoutDelay, 1000);

		const component = <InputBase inputProps={inputProps} />;
		const { container, rerender } = render(component);

		const input = getByDisplayValue(container, "12.2");

		fireEvent.change(input, {
			target: {
				value: "13",
			},
		});

		const inputProps2 = new InputBaseProps();
		inputProps2.set(InputBaseProps.propNames.update, update);
		inputProps2.set(InputBaseProps.propNames.value, "13");
		inputProps2.set(InputBaseProps.propNames.label, aLabel);
		inputProps2.set(InputBaseProps.propNames.type, "AdvancedNumericInput");
		inputProps2.set(InputBaseProps.propNames.numericInputProps, { decimalScale: 2 });
		inputProps2.set(InputBaseProps.propNames.metadata, metadata);
		inputProps2.set(InputBaseProps.propNames.onBlur, onBlur);
		inputProps2.set(InputBaseProps.propNames.timeoutDelay, 1000);

		act(() => {
			rerender(<InputBase inputProps={inputProps2} />);
		});

		// no idea what to assert here, this test is mostly for code coverage
	});
});
