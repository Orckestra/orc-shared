import ComponentProps from "../componentProps";

export const sortTypeEnum = {
	none: 0,
	default: 1,
	numeric: 2,
	alphabetical: 3,
};

class SelectProps extends ComponentProps {
	static propNames = {
		update: "update",
		value: "value",
		sortType: "sortType",
		showAllValue: "showAllValue",
		showAllLabel: "showAllLabel",
		positionOverride: "positionOverride",
		iconSelect: "iconSelect",
		disabled: "disabled",
		error: "error",
		native: "native",
		inputProps: "inputProps",
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
		this.componentProps.set(this.constructor.propNames.positionOverride, null);
		this.componentProps.set(this.constructor.propNames.iconSelect, null);
		this.componentProps.set(this.constructor.propNames.disabled, null);
		this.componentProps.set(this.constructor.propNames.error, null);
		this.componentProps.set(this.constructor.propNames.native, null);
		this.componentProps.set(this.constructor.propNames.inputProps, null);

		this.componentClasses.set(this.constructor.ruleNames.root, null);
		this.componentClasses.set(this.constructor.ruleNames.paper, null);

		this._isSelectProps = true;
	}
}

export const isSelectProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof SelectProps || value._isSelectProps === true);
};

export default SelectProps;
