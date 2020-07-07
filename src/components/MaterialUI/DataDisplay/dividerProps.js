import ComponentProps from "../componentProps";

class DividerProps extends ComponentProps {
	static propNames = {
		orientation: "orientation",
		light: "light",
		variant: "variant",
	};

	static ruleNames = {
		root: "root",
		light: "light",
		vertical: "vertical",
		middle: "middle",
		inset: "inset",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.orientation, null);
		this.componentProps.set(this.constructor.propNames.light, null);
		this.componentProps.set(this.constructor.propNames.variant, null);

		this.componentClasses.set(this.constructor.ruleNames.root, null);
		this.componentClasses.set(this.constructor.ruleNames.light, null);
		this.componentClasses.set(this.constructor.ruleNames.middle, null);
		this.componentClasses.set(this.constructor.ruleNames.vertical, null);
		this.componentClasses.set(this.constructor.ruleNames.inset, null);
	}
}

export default DividerProps;
