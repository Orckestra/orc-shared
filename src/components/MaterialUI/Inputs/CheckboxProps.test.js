import CheckboxProps, { isCheckboxProps } from "./CheckboxProps";

describe("Checkbox Props", () => {
	it("Contains necessary props keys", () => {
		const propNames = ["update", "value", "label", "readOnly"];

		expect(CheckboxProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in component props map", () => {
		const propNames = ["update", "value", "label", "readOnly"];

		const checkboxProps = new CheckboxProps();

		const keys = Array.from(checkboxProps.componentProps.keys());

		expect(keys, "to equal", propNames);
	});
});

describe("isCheckboxProps", () => {
	it("Returns true if passed value is null", () => {
		expect(isCheckboxProps(null), "to be true");
	});

	it("Returns false if passed value is not object", () => {
		expect(isCheckboxProps("Not object"), "to be false");
	});

	it("Returns true if passed value type is CheckboxProps", () => {
		expect(isCheckboxProps(new CheckboxProps()), "to be true");
	});

	it("Returns true if passed value has property _isCheckboxProps and it's true", () => {
		expect(isCheckboxProps({ _isCheckboxProps: true }), "to be true");
	});

	it("Returns false if passed value has property _isCheckboxProps and it's false or missing", () => {
		expect(isCheckboxProps({}), "to be false");
		expect(isCheckboxProps({ _isCheckboxProps: false }), "to be false");
	});
});
