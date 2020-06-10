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
	}
}

export default CheckboxProps;
