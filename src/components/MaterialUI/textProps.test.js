import TextProps, { isTextProps } from "./textProps";

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

describe("isTextProps", () => {
	it("Returns true if passed value is null", () => {
		expect(isTextProps(null), "to be true");
	});

	it("Returns false if passed value is not object", () => {
		expect(isTextProps("Not object"), "to be false");
	});

	it("Returns true if passed value type is TextProps", () => {
		expect(isTextProps(new TextProps()), "to be true");
	});

	it("Returns true if passed value has property _isTextProps and it's true", () => {
		expect(isTextProps({ _isTextProps: true }), "to be true");
	});

	it("Returns false if passed value has property _isTextProps and it's false or missing", () => {
		expect(isTextProps({}), "to be false");
		expect(isTextProps({ _isTextProps: false }), "to be false");
	});
});
