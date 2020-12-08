import ComponentProps from "../componentProps";

class InputBaseProps extends ComponentProps {
	static propNames = {
		update: "update",
		value: "value",
		placeholder: "placeholder",
		type: "type",
		label: "label",
		error: "error",
		errorPosition: "errorPosition",
		inputAttributes: "inputAttributes",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.update, null);
		this.componentProps.set(this.constructor.propNames.value, null);
		this.componentProps.set(this.constructor.propNames.placeholder, null);
		this.componentProps.set(this.constructor.propNames.type, null);
		this.componentProps.set(this.constructor.propNames.label, null);
		this.componentProps.set(this.constructor.propNames.error, null);
		this.componentProps.set(this.constructor.propNames.errorPosition, null);
		this.componentProps.set(this.constructor.propNames.inputAttributes, null);

		this._isInputProps = true;
	}
}

export const isInputProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof InputBaseProps || value._isInputProps === true);
};

export default InputBaseProps;
