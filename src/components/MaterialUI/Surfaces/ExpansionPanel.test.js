import React from "react";
import { mount } from "enzyme";
import ExpansionPanel from "./ExpansionPanel";
import ExpansionPanelMui from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import { ExpansionPanelProps, ExpansionPanelActionsProps } from "./expansionPanelProps";
import { ignoreConsoleError } from "./../../../utils/testUtils";

describe("Expansion Panel", () => {
	it("Renders Expansion Panel", () => {
		const header = <p>Header</p>;
		const content = <p>Content</p>;
		const actions = <p>Actions</p>;
		const component = (
			<ExpansionPanel header={header} content={content} actions={actions} />
		);
		const mountedComponent = mount(component);
		const expected = (
			<ExpansionPanelMui>
				<ExpansionPanelSummary>{header}</ExpansionPanelSummary>
				<ExpansionPanelDetails>{content}</ExpansionPanelDetails>
				<ExpansionPanelActions>{actions}</ExpansionPanelActions>
			</ExpansionPanelMui>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Fails if expansionPanelProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = <ExpansionPanel expansionPanelProps="Wrong type" />;
			expect(() => mount(component), "to throw a", TypeError);
		});
	});

	it("Fails if expansionPanelActionsProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = <ExpansionPanel expansionPanelActionsProps="Wrong type" />;
			expect(() => mount(component), "to throw a", TypeError);
		});
	});

	it("Uses expansionPanelProps.expanded correctly", () => {
		const expansionPanelProps = new ExpansionPanelProps();

		expansionPanelProps.set(ExpansionPanelProps.propNames.expanded, true);

		const component = <ExpansionPanel expansionPanelProps={expansionPanelProps} />;

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-expanded"), "to be truthy");
	});

	it("Uses expansionPanelProps.disabled correctly", () => {
		const expansionPanelProps = new ExpansionPanelProps();

		expansionPanelProps.set(ExpansionPanelProps.propNames.disabled, true);

		const component = <ExpansionPanel expansionPanelProps={expansionPanelProps} />;

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-disabled"), "to be truthy");
	});

	it("Uses expansionPanelProps.onChange correctly", () => {
		let expanded = false;

		const onChange = value => {
			expanded = value;
		};

		const expansionPanelProps = new ExpansionPanelProps();

		expansionPanelProps.set(ExpansionPanelProps.propNames.onChange, onChange);

		const component = <ExpansionPanel expansionPanelProps={expansionPanelProps} />;

		const mountedComponent = mount(component);

		const exp = mountedComponent.find(ExpansionPanelMui);

		exp.props().onChange(true);

		expect(expanded, "to be truthy");
	});

	it("Uses expansionPanelActionsProps.disableSpacing correctly", () => {
		const expansionPanelActionsProps = new ExpansionPanelActionsProps();

		expansionPanelActionsProps.set(
			ExpansionPanelActionsProps.propNames.disableSpacing,
			true,
		);

		const component = (
			<ExpansionPanel expansionPanelActionsProps={expansionPanelActionsProps} />
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiExpansionPanelActions-spacing"), "to be falsy");
	});
});
