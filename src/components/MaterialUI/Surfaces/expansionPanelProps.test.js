import { ExpansionPanelProps, ExpansionPanelActionsProps } from "./expansionPanelProps";

describe("Expansion Panel Props", () => {
	it("Contains necessary props keys", () => {
		let propNames = ["disabled", "expanded", "onChange"];

		expect(ExpansionPanelProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in compoennt props map", () => {
		let propNames = ["disabled", "expanded", "onChange"];

		let expansionPanelProps = new ExpansionPanelProps();

		let keys = Array.from(expansionPanelProps.componentProps.keys());

		expect(keys, "to equal", propNames);
	});
});

describe("Expansion Panel Actions Props", () => {
	it("Contains necessary props keys", () => {
		let propNames = ["disableSpacing"];

		expect(ExpansionPanelActionsProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in compoennt props map", () => {
		let propNames = ["disableSpacing"];

		let expansionPanelActionsProps = new ExpansionPanelActionsProps();

		let keys = Array.from(expansionPanelActionsProps.componentProps.keys());

		expect(keys, "to equal", propNames);
	});
});
