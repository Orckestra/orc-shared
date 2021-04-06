import RadioProps, { isRadioProps } from "./RadioProps";

describe("Select Props", () => {
	const propNames = ["update", "value", "defaultVal", "label", "row", "name", "radios", "disabled"];

	it("Contains necessary props keys", () => expect(RadioProps.propNames, "to have keys", propNames));

	it("Puts keys in component props map", () => {
		const radioProps = new RadioProps();
		const keys = Array.from(radioProps.componentProps.keys());
		expect(keys, "to equal", propNames);
	});
});

describe("isRadioProps", () => {
	it("Returns true if passed value is null", () => {
		expect(isRadioProps(null), "to be false");
	});

	it("Returns false if passed value is not object", () => {
		expect(isRadioProps("Not object"), "to be false");
	});

	it("Returns true if passed value type is RadioProps", () => {
		expect(isRadioProps(new RadioProps()), "to be true");
	});

	it("Returns true if passed value has property _isRadioProps and it's true", () => {
		expect(isRadioProps({ _isRadioProps: true }), "to be true");
	});

	it("Returns false if passed value has property _isRadioProps and it's false or missing", () => {
		expect(isRadioProps({}), "to be false");
		expect(isRadioProps({ _isRadioProps: false }), "to be false");
	});
});
