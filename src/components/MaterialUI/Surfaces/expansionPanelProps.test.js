import {
	AccordionProps,
	AccordionActionsProps,
	isExpansionPanelProps,
	isExpansionPanelActionsProps,
} from "./expansionPanelProps";

describe("Expansion Panel Props", () => {
	it("Contains necessary prop and rule keys", () => {
		const propNames = ["defaultExpanded", "disabled", "expanded", "onChange", "constrained"];
		const rulesNames = ["root", "summaryRoot", "summaryExpanded", "details", "actions"];

		expect(AccordionProps.propNames, "to have keys", propNames);
		expect(AccordionProps.ruleNames, "to have keys", rulesNames);
	});

	it("Puts keys in component prop and rule maps", () => {
		const propNames = ["defaultExpanded", "disabled", "expanded", "onChange", "constrained"];
		const rulesNames = ["root", "summaryRoot", "summaryExpanded", "details", "actions"];

		const expansionPanelProps = new AccordionProps();

		const propsKeys = Array.from(expansionPanelProps.componentProps.keys());
		const classesKeys = Array.from(expansionPanelProps.componentClasses.keys());

		expect(propsKeys, "to equal", propNames);
		expect(classesKeys, "to equal", rulesNames);
	});
});

describe("Expansion Panel Actions Props", () => {
	it("Contains necessary props keys", () => {
		const propNames = ["disableSpacing"];

		expect(AccordionActionsProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in component props map", () => {
		const propNames = ["disableSpacing"];

		const expansionPanelActionsProps = new AccordionActionsProps();

		const keys = Array.from(expansionPanelActionsProps.componentProps.keys());

		expect(keys, "to equal", propNames);
	});
});

describe("isExpansionPanelProps", () => {
	it("Returns true if passed value is null", () => {
		expect(isExpansionPanelProps(null), "to be true");
	});

	it("Returns false if passed value is not object", () => {
		expect(isExpansionPanelProps("Not object"), "to be false");
	});

	it("Returns true if passed value type is AccordionProps", () => {
		expect(isExpansionPanelProps(new AccordionProps()), "to be true");
	});

	it("Returns true if passed value has property _isExpansionPanelProps and it's true", () => {
		expect(isExpansionPanelProps({ _isExpansionPanelProps: true }), "to be true");
	});

	it("Returns false if passed value has property _isExpansionPanelProps and it's false or missing", () => {
		expect(isExpansionPanelProps({}), "to be false");
		expect(isExpansionPanelProps({ _isExpansionPanelProps: false }), "to be false");
	});
});

describe("isExpansionPanelActionsProps", () => {
	it("Returns true if passed value is null", () => {
		expect(isExpansionPanelActionsProps(null), "to be true");
	});

	it("Returns false if passed value is not object", () => {
		expect(isExpansionPanelActionsProps("Not object"), "to be false");
	});

	it("Returns true if passed value type is AccordionActionsProps", () => {
		expect(isExpansionPanelActionsProps(new AccordionActionsProps()), "to be true");
	});

	it("Returns true if passed value has property _isExpansionPanelActionsProps and it's true", () => {
		expect(isExpansionPanelActionsProps({ _isExpansionPanelActionsProps: true }), "to be true");
	});

	it("Returns false if passed value has property _isExpansionPanelActionsProps and it's false or missing", () => {
		expect(isExpansionPanelActionsProps({}), "to be false");
		expect(isExpansionPanelActionsProps({ _isExpansionPanelActionsProps: false }), "to be false");
	});
});
