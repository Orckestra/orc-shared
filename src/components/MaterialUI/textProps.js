import ComponentProps from "./componentProps";

class TextProps extends ComponentProps {
	static propNames = {
		classes: "classes",
		lineCount: "lineCount",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.classes, null);
		this.componentProps.set(this.constructor.propNames.lineCount, null);

		this._isTextProps = true;
	}
}

export const isTextProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof TextProps || value._isTextProps === true);
};

export default TextProps;
