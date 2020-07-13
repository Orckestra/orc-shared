import { TableProps } from "./TableProps";

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
