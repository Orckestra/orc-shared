import ComponentProps from "../componentProps";

export class TableProps extends ComponentProps {
	static propNames = {
		withoutTopBorder: "withoutTopBorder",
		stickyHeader: "stickyHeader",
		selectMode: "selectMode",
		onRowClick: "onRowClick",
	};

	constructor() {
		super();

		this.componentProps.set(this.constructor.propNames.withoutTopBorder, null);
		this.componentProps.set(this.constructor.propNames.stickyHeader, null);
		this.componentProps.set(this.constructor.propNames.selectMode, null);
		this.componentProps.set(this.constructor.propNames.onRowClick, null);
	}
}
