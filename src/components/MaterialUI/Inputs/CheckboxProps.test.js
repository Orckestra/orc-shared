import CheckboxProps from "./CheckboxProps";

describe("Checkbox Props", () => {
	it("Contains necessary props keys", () => {
		const propNames = ["update", "value", "label"];

		expect(CheckboxProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in component props map", () => {
		const propNames = ["update", "value", "label"];

		const checkboxProps = new CheckboxProps();

		const keys = Array.from(checkboxProps.componentProps.keys());

		expect(keys, "to equal", propNames);
	});
});
