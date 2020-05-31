import React from "react";
import { mount } from "enzyme";
import ExpansionPanel from "./ExpansionPanel";
import ExpansionPanelMui from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import { ExpansionPanelProps, ExpansionPanelActionsProps } from "./expansionPanelProps";

describe("Expansion Panel", () => {
	it("Renders Expansion Panel", () => {
		var header = <p>Header</p>;
		var content = <p>Content</p>;
		var actions = <p>Actions</p>;
		var component = (
			<ExpansionPanel header={header} content={content} actions={actions} />
		);
		var mountedComponent = mount(component);
		var expected = (
			<ExpansionPanelMui>
				<ExpansionPanelSummary>{header}</ExpansionPanelSummary>
				<ExpansionPanelDetails>{content}</ExpansionPanelDetails>
				<ExpansionPanelActions>{actions}</ExpansionPanelActions>
			</ExpansionPanelMui>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Fails if expansionPanelProps has wrong type", () => {
		var component = <ExpansionPanel />;
		var mountedComponent = () => {
			component.props.expansionPanelProps = "Wrong type";

			return mount(component);
		};
		expect(mountedComponent, "to throw");
	});

	it("Fails if expansionPanelActionsProps has wrong type", () => {
		var component = <ExpansionPanel />;

		var mountedComponent = () => {
			component.props.expansionPanelActionsProps = "Wrong type";

			return mount(component);
		};

		expect(mountedComponent, "to throw");
	});

	it("Uses expansionPanelProps.expanded correctly", () => {
		var expansionPanelProps = new ExpansionPanelProps();

		expansionPanelProps.set(ExpansionPanelProps.propNames.expanded, true);

		var component = <ExpansionPanel expansionPanelProps={expansionPanelProps} />;

		var mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-expanded"), "to be truthy");
	});

	it("Uses expansionPanelProps.disabled correctly", () => {
		var expansionPanelProps = new ExpansionPanelProps();

		expansionPanelProps.set(ExpansionPanelProps.propNames.disabled, true);

		var component = <ExpansionPanel expansionPanelProps={expansionPanelProps} />;

		var mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-disabled"), "to be truthy");
	});

	it("Uses expansionPanelProps.onChange correctly", () => {
		var expanded = false;

		var onChange = value => {
			expanded = value;
		};

		var expansionPanelProps = new ExpansionPanelProps();

		expansionPanelProps.set(ExpansionPanelProps.propNames.onChange, onChange);

		var component = <ExpansionPanel expansionPanelProps={expansionPanelProps} />;

		var mountedComponent = mount(component);

		var exp = mountedComponent.find(ExpansionPanelMui);

		exp.props().onChange(true);

		expect(expanded, "to be truthy");
	});

	it("Uses expansionPanelActionsProps.disableSpacing correctly", () => {
		var expansionPanelActionsProps = new ExpansionPanelActionsProps();

		expansionPanelActionsProps.set(
			ExpansionPanelActionsProps.propNames.disableSpacing,
			true,
		);

		var component = (
			<ExpansionPanel expansionPanelActionsProps={expansionPanelActionsProps} />
		);

		var mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiExpansionPanelActions-spacing"), "to be falsy");
	});
});
