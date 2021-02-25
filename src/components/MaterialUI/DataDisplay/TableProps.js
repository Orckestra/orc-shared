import ComponentProps from "../componentProps";

class TableProps extends ComponentProps {
	static propNames = {
		withoutTopBorder: "withoutTopBorder",
		stickyHeader: "stickyHeader",
		selectMode: "selectMode",
		onRowClick: "onRowClick",
		classes: "classes",
		deepPropsComparation: "deepPropsComparation",
	};

	static ruleNames = {
		tableHeader: "tableHeader",
		tableRow: "tableRow",
		tableCell: "tableCell",
		headerCell: "headerCell",
		tableContainer: "tableContainer",
		container: "container",
		table: "table",
	};

	constructor() {
		super();

		this.componentProps.set(this.constructor.propNames.withoutTopBorder, null);
		this.componentProps.set(this.constructor.propNames.stickyHeader, null);
		this.componentProps.set(this.constructor.propNames.selectMode, null);
		this.componentProps.set(this.constructor.propNames.onRowClick, null);
		this.componentProps.set(this.constructor.propNames.classes, null);
		this.componentProps.set(this.constructor.propNames.deepPropsComparation, null);

		this.componentClasses.set(this.constructor.ruleNames.tableHeader, null);
		this.componentClasses.set(this.constructor.ruleNames.tableRow, null);
		this.componentClasses.set(this.constructor.ruleNames.tableCell, null);
		this.componentClasses.set(this.constructor.ruleNames.headerCell, null);
		this.componentClasses.set(this.constructor.ruleNames.tableContainer, null);
		this.componentClasses.set(this.constructor.ruleNames.container, null);
		this.componentClasses.set(this.constructor.ruleNames.table, null);

		this._isTableProps = true;
	}
}

export const isTableProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof TableProps || value._isTableProps === true);
};

export default TableProps;
