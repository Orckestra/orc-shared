import ComponentProps from "../componentProps";

class RadioProps extends ComponentProps {
	static propNames = {
		update: "update",
		value: "value",
		defaultVal: "defaultVal",
		label: "label",
		row: "row",
		name: "name",
		radios: "radios",
		disabled: "disabled"
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.update, null);
		this.componentProps.set(this.constructor.propNames.value, null);
		this.componentProps.set(this.constructor.propNames.defaultVal, null);
		this.componentProps.set(this.constructor.propNames.label, null);
		this.componentProps.set(this.constructor.propNames.row, true);
		this.componentProps.set(this.constructor.propNames.name, null);
		this.componentProps.set(this.constructor.propNames.radios, null);
		this.componentProps.set(this.constructor.propNames.disabled, false);

		this._isRadioProps = true;
	}
}

export const isRadioProps = function (value) {
	if (value == null) return false;
	return typeof value === "object" && (value instanceof RadioProps || value._isRadioProps === true);
};

export default RadioProps;
