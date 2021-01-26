import ComponentProps from "../componentProps";

class StandaloneRadioProps extends ComponentProps {
	static propNames = {
		name: "name",
		checked: "checked",
		disabled: "disabled",
		onChange: "onChange",
		size: "size",
		value: "value",
		inputProps: "inputProps",
		readOnly: "readOnly",
	};

	static ruleNames = {
		root: "root",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.name, null);
		this.componentProps.set(this.constructor.propNames.checked, null);
		this.componentProps.set(this.constructor.propNames.disabled, null);
		this.componentProps.set(this.constructor.propNames.onChange, null);
		this.componentProps.set(this.constructor.propNames.size, null);
		this.componentProps.set(this.constructor.propNames.value, null);
		this.componentProps.set(this.constructor.propNames.inputProps, null);
		this.componentProps.set(this.constructor.propNames.readOnly, null);

		this.componentClasses.set(this.constructor.ruleNames.root, null);

		this._isStandaloneRadioProps = true;
	}
}

export const isStandaloneRadioProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof StandaloneRadioProps || value._isStandaloneRadioProps === true);
};

export default StandaloneRadioProps;
