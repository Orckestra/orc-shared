import CheckboxGroupProps, { isCheckboxGroupProps } from "./CheckboxGroupProps";

describe("CheckboxGroup Props", () => {
	it("Contains necessary props keys", () => {
		const propNames = ["update", "value", "label", "readOnly", "disabled", "options", "error"];

		expect(CheckboxGroupProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in component props map", () => {
		const propNames = ["update", "value", "label", "readOnly", "disabled", "options", "error"];

		const checkboxProps = new CheckboxGroupProps();

		const keys = Array.from(checkboxProps.componentProps.keys());

		expect(keys, "to equal", propNames);
	});
});

describe("isCheckboxGroupProps", () => {
	it("Returns true if passed value is null", () => {
		expect(isCheckboxGroupProps(null), "to be true");
	});

	it("Returns false if passed value is not object", () => {
		expect(isCheckboxGroupProps("Not object"), "to be false");
	});

	it("Returns true if passed value type is CheckboxGroupProps", () => {
		expect(isCheckboxGroupProps(new CheckboxGroupProps()), "to be true");
	});

	it("Returns true if passed value has property _isCheckboxGroupProps and it's true", () => {
		expect(isCheckboxGroupProps({ _isCheckboxGroupProps: true }), "to be true");
	});

	it("Returns false if passed value has property _isCheckboxGroupProps and it's false or missing", () => {
		expect(isCheckboxGroupProps({}), "to be false");
		expect(isCheckboxGroupProps({ _isCheckboxGroupProps: false }), "to be false");
	});
});
