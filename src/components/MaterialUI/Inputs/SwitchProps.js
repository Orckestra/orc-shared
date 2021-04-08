import ComponentProps from "../componentProps";

class SwitchProps extends ComponentProps {
	static propNames = {
		update: "update",
		value: "value",
		onCaption: "onCaption",
		offCaption: "offCaption",
		disabled: "disabled",
		readOnly: "readOnly",
		className: "className",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.update, null);
		this.componentProps.set(this.constructor.propNames.value, null);
		this.componentProps.set(this.constructor.propNames.onCaption, null);
		this.componentProps.set(this.constructor.propNames.offCaption, null);
		this.componentProps.set(this.constructor.propNames.disabled, null);
		this.componentProps.set(this.constructor.propNames.readOnly, null);
		this.componentProps.set(this.constructor.propNames.className, null);

		this._isSwitchProps = true;
	}
}

export const isSwitchProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof SwitchProps || value._isSwitchProps === true);
};

export default SwitchProps;
