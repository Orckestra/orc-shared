import ComponentProps from "../componentProps";

class InputProps extends ComponentProps {
	static propNames = {
		update: "update",
		value: "value",
		placeholder: "placeholder",
		type: "type",
		label: "label",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.update, null);
		this.componentProps.set(this.constructor.propNames.value, null);
		this.componentProps.set(this.constructor.propNames.placeholder, null);
		this.componentProps.set(this.constructor.propNames.type, "text");
		this.componentProps.set(this.constructor.propNames.label, null);

		this._isInputProps = true;
	}
}

export const isInputProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof InputProps || value._isInputProps === true);
};

export default InputProps;
