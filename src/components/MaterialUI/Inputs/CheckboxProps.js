import ComponentProps from "../componentProps";

class CheckboxProps extends ComponentProps {
	static propNames = {
		onChange: "onChange",
		indeterminate: "indeterminate",
		update: "update",
		value: "value",
		label: "label",
		readOnly: "readOnly",
		disabled: "disabled",
		metadata: "metadata",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.onChange, null);
		this.componentProps.set(this.constructor.propNames.indeterminate, null);
		this.componentProps.set(this.constructor.propNames.update, null);
		this.componentProps.set(this.constructor.propNames.value, null);
		this.componentProps.set(this.constructor.propNames.label, null);
		this.componentProps.set(this.constructor.propNames.readOnly, null);
		this.componentProps.set(this.constructor.propNames.disabled, null);
		this.componentProps.set(this.constructor.propNames.metadata, null);

		this._isCheckboxProps = true;
	}
}

export const isCheckboxProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof CheckboxProps || value._isCheckboxProps === true);
};

export default CheckboxProps;
