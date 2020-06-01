import React from "react";
import { mount } from "enzyme";
import SectionExpansionPanel from "./SectionExpansionPanel";
import ExpansionPanelMui from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import { ExpansionPanelProps, ExpansionPanelActionsProps } from "./expansionPanelProps";

describe("Section Expansion Panel", () => {
	it("Renders Section Expansion Panel", () => {
		let header = <p>Header</p>;
		let content = <p>Content</p>;
		let actions = <p>Actions</p>;
		let component = (
			<SectionExpansionPanel header={header} content={content} actions={actions} />
		);
		let mountedComponent = mount(component);
		let expected = (
			<ExpansionPanelMui>
				<ExpansionPanelSummary>{header}</ExpansionPanelSummary>
				<ExpansionPanelDetails>{content}</ExpansionPanelDetails>
				<ExpansionPanelActions>{actions}</ExpansionPanelActions>
			</ExpansionPanelMui>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Fails if expansionPanelProps has wrong type", () => {
		let component = <SectionExpansionPanel />;
		let mountedComponent = () => {
			component.props.expansionPanelProps = "Wrong type";

			return mount(component);
		};
		expect(mountedComponent, "to throw a", TypeError);
	});

	it("Fails if expansionPanelActionsProps has wrong type", () => {
		let component = <SectionExpansionPanel />;

		let mountedComponent = () => {
			component.props.expansionPanelActionsProps = "Wrong type";

			return mount(component);
		};

		expect(mountedComponent, "to throw a", TypeError);
	});

	it("Uses expansionPanelProps.expanded correctly", () => {
		let expansionPanelProps = new ExpansionPanelProps();

		expansionPanelProps.set(ExpansionPanelProps.propNames.expanded, true);

		let component = <SectionExpansionPanel expansionPanelProps={expansionPanelProps} />;

		let mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-expanded"), "to be truthy");
	});

	it("Uses expansionPanelProps.disabled correctly", () => {
		let expansionPanelProps = new ExpansionPanelProps();

		expansionPanelProps.set(ExpansionPanelProps.propNames.disabled, true);

		let component = <SectionExpansionPanel expansionPanelProps={expansionPanelProps} />;

		let mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-disabled"), "to be truthy");
	});

	it("Uses expansionPanelProps.onChange correctly", () => {
		let expanded = false;

		let onChange = value => {
			expanded = value;
		};

		let expansionPanelProps = new ExpansionPanelProps();

		expansionPanelProps.set(ExpansionPanelProps.propNames.onChange, onChange);

		let component = <SectionExpansionPanel expansionPanelProps={expansionPanelProps} />;

		let mountedComponent = mount(component);

		let exp = mountedComponent.find(ExpansionPanelMui);

		exp.props().onChange(true);

		expect(expanded, "to be truthy");
	});

	it("Uses expansionPanelActionsProps.disableSpacing correctly", () => {
		let expansionPanelActionsProps = new ExpansionPanelActionsProps();

		expansionPanelActionsProps.set(
			ExpansionPanelActionsProps.propNames.disableSpacing,
			true,
		);

		let component = (
			<SectionExpansionPanel expansionPanelActionsProps={expansionPanelActionsProps} />
		);

		let mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiExpansionPanelActions-spacing"), "to be falsy");
	});
});
