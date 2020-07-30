import ComponentProps from "../componentProps";

class SelectProps extends ComponentProps {
	static propNames = {
		update: "update",
		value: "value",
		numericSort: "numericSort",
		showAllValue: "showAllValue",
		showAllLabel: "showAllLabel"
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.update, null);
		this.componentProps.set(this.constructor.propNames.value, null);
		this.componentProps.set(this.constructor.propNames.numericSort, null);
		this.componentProps.set(this.constructor.propNames.showAllValue, null);
		this.componentProps.set(this.constructor.propNames.showAllLabel, null);
	}
}

export default SelectProps;
