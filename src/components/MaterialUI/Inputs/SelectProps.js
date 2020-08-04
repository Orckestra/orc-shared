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
	};

	static ruleNames = {
		root: "root",
		paper: "paper",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.update, null);
		this.componentProps.set(this.constructor.propNames.value, null);
		this.componentProps.set(this.constructor.propNames.sortType, null);
		this.componentProps.set(this.constructor.propNames.showAllValue, null);
		this.componentProps.set(this.constructor.propNames.showAllLabel, null);

		this.componentClasses.set(this.constructor.ruleNames.root, null);
		this.componentClasses.set(this.constructor.ruleNames.paper, null);
	}
}

export default SelectProps;
