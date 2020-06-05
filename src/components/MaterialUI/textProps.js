import ComponentProps from "./componentProps";

export default class TextProps extends ComponentProps {
	static propNames = {
		classes: "classes",
	};

	static ruleNames = {
		root: "root",
		body1: "body1",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.classes, this.componentClasses);

		this.componentClasses.set(this.constructor.ruleNames.root, null);
		this.componentClasses.set(this.constructor.ruleNames.body1, null);
	}
}

export { TextProps };
