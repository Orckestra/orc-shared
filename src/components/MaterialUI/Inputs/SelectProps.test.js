import SelectProps, { isSelectProps } from "./SelectProps";

describe("Select Props", () => {
	it("Contains necessary props keys", () => {
		const propNames = ["update", "value", "sortType", "showAllValue", "showAllLabel", "positionOverride", "iconSelect"];

		expect(SelectProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in component props map", () => {
		const propNames = ["update", "value", "sortType", "showAllValue", "showAllLabel", "positionOverride", "iconSelect"];

		const selectProps = new SelectProps();

		const keys = Array.from(selectProps.componentProps.keys());

		expect(keys, "to equal", propNames);
	});

	it("Sets the style value to root ruleName", () => {
		const selectProps = new SelectProps();

		const test = "testRoot";
		selectProps.setStyle(SelectProps.ruleNames.root, test);

		expect(selectProps.componentClasses.get("root"), "to equal", test);
	});

	it("Sets the style value to paper ruleName", () => {
		const selectProps = new SelectProps();

		const test = "testPAper";
		selectProps.setStyle(SelectProps.ruleNames.paper, test);

		expect(selectProps.componentClasses.get("paper"), "to equal", test);
	});
});

describe("isSelectProps", () => {
	it("Returns true if passed value is null", () => {
		expect(isSelectProps(null), "to be true");
	});

	it("Returns false if passed value is not object", () => {
		expect(isSelectProps("Not object"), "to be false");
	});

	it("Returns true if passed value type is SelectProps", () => {
		expect(isSelectProps(new SelectProps()), "to be true");
	});

	it("Returns true if passed value has property _isSelectProps and it's true", () => {
		expect(isSelectProps({ _isSelectProps: true }), "to be true");
	});

	it("Returns false if passed value has property _isSelectProps and it's false or missing", () => {
		expect(isSelectProps({}), "to be false");
		expect(isSelectProps({ _isSelectProps: false }), "to be false");
	});
});