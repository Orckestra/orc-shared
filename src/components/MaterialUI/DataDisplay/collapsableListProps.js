import ComponentProps from "../componentProps";

class CollapsableListProps extends ComponentProps {
	static propNames = {
		isExpanded: "isExpanded",
		hasMessage: "hasMessage",
		openMessage: "openMessage",
		closeMessage: "closeMessage",
		expandPosition: "expandPosition",
		maxContent: "maxContent",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.isExpanded, null);
		this.componentProps.set(this.constructor.propNames.hasMessage, null);
		this.componentProps.set(this.constructor.propNames.openMessage, null);
		this.componentProps.set(this.constructor.propNames.closeMessage, null);
		this.componentProps.set(this.constructor.propNames.expandPosition, null);
		this.componentProps.set(this.constructor.propNames.maxContent, null);

		this._isCollapsableListProps = true;
	}
}

export const isCollapsableListProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof CollapsableListProps || value._isCollapsableListProps === true);
};

export default CollapsableListProps;
