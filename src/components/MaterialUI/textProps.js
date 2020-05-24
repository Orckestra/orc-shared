import ComponentProps from "orc-shared/src/components/MaterialUI/componentProps";

export default class TextProps extends ComponentProps {
	static propNames = {
		classes: "classes",
		align: "align",
		color: "color",
		component: "component",
		display: "display",
		gutterBottom: "gutterBottom",
		noWrap: "noWrap",
		paragraph: "paragraph",
		variant: "variant",
	};

	static ruleNames = {
		root: "root",
		body2: "body2",
		body1: "body1",
		caption: "caption",
		button: "button",
		h1: "h1",
		h2: "h2",
		h3: "h3",
		h4: "h4",
		h5: "h5",
		h6: "h6",
		subtitle1: "subtitle1",
		subtitle2: "subtitle2",
		overline: "overline",
		srOnly: "srOnly",
		alignLeft: "alignLeft",
		alignCenter: "alignCenter",
		alignRight: "alignRight",
		alignJustify: "alignJustify",
		noWrap: "noWrap",
		gutterBottom: "gutterBottom",
		paragraph: "paragraph",
		colorInherit: "colorInherit",
		colorPrimary: "colorPrimary",
		colorSecondary: "colorSecondary",
		colorTextPrimary: "colorTextPrimary",
		colorTextSecondary: "colorTextSecondary",
		colorError: "colorError",
		displayInline: "displayInline",
		displayBlock: "displayBlock",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.classes, this.componentClasses);
		this.componentProps.set(this.constructor.propNames.align, null);
		this.componentProps.set(this.constructor.propNames.color, null);
		this.componentProps.set(this.constructor.propNames.component, null);
		this.componentProps.set(this.constructor.propNames.display, null);
		this.componentProps.set(this.constructor.propNames.gutterBottom, null);
		this.componentProps.set(this.constructor.propNames.noWrap, null);
		this.componentProps.set(this.constructor.propNames.paragraph, null);
		this.componentProps.set(this.constructor.propNames.variant, null);

		this.componentClasses.set(this.constructor.ruleNames.root, null);
		this.componentClasses.set(this.constructor.ruleNames.body2, null);
		this.componentClasses.set(this.constructor.ruleNames.body1, null);
		this.componentClasses.set(this.constructor.ruleNames.caption, null);
		this.componentClasses.set(this.constructor.ruleNames.button, null);
		this.componentClasses.set(this.constructor.ruleNames.h1, null);
		this.componentClasses.set(this.constructor.ruleNames.h2, null);
		this.componentClasses.set(this.constructor.ruleNames.h3, null);
		this.componentClasses.set(this.constructor.ruleNames.h4, null);
		this.componentClasses.set(this.constructor.ruleNames.h5, null);
		this.componentClasses.set(this.constructor.ruleNames.h6, null);
		this.componentClasses.set(this.constructor.ruleNames.subtitle1, null);
		this.componentClasses.set(this.constructor.ruleNames.subtitle2, null);
		this.componentClasses.set(this.constructor.ruleNames.overline, null);
		this.componentClasses.set(this.constructor.ruleNames.srOnly, null);
		this.componentClasses.set(this.constructor.ruleNames.alignLeft, null);
		this.componentClasses.set(this.constructor.ruleNames.alignCenter, null);
		this.componentClasses.set(this.constructor.ruleNames.alignRight, null);
		this.componentClasses.set(this.constructor.ruleNames.alignJustify, null);
		this.componentClasses.set(this.constructor.ruleNames.noWrap, null);
		this.componentClasses.set(this.constructor.ruleNames.gutterBottom, null);
		this.componentClasses.set(this.constructor.ruleNames.paragraph, null);
		this.componentClasses.set(this.constructor.ruleNames.colorInherit, null);
		this.componentClasses.set(this.constructor.ruleNames.colorPrimary, null);
		this.componentClasses.set(this.constructor.ruleNames.colorSecondary, null);
		this.componentClasses.set(this.constructor.ruleNames.colorTextPrimary, null);
		this.componentClasses.set(this.constructor.ruleNames.colorTextSecondary, null);
		this.componentClasses.set(this.constructor.ruleNames.colorError, null);
		this.componentClasses.set(this.constructor.ruleNames.displayInline, null);
		this.componentClasses.set(this.constructor.ruleNames.displayBlock, null);
	}
}

export { TextProps };
