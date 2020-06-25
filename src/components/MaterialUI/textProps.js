import ComponentProps from "./componentProps";

export default class TextProps extends ComponentProps {
	static propNames = {
		classes: "classes",
		lineCount: "lineCount",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.classes, null);
		this.componentProps.set(this.constructor.propNames.lineCount, null);
	}
}

export { TextProps };
