import SelectProps from "./SelectProps";

describe("Select Props", () => {
	it("Contains necessary props keys", () => {
		const propNames = ["update", "value"];

		expect(SelectProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in compoennt props map", () => {
		const propNames = ["update", "value"];

		const selectProps = new SelectProps();

		const keys = Array.from(selectProps.componentProps.keys());

		expect(keys, "to equal", propNames);
	});
});
