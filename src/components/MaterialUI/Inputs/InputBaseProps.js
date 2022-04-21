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
		disabled: "disabled",
		multiline: "multiline",
		onBlur: "onBlur",
		startAdornment: "startAdornment",
		endAdornment: "endAdornment",
		metadata: "metadata",
		autoComplete: "autoComplete",
		timeoutDelay: "timeoutDelay",
		rows: "rows",
	};

	static ruleNames = {
		input: "input",
		errorText: "errorText",
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
		this.componentProps.set(this.constructor.propNames.disabled, null);
		this.componentProps.set(this.constructor.propNames.multiline, null);
		this.componentProps.set(this.constructor.propNames.onBlur, null);
		this.componentProps.set(this.constructor.propNames.startAdornment, null);
		this.componentProps.set(this.constructor.propNames.endAdornment, null);
		this.componentProps.set(this.constructor.propNames.metadata, null);
		this.componentProps.set(this.constructor.propNames.autoComplete, null);
		this.componentProps.set(this.constructor.propNames.timeoutDelay, null);
		this.componentProps.set(this.constructor.propNames.rows, null);

		this.componentClasses.set(this.constructor.ruleNames.input, null);
		this.componentClasses.set(this.constructor.ruleNames.errorText, null);

		this._isInputProps = true;
	}
}

export const isInputProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof InputBaseProps || value._isInputProps === true);
};

export default InputBaseProps;
