import ComponentProps from "orc-shared/src/components/MaterialUI/componentProps";

class ExpansionPanelProps extends ComponentProps {
	static propNames = {
		classes: "classes",
		defaultExpanded: "defaultExpanded",
		disabled: "disabled",
		expanded: "expanded",
		onChange: "onChange",
		square: "square",
		transitionComponent: "TransitionComponent",
		transitionProps: "TransitionProps",
	};

	static ruleNames = {
		root: "root",
		rounded: "rounded",
		expanded: "expanded",
		disabled: "disabled",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.classes, this.componentClasses);
		this.componentProps.set(this.constructor.propNames.defaultExpanded, null);
		this.componentProps.set(this.constructor.propNames.disabled, null);
		this.componentProps.set(this.constructor.propNames.expanded, null);
		this.componentProps.set(this.constructor.propNames.onChange, null);
		this.componentProps.set(this.constructor.propNames.square, null);
		this.componentProps.set(this.constructor.propNames.TransitionComponent, null);
		this.componentProps.set(this.constructor.propNames.TransitionProps, null);

		this.componentClasses.set(this.constructor.ruleNames.root, null);
		this.componentClasses.set(this.constructor.ruleNames.rounded, null);
		this.componentClasses.set(this.constructor.ruleNames.expanded, null);
		this.componentClasses.set(this.constructor.ruleNames.disabled, null);
	}
}

class ExpansionPanelActionsProps extends ComponentProps {
	static propNames = {
		classes: "classes",
		disableSpacing: "disableSpacing",
	};

	static ruleNames = {
		root: "root",
		spacing: "spacing",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.classes, this.componentClasses);
		this.componentProps.set(this.constructor.propNames.disableSpacing, null);

		this.componentClasses.set(this.constructor.ruleNames.root, null);
		this.componentClasses.set(this.constructor.ruleNames.spacing, null);
	}
}

class ExpansionPanelDetailsProps extends ComponentProps {
	static propNames = {
		classes: "classes",
	};

	static ruleNames = {
		root: "root",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.classes, this.componentClasses);

		this.componentClasses.set(this.constructor.ruleNames.root, null);
	}
}

class ExpansionPanelSummaryProps extends ComponentProps {
	static propNames = {
		classes: "classes",
		expandIcon: "expandIcon",
		IconButtonProps: "IconButtonProps",
	};

	static ruleNames = {
		root: "root",
		expanded: "expanded",
		focused: "focused",
		disabled: "disabled",
		content: "content",
		expandIcon: "expandIcon",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.classes, this.componentClasses);
		this.componentProps.set(this.constructor.propNames.expandIcon, null);
		this.componentProps.set(this.constructor.propNames.IconButtonProps, null);

		this.componentClasses.set(this.constructor.ruleNames.root, null);
		this.componentClasses.set(this.constructor.ruleNames.expanded, null);
		this.componentClasses.set(this.constructor.ruleNames.focused, null);
		this.componentClasses.set(this.constructor.ruleNames.disabled, null);
		this.componentClasses.set(this.constructor.ruleNames.content, null);
		this.componentClasses.set(this.constructor.ruleNames.expandIcon, null);
	}
}

export {
	ExpansionPanelProps,
	ExpansionPanelActionsProps,
	ExpansionPanelDetailsProps,
	ExpansionPanelSummaryProps,
};
