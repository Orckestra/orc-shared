import TableProps, { isTableProps } from "./TableProps";

describe("TableProps Props", () => {
	it("Contains necessary props keys", () => {
		const propNames = [
			"withoutTopBorder",
			"stickyHeader",
			"selectMode",
			"onRowClick",
			"classes",
			"deepPropsComparation",
		];

		const ruleNames = ["tableHeader", "tableRow", "tableCell", "headerCell", "tableContainer", "container", "table"];

		expect(TableProps.propNames, "to have keys", propNames);
		expect(TableProps.ruleNames, "to have keys", ruleNames);
	});

	it("Puts keys in component props map", () => {
		const propNames = [
			"withoutTopBorder",
			"stickyHeader",
			"selectMode",
			"onRowClick",
			"classes",
			"deepPropsComparation",
		];

		const ruleNames = ["tableHeader", "tableRow", "tableCell", "headerCell", "tableContainer", "container", "table"];

		const tableProps = new TableProps();

		const keys = Array.from(tableProps.componentProps.keys());
		const keysRuleNames = Array.from(tableProps.componentClasses.keys());

		expect(keys, "to equal", propNames);
		expect(keysRuleNames, "to equal", ruleNames);
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
