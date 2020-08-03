import ComponentProps from "../componentProps";

export const sortTypeEnum = {
	none: 0,
	default: 1,
	numeric: 2,
};

class SelectProps extends ComponentProps {
	static propNames = {
		update: "update",
		value: "value",
		sortType: "sortType",
		showAllValue: "showAllValue",
		showAllLabel: "showAllLabel",
		classes: "classes",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.update, null);
		this.componentProps.set(this.constructor.propNames.value, null);
		this.componentProps.set(this.constructor.propNames.sortType, null);
		this.componentProps.set(this.constructor.propNames.showAllValue, null);
		this.componentProps.set(this.constructor.propNames.showAllLabel, null);
		this.componentProps.set(this.constructor.propNames.classes, null);
	}
}

export default SelectProps;
