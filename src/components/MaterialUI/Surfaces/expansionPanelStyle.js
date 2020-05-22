import RulesNames from "orc-shared/src/components/MaterialUI/ruleNames";
import ComponentStyle from "./../componentStyle";

class ExpansionPanelStyle extends ComponentStyle {
	constructor() {
		super();
		this.componentStyles.set(RulesNames.root, null);
		this.componentStyles.set(RulesNames.rounded, null);
		this.componentStyles.set(RulesNames.expanded, null);
		this.componentStyles.set(RulesNames.disabled, null);
	}
}

class ExpansionPanelActionsStyle extends ComponentStyle {
	constructor() {
		super();
		this.componentStyles.set(RulesNames.root, null);
		this.componentStyles.set(RulesNames.spacing, null);
	}
}

class ExpansionPanelDetailsStyle extends ComponentStyle {
	constructor() {
		super();
		this.componentStyles.set(RulesNames.root, null);
	}
}

class ExpansionPanelSummaryStyle extends ComponentStyle {
	constructor() {
		super();
		this.componentStyles.set(RulesNames.root, null);
		this.componentStyles.set(RulesNames.expanded, null);
		this.componentStyles.set(RulesNames.focused, null);
		this.componentStyles.set(RulesNames.disabled, null);
		this.componentStyles.set(RulesNames.content, null);
		this.componentStyles.set(RulesNames.expandIcon, null);
	}
}

export {
	ExpansionPanelStyle,
	ExpansionPanelActionsStyle,
	ExpansionPanelDetailsStyle,
	ExpansionPanelSummaryStyle,
};
