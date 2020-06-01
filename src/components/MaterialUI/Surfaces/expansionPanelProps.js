import ComponentProps from "../componentProps";

class ExpansionPanelProps extends ComponentProps {
	static propNames = {
		disabled: "disabled",
		expanded: "expanded",
		onChange: "onChange",
	};

	constructor() {
		super();
		this.componentProps.set(this.constructor.propNames.disabled, null);
		this.componentProps.set(this.constructor.propNames.expanded, null);
		this.componentProps.set(this.constructor.propNames.onChange, null);
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
