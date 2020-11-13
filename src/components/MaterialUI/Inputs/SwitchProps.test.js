import SwitchProps, { isSwitchProps } from "./SwitchProps";

describe("Switch Props", () => {
	it("Contains necessary props keys", () => {
		const propNames = ["update", "value", "onCaption", "offCaption", "disabled"];

		expect(SwitchProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in component props map", () => {
		const propNames = ["update", "value", "onCaption", "offCaption", "disabled"];

		const switchProps = new SwitchProps();

		const keys = Array.from(switchProps.componentProps.keys());

		expect(keys, "to equal", propNames);
	});
});

describe("isSwitchProps", () => {
	it("Returns true if passed value is null", () => {
		expect(isSwitchProps(null), "to be true");
	});

	it("Returns false if passed value is not object", () => {
		expect(isSwitchProps("Not object"), "to be false");
	});

	it("Returns true if passed value type is SwitchProps", () => {
		expect(isSwitchProps(new SwitchProps()), "to be true");
	});

	it("Returns true if passed value has property _isSwitchProps and it's true", () => {
		expect(isSwitchProps({ _isSwitchProps: true }), "to be true");
	});

	it("Returns false if passed value has property _isSwitchProps and it's false or missing", () => {
		expect(isSwitchProps({}), "to be false");
		expect(isSwitchProps({ _isSwitchProps: false }), "to be false");
	});
});
