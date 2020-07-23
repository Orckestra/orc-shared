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
	}
}

export default RadioProps;
