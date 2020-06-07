import { ExpansionPanelProps, ExpansionPanelActionsProps } from "./expansionPanelProps";

describe("Expansion Panel Props", () => {
	it("Contains necessary props keys", () => {
		const propNames = ["defaultExpanded", "disabled", "expanded", "onChange"];

		expect(ExpansionPanelProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in compoennt props map", () => {
		const propNames = ["defaultExpanded", "disabled", "expanded", "onChange"];

		const expansionPanelProps = new ExpansionPanelProps();

		const keys = Array.from(expansionPanelProps.componentProps.keys());

		expect(keys, "to equal", propNames);
	});
});

describe("Expansion Panel Actions Props", () => {
	it("Contains necessary props keys", () => {
		const propNames = ["disableSpacing"];

		expect(ExpansionPanelActionsProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in compoennt props map", () => {
		const propNames = ["disableSpacing"];

		const expansionPanelActionsProps = new ExpansionPanelActionsProps();

		const keys = Array.from(expansionPanelActionsProps.componentProps.keys());

		expect(keys, "to equal", propNames);
	});
});
