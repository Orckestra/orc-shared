import React from "react";
import { mount } from "enzyme";
import ExpansionPanel from "./ExpansionPanel";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionActions from "@material-ui/core/AccordionActions";
import { ExpansionPanelProps, ExpansionPanelActionsProps } from "./expansionPanelProps";
import { ignoreConsoleError } from "../../../utils/testUtils";
import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "./../../../utils/testUtils";

describe("Expansion Panel", () => {
	it("Renders Expansion Panel with actions if actions are not null", () => {
		const header = <p>Header</p>;
		const content = <p>Content</p>;
		const actions = <p>Actions</p>;
		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<ExpansionPanel header={header} content={content} actions={actions} />
			</MuiThemeProvider>
		);
		const mountedComponent = mount(component);
		const expected = (
			<Accordion>
				<AccordionSummary>{header}</AccordionSummary>
				<AccordionDetails>{content}</AccordionDetails>
				<AccordionActions>{actions}</AccordionActions>
			</Accordion>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Renders Expansion Panel Actions if actions are not null", () => {
		const header = <p>Header</p>;
		const content = <p>Content</p>;
		const actions = <p>Actions</p>;
		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<ExpansionPanel header={header} content={content} actions={actions} />
			</MuiThemeProvider>
		);
		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiAccordionActions-root"), "to be truthy");
	});

	it("Not renders Expansion Panel Actions if actions are null", () => {
		const header = <p>Header</p>;
		const content = <p>Content</p>;
		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<ExpansionPanel header={header} content={content} />
			</MuiThemeProvider>
		);
		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiAccordionActions-root"), "to be falsy");
	});

	it("Fails if expansionPanelProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = (
				<MuiThemeProvider theme={createMuiTheme()}>
					<ExpansionPanel expansionPanelProps="Wrong type" />
				</MuiThemeProvider>
			);
			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(error, "to have message", "expansionPanelProps property is not of type ExpansionPanelProps");
			});
		});
	});

	it("Fails if expansionPanelActionsProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = (
				<MuiThemeProvider theme={createMuiTheme()}>
					<ExpansionPanel expansionPanelActionsProps="Wrong type" />
				</MuiThemeProvider>
			);
			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(
					error,
					"to have message",
					"expansionPanelActionsProps property is not of type ExpansionPanelActionsProps",
				);
			});
		});
	});

	it("Uses expansionPanelProps.expanded correctly", () => {
		const expansionPanelProps = new ExpansionPanelProps();

		expansionPanelProps.set(ExpansionPanelProps.propNames.expanded, true);

		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<ExpansionPanel expansionPanelProps={expansionPanelProps} />
			</MuiThemeProvider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-expanded"), "to be truthy");
	});

	it("Uses expansionPanelProps.disabled correctly", () => {
		const expansionPanelProps = new ExpansionPanelProps();

		expansionPanelProps.set(ExpansionPanelProps.propNames.disabled, true);

		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<ExpansionPanel expansionPanelProps={expansionPanelProps} />
			</MuiThemeProvider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-disabled"), "to be truthy");
	});

	it("Default value for disabled property is correct if expansionPanelProps wasn't passed", () => {
		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<ExpansionPanel />
			</MuiThemeProvider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-disabled"), "to be falsy");
	});

	it("Default value for disabled property is correct if expansionPanelProps was passed without setting that", () => {
		const expansionPanelProps = new ExpansionPanelProps();

		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<ExpansionPanel expansionPanelProps={expansionPanelProps} />
			</MuiThemeProvider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-disabled"), "to be falsy");
	});

	it("Uses expansionPanelActionsProps.disableSpacing correctly", () => {
		const actions = <p>Actions</p>;
		const expansionPanelActionsProps = new ExpansionPanelActionsProps();

		expansionPanelActionsProps.set(ExpansionPanelActionsProps.propNames.disableSpacing, true);

		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<ExpansionPanel actions={actions} expansionPanelActionsProps={expansionPanelActionsProps} />
			</MuiThemeProvider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiAccordionActions-spacing"), "to be falsy");
	});

	it("DisableSpacing value for disabled property is correct if expansionPanelActionsProps wasn't passed", () => {
		const actions = <p>Actions</p>;

		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<ExpansionPanel actions={actions} />
			</MuiThemeProvider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiAccordionActions-spacing"), "to be truthy");
	});

	it("Classes are added properly when constrained property of expansionPanelProps is true", () => {
		const expansionPanelProps = new ExpansionPanelProps();
		expansionPanelProps.set(ExpansionPanelProps.propNames.constrained, true);

		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<ExpansionPanel expansionPanelProps={expansionPanelProps} />
			</MuiThemeProvider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".makeStyles-constrainedSummaryRoot-49"), "to be truthy");
		expect(mountedComponent.exists(".makeStyles-constrainedSummaryContent-50"), "to be truthy");
	});

	it("DisableSpacing value for disabled property is correct if expansionPanelActionsProps was passed without setting that", () => {
		const actions = <p>Actions</p>;
		const expansionPanelActionsProps = new ExpansionPanelActionsProps();

		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<ExpansionPanel actions={actions} expansionPanelActionsProps={expansionPanelActionsProps} />
			</MuiThemeProvider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiAccordionActions-spacing"), "to be truthy");
	});

	it("handles internal on change function", () => {
		const header = <p>Header</p>;
		const content = <p>Content</p>;
		const actions = <p>Actions</p>;
		const expansionPanelId = "ExpPanel123";
		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<ExpansionPanel header={header} content={content} actions={actions} expansionPanelId={expansionPanelId} />
			</MuiThemeProvider>
		);
		const mountedComponent = mount(component);

		mountedComponent.find(AccordionSummary).simulate("click");

		expect(mountedComponent.exists(".Mui-expanded"), "to be false");
	});
});
