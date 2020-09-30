import ComponentProps from "../componentProps";

class CheckboxProps extends ComponentProps {
	static propNames = {
		update: "update",
		value: "value",
		label: "label",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.update, null);
		this.componentProps.set(this.constructor.propNames.value, null);
		this.componentProps.set(this.constructor.propNames.label, null);

		this._isCheckboxProps = true;
	}
}

export const isCheckboxProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof CheckboxProps || value._isCheckboxProps === true);
};

export default CheckboxProps;
