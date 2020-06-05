import TextProps from "./textProps";

describe("Text Props", () => {
	it("Sets the style value", () => {
		const textProps = new TextProps();

		const test = "test";
		textProps.setStyle(TextProps.ruleNames.body1, test);

		expect(textProps.componentClasses.get("body1"), "to equal", test);
	});
});
