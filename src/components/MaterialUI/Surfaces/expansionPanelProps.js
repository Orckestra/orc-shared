import ComponentProps from "../componentProps";

class ExpansionPanelProps extends ComponentProps {
	static propNames = {
		defaultExpanded: "defaultExpanded",
		disabled: "disabled",
		expanded: "expanded",
		onChange: "onChange",
	};

	static ruleNames = {
		root: "root"
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.defaultExpanded, null);
		this.componentProps.set(this.constructor.propNames.disabled, null);
		this.componentProps.set(this.constructor.propNames.expanded, null);
		this.componentProps.set(this.constructor.propNames.onChange, null);

		this.componentClasses.set(this.constructor.ruleNames.root, null);
	}
}

class ExpansionPanelActionsProps extends ComponentProps {
	static propNames = {
		disableSpacing: "disableSpacing",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.disableSpacing, null);
	}
}

export { ExpansionPanelProps, ExpansionPanelActionsProps };
