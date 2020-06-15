import ComponentProps from "../componentProps";

class SelectProps extends ComponentProps {
	static propNames = {
		update: "update",
		value: "value",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.update, null);
		this.componentProps.set(this.constructor.propNames.value, null);
	}
}

export default SelectProps;
