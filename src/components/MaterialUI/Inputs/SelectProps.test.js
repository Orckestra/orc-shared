import SelectProps from "./SelectProps";

describe("Select Props", () => {
	it("Contains necessary props keys", () => {
		const propNames = ["update", "value", "sortType", "showAllValue", "showAllLabel"];

		expect(SelectProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in component props map", () => {
		const propNames = ["update", "value", "sortType", "showAllValue", "showAllLabel"];

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
