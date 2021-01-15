import TableProps, { isTableProps } from "./TableProps";

describe("TableProps Props", () => {
	it("Contains necessary props keys", () => {
		const propNames = ["withoutTopBorder", "stickyHeader", "selectMode", "onRowClick", "classes"];

		expect(TableProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in component props map", () => {
		const propNames = ["withoutTopBorder", "stickyHeader", "selectMode", "onRowClick", "classes"];

		const tableProps = new TableProps();

		const keys = Array.from(tableProps.componentProps.keys());

		expect(keys, "to equal", propNames);
	});
});

describe("isTableProps", () => {
	it("Returns true if passed value is null", () => {
		expect(isTableProps(null), "to be true");
	});

	it("Returns false if passed value is not object", () => {
		expect(isTableProps("Not object"), "to be false");
	});

	it("Returns true if passed value type is TableProps", () => {
		expect(isTableProps(new TableProps()), "to be true");
	});

	it("Returns true if passed value has property _isTableProps and it's true", () => {
		expect(isTableProps({ _isTableProps: true }), "to be true");
	});

	it("Returns false if passed value has property _isTableProps and it's false or missing", () => {
		expect(isTableProps({}), "to be false");
		expect(isTableProps({ _isTableProps: false }), "to be false");
	});
});