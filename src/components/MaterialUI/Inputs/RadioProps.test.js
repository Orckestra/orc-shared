import RadioProps from "./RadioProps";

describe("Select Props", () => {
	const propNames = ["update", "value", "defaultVal", "label", "row", "name", "radios"];

	it("Contains necessary props keys", () => expect(RadioProps.propNames, "to have keys", propNames));

	it("Puts keys in component props map", () => {
		const radioProps = new RadioProps();
		const keys = Array.from(radioProps.componentProps.keys());
		expect(keys, "to equal", propNames);
	});
});
