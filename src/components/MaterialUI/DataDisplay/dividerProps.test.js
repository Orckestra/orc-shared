import DividerProps from "./dividerProps";

describe("Divider Props", () => {
	it("Puts keys in component props map", () => {
		const propNames = ["orientation", "light", "variant", "classes"];

		const dividerProps = new DividerProps();

		const keys = Array.from(dividerProps.componentProps.keys());

		expect(keys, "to equal", propNames);
	});

	it("Sets the style value to root ruleName", () => {
		const dividerProps = new DividerProps();

		const test = "testRoot";
		dividerProps.setStyle(DividerProps.ruleNames.root, test);

		expect(dividerProps.componentClasses.get("root"), "to equal", test);
	});

	it("Sets the style value to light ruleName", () => {
		const dividerProps = new DividerProps();

		const test = "testLight";
		dividerProps.setStyle(DividerProps.ruleNames.light, test);

		expect(dividerProps.componentClasses.get("light"), "to equal", test);
	});

	it("Sets the style value to vertical ruleName", () => {
		const dividerProps = new DividerProps();

		const test = "testVertical";
		dividerProps.setStyle(DividerProps.ruleNames.vertical, test);

		expect(dividerProps.componentClasses.get("vertical"), "to equal", test);
	});

	it("Sets the style value to middle ruleName", () => {
		const dividerProps = new DividerProps();

		const test = "testMiddle";
		dividerProps.setStyle(DividerProps.ruleNames.middle, test);

		expect(dividerProps.componentClasses.get("middle"), "to equal", test);
	});

	it("Sets the style value to inset ruleName", () => {
		const dividerProps = new DividerProps();

		const test = "testInset";
		dividerProps.setStyle(DividerProps.ruleNames.inset, test);

		expect(dividerProps.componentClasses.get("inset"), "to equal", test);
	});
});
