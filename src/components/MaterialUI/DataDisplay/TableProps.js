import ComponentProps from "../componentProps";

class TableProps extends ComponentProps {
	static propNames = {
		withoutTopBorder: "withoutTopBorder",
		stickyHeader: "stickyHeader",
		selectMode: "selectMode",
		onRowClick: "onRowClick",
		classes: "classes",
	};

	constructor() {
		super();

		this.componentProps.set(this.constructor.propNames.withoutTopBorder, null);
		this.componentProps.set(this.constructor.propNames.stickyHeader, null);
		this.componentProps.set(this.constructor.propNames.selectMode, null);
		this.componentProps.set(this.constructor.propNames.onRowClick, null);
		this.componentProps.set(this.constructor.propNames.classes, null);

		this._isTableProps = true;
	}
}

export const isTableProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof TableProps || value._isTableProps === true);
};

export default TableProps;
