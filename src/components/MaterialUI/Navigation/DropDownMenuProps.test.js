import DropDownMenuProps, { isDropDownMenuProps } from "./DropDownMenuProps";

describe("DropDownMenu Props", () => {
	it("Contains necessary props keys", () => {
		const propNames = ["autoFocus", "disabled"];

		expect(DropDownMenuProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in component props map", () => {
		const propNames = ["autoFocus", "disabled"];

		const dropDownMenuProps = new DropDownMenuProps();

		const keys = Array.from(dropDownMenuProps.componentProps.keys());

		expect(keys, "to equal", propNames);
	});
});

describe("isDropDownMenuProps", () => {
	it("Returns true if passed value is null", () => {
		expect(isDropDownMenuProps(null), "to be true");
	});

	it("Returns false if passed value is not object", () => {
		expect(isDropDownMenuProps("Not object"), "to be false");
	});

	it("Returns true if passed value type is DropDownMenuProps", () => {
		expect(isDropDownMenuProps(new DropDownMenuProps()), "to be true");
	});

	it("Returns true if passed value has property _isDropDownMenuProps and it's true", () => {
		expect(isDropDownMenuProps({ _isDropDownMenuProps: true }), "to be true");
	});

	it("Returns false if passed value has property _isDropDownMenuProps and it's false or missing", () => {
		expect(isDropDownMenuProps({}), "to be false");
		expect(isDropDownMenuProps({ _isDropDownMenuProps: false }), "to be false");
	});
});
