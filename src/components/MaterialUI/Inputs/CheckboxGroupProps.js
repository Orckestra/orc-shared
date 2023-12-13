import ComponentProps from "../componentProps";

class CheckboxGroupProps extends ComponentProps {
	static propNames = {
		update: "update",
		value: "value",
		options: "options",
		label: "label",
		readOnly: "readOnly",
		disabled: "disabled",
		error: "error",
		row: "row",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.update, null);
		this.componentProps.set(this.constructor.propNames.value, null);
		this.componentProps.set(this.constructor.propNames.label, null);
		this.componentProps.set(this.constructor.propNames.readOnly, null);
		this.componentProps.set(this.constructor.propNames.disabled, null);
		this.componentProps.set(this.constructor.propNames.options, null);
		this.componentProps.set(this.constructor.propNames.error, null);
		this.componentProps.set(this.constructor.propNames.row, null);

		this._isCheckboxGroupProps = true;
	}
}

export const isCheckboxGroupProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof CheckboxGroupProps || value._isCheckboxGroupProps === true);
};

export default CheckboxGroupProps;
