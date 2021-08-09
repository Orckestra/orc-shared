import StandaloneRadioProps, { isStandaloneRadioProps } from "./standaloneRadioProps";

describe("Standalone Radio Props", () => {
	it("Contains necessary props and rules keys", () => {
		const propNames = ["name", "checked", "disabled", "onChange", "size", "value", "inputProps", "readOnly"];
		const ruleNames = ["root"];

		expect(StandaloneRadioProps.propNames, "to have keys", propNames);
		expect(StandaloneRadioProps.ruleNames, "to have keys", ruleNames);
	});

	it("Puts keys in component props and rules map", () => {
		const propNames = ["name", "checked", "disabled", "onChange", "size", "value", "inputProps", "readOnly"];
		const ruleNames = ["root"];

		const radioProps = new StandaloneRadioProps();

		const propKeys = Array.from(radioProps.componentProps.keys());
		const ruleKeys = Array.from(radioProps.componentClasses.keys());

		expect(propKeys, "to equal", propNames);
		expect(ruleKeys, "to equal", ruleNames);
	});
});

describe("isStandaloneRadioProps", () => {
	it("Returns true if passed value is null", () => {
		expect(isStandaloneRadioProps(null), "to be true");
	});

	it("Returns false if passed value is not object", () => {
		expect(isStandaloneRadioProps("Not object"), "to be false");
	});

	it("Returns true if passed value type is RadioProps", () => {
		expect(isStandaloneRadioProps(new StandaloneRadioProps()), "to be true");
	});

	it("Returns true if passed value has property _isRadioProps and it's true", () => {
		expect(isStandaloneRadioProps({ _isStandaloneRadioProps: true }), "to be true");
	});

	it("Returns false if passed value has property _isRadioProps and it's false or missing", () => {
		expect(isStandaloneRadioProps({}), "to be false");
		expect(isStandaloneRadioProps({ _isStandaloneRadioPropss: false }), "to be false");
	});
});
