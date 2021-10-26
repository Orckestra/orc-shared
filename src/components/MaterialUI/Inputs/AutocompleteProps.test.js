import AutocompleteProps, { isAutocompleteProps } from "./AutocompleteProps";

describe("Autocomplete Props", () => {
	it("Contains necessary props keys", () => {
		const propNames = ["update", "value", "disabled", "error", "placeholder"];

		expect(AutocompleteProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in component props map", () => {
		const propNames = ["update", "value", "disabled", "error", "placeholder"];

		const autocompleteProps = new AutocompleteProps();

		const keys = Array.from(autocompleteProps.componentProps.keys());

		expect(keys, "to equal", propNames);
	});
});

describe("isAutocompleteProps", () => {
	it("Returns true if passed value is null", () => {
		expect(isAutocompleteProps(null), "to be true");
	});

	it("Returns false if passed value is not object", () => {
		expect(isAutocompleteProps("Not object"), "to be false");
	});

	it("Returns true if passed value type is AutocompleteProps", () => {
		expect(isAutocompleteProps(new AutocompleteProps()), "to be true");
	});

	it("Returns true if passed value has property _isAutocompleteProps and it's true", () => {
		expect(isAutocompleteProps({ _isAutocompleteProps: true }), "to be true");
	});

	it("Returns false if passed value has property _isAutocompleteProps and it's false or missing", () => {
		expect(isAutocompleteProps({}), "to be false");
		expect(isAutocompleteProps({ _isAutocompleteProps: false }), "to be false");
	});
});
