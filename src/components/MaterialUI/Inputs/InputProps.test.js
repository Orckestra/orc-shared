import InputProps, { isInputProps } from "./InputProps";

describe("Input Props", () => {
	it("Contains necessary props keys", () => {
		const propNames = ["update", "value", "placeholder", "type", "label"];

		expect(InputProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in component props map", () => {
		const propNames = ["update", "value", "placeholder", "type", "label"];

		const inputProps = new InputProps();

		const keys = Array.from(inputProps.componentProps.keys());

		expect(keys, "to equal", propNames);
	});
});

describe("isInputProps", () => {
	it("Returns true if passed value is null", () => {
		expect(isInputProps(null), "to be true");
	});

	it("Returns false if passed value is not object", () => {
		expect(isInputProps("Not object"), "to be false");
	});

	it("Returns true if passed value type is InputProps", () => {
		expect(isInputProps(new InputProps()), "to be true");
	});

	it("Returns true if passed value has property _isInputProps and it's true", () => {
		expect(isInputProps({ _isInputProps: true }), "to be true");
	});

	it("Returns false if passed value has property _isInputProps and it's false or missing", () => {
		expect(isInputProps({}), "to be false");
		expect(isInputProps({ _isInputProps: false }), "to be false");
	});
});
