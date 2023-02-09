import React from "react";
import { mount } from "enzyme";
import ExpansionPanel from "./ExpansionPanel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionActions from "@mui/material/AccordionActions";
import { AcordionProps, AcordionActionsProps } from "./expansionPanelProps";
import { ignoreConsoleError } from "../../../utils/testUtils";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import StylesProvider from "@mui/styles/StylesProvider";
import { createMuiTheme } from "./../../../utils/testUtils";

describe("Expansion Panel", () => {
	it("Renders Expansion Panel with actions if actions are not null", () => {
		const header = <p>Header</p>;
		const content = <p>Content</p>;
		const actions = <p>Actions</p>;
		const component = (
			<StylesProvider>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<ExpansionPanel header={header} content={content} actions={actions} />
					</ThemeProvider>
				</StyledEngineProvider>
			</StylesProvider>
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
			<StylesProvider>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<ExpansionPanel header={header} content={content} actions={actions} />
					</ThemeProvider>
				</StyledEngineProvider>
			</StylesProvider>
		);
		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiAccordionActions-root"), "to be truthy");
	});

	it("Not renders Expansion Panel Actions if actions are null", () => {
		const header = <p>Header</p>;
		const content = <p>Content</p>;
		const component = (
			<StylesProvider>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<ExpansionPanel header={header} content={content} />
					</ThemeProvider>
				</StyledEngineProvider>
			</StylesProvider>
		);
		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiAccordionActions-root"), "to be falsy");
	});

	it("Fails if expansionPanelProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = (
				<StylesProvider>
					<StyledEngineProvider injectFirst>
						<ThemeProvider theme={createMuiTheme()}>
							<ExpansionPanel expansionPanelProps="Wrong type" />
						</ThemeProvider>
					</StyledEngineProvider>
				</StylesProvider>
			);
			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(error, "to have message", "expansionPanelProps property is not of type AcordionProps");
			});
		});
	});

	it("Fails if expansionPanelActionsProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = (
				<StylesProvider>
					<StyledEngineProvider injectFirst>
						<ThemeProvider theme={createMuiTheme()}>
							<ExpansionPanel expansionPanelActionsProps="Wrong type" />
						</ThemeProvider>
					</StyledEngineProvider>
				</StylesProvider>
			);
			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(error, "to have message", "expansionPanelActionsProps property is not of type AcordionActionsProps");
			});
		});
	});

	it("Uses expansionPanelProps.expanded correctly", () => {
		const expansionPanelProps = new AcordionProps();

		expansionPanelProps.set(AcordionProps.propNames.expanded, true);

		const component = (
			<StylesProvider>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<ExpansionPanel expansionPanelProps={expansionPanelProps} />
					</ThemeProvider>
				</StyledEngineProvider>
			</StylesProvider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-expanded"), "to be truthy");
	});

	it("Uses expansionPanelProps.disabled correctly", () => {
		const expansionPanelProps = new AcordionProps();

		expansionPanelProps.set(AcordionProps.propNames.disabled, true);

		const component = (
			<StylesProvider>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<ExpansionPanel expansionPanelProps={expansionPanelProps} />
					</ThemeProvider>
				</StyledEngineProvider>
			</StylesProvider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-disabled"), "to be truthy");
	});

	it("Default value for disabled property is correct if expansionPanelProps wasn't passed", () => {
		const component = (
			<StylesProvider>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<ExpansionPanel />
					</ThemeProvider>
				</StyledEngineProvider>
			</StylesProvider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-disabled"), "to be falsy");
	});

	it("Default value for disabled property is correct if expansionPanelProps was passed without setting that", () => {
		const expansionPanelProps = new AcordionProps();

		const component = (
			<StylesProvider>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<ExpansionPanel expansionPanelProps={expansionPanelProps} />
					</ThemeProvider>
				</StyledEngineProvider>
			</StylesProvider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-disabled"), "to be falsy");
	});

	it("Uses expansionPanelActionsProps.disableSpacing correctly", () => {
		const actions = <p>Actions</p>;
		const expansionPanelActionsProps = new AcordionActionsProps();

		expansionPanelActionsProps.set(AcordionActionsProps.propNames.disableSpacing, true);

		const component = (
			<StylesProvider>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<ExpansionPanel actions={actions} expansionPanelActionsProps={expansionPanelActionsProps} />
					</ThemeProvider>
				</StyledEngineProvider>
			</StylesProvider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiAccordionActions-spacing"), "to be falsy");
	});

	it("DisableSpacing value for disabled property is correct if expansionPanelActionsProps wasn't passed", () => {
		const actions = <p>Actions</p>;

		const component = (
			<StylesProvider>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<ExpansionPanel actions={actions} />
					</ThemeProvider>
				</StyledEngineProvider>
			</StylesProvider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiAccordionActions-spacing"), "to be truthy");
	});

	it("Classes are added properly when constrained property of expansionPanelProps is true", () => {
		const expansionPanelProps = new AcordionProps();
		expansionPanelProps.set(AcordionProps.propNames.constrained, true);

		const component = (
			<StylesProvider>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<ExpansionPanel expansionPanelProps={expansionPanelProps} />
					</ThemeProvider>
				</StyledEngineProvider>
			</StylesProvider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".makeStyles-constrainedSummaryRoot-49"), "to be truthy");
		expect(mountedComponent.exists(".makeStyles-constrainedSummaryContent-50"), "to be truthy");
	});

	it("DisableSpacing value for disabled property is correct if expansionPanelActionsProps was passed without setting that", () => {
		const actions = <p>Actions</p>;
		const expansionPanelActionsProps = new AcordionActionsProps();

		const component = (
			<StylesProvider>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<ExpansionPanel actions={actions} expansionPanelActionsProps={expansionPanelActionsProps} />
					</ThemeProvider>
				</StyledEngineProvider>
			</StylesProvider>
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
			<StylesProvider>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<ExpansionPanel header={header} content={content} actions={actions} expansionPanelId={expansionPanelId} />
					</ThemeProvider>
				</StyledEngineProvider>
			</StylesProvider>
		);
		const mountedComponent = mount(component);

		mountedComponent.find(AccordionSummary).simulate("click");

		expect(mountedComponent.exists(".Mui-expanded"), "to be false");
	});
});
