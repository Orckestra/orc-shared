import TextProps from "./textProps";

describe("Text Props", () => {
	it("Sets the classes property", () => {
		const textProps = new TextProps();

		const test = "testBody1";
		textProps.set(TextProps.propNames.classes, test);

		expect(textProps.componentProps.get("classes"), "to equal", test);
	});

	it("Sets the lineCount property", () => {
		const textProps = new TextProps();

		const lineCount = 2;
		textProps.set(TextProps.propNames.lineCount, lineCount);

		expect(textProps.componentProps.get("lineCount"), "to equal", lineCount);
	});
});
