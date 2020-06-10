import TextProps from "./textProps";

describe("Text Props", () => {
	it("Sets the style value to body1 ruleName", () => {
		const textProps = new TextProps();

		const test = "testBody1";
		textProps.setStyle(TextProps.ruleNames.body1, test);

		expect(textProps.componentClasses.get("body1"), "to equal", test);
	});

	it("Sets the style value to root ruleName", () => {
		const textProps = new TextProps();

		const test = "testRoot";
		textProps.setStyle(TextProps.ruleNames.root, test);

		expect(textProps.componentClasses.get("root"), "to equal", test);
	});
});
