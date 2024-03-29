import InputBaseProps, { isInputProps } from "./InputBaseProps";

describe("InputBase Props", () => {
	it("Contains necessary props keys", () => {
		const propNames = [
			"update",
			"value",
			"placeholder",
			"type",
			"label",
			"error",
			"errorPosition",
			"inputAttributes",
			"disabled",
			"multiline",
			"onBlur",
			"startAdornment",
			"endAdornment",
			"metadata",
			"autoComplete",
			"timeoutDelay",
			"rows",
			"numericInputProps",
		];

		expect(InputBaseProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in component props map", () => {
		const propNames = [
			"update",
			"value",
			"placeholder",
			"type",
			"label",
			"error",
			"errorPosition",
			"inputAttributes",
			"disabled",
			"multiline",
			"onBlur",
			"startAdornment",
			"endAdornment",
			"metadata",
			"autoComplete",
			"timeoutDelay",
			"rows",
			"numericInputProps",
		];

		const ruleNames = ["input", "errorText"];

		const inputProps = new InputBaseProps();

		const keys = Array.from(inputProps.componentProps.keys());
		const keysRuleNames = Array.from(inputProps.componentClasses.keys());

		expect(keys, "to equal", propNames);
		expect(keysRuleNames, "to equal", ruleNames);
	});
});

describe("isInputProps", () => {
	it("Returns true if passed value is null", () => {
		expect(isInputProps(null), "to be true");
	});

	it("Returns false if passed value is not object", () => {
		expect(isInputProps("Not object"), "to be false");
	});

	it("Returns true if passed value type is InputBaseProps", () => {
		expect(isInputProps(new InputBaseProps()), "to be true");
	});

	it("Returns true if passed value has property _isInputProps and it's true", () => {
		expect(isInputProps({ _isInputProps: true }), "to be true");
	});

	it("Returns false if passed value has property _isInputProps and it's false or missing", () => {
		expect(isInputProps({}), "to be false");
		expect(isInputProps({ _isInputProps: false }), "to be false");
	});
});
