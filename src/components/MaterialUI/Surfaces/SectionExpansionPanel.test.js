import React from "react";
import { mount } from "enzyme";
import SectionExpansionPanel from "./SectionExpansionPanel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionActions from "@mui/material/AccordionActions";
import { AccordionProps, AccordionActionsProps } from "./expansionPanelProps";
import { ignoreConsoleError } from "../../../utils/testUtils";
import { Provider } from "react-redux";
import Immutable from "immutable";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import { createMuiTheme } from "./../../../utils/testUtils";

describe("Section Expansion Panel", () => {
	let state, store;

	beforeEach(() => {
		state = Immutable.fromJS({
			view: {
				ExpPanel123: {
					isExpanded: true,
				},
			},
		});
		store = state => ({
			subscribe: () => {},
			getState: () => state,
			dispatch: () => {},
		});
	});

	it("Renders Section Expansion Panel with actions if actions are not null", () => {
		const header = <p>Header</p>;
		const content = <p>Content</p>;
		const actions = <p>Actions</p>;
		const component = (
			<Provider store={store(state)}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<SectionExpansionPanel header={header} content={content} actions={actions} />
					</ThemeProvider>
				</StyledEngineProvider>
			</Provider>
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

	it("Renders Section Expansion Panel Actions if actions are not null", () => {
		const header = <p>Header</p>;
		const content = <p>Content</p>;
		const actions = <p>Actions</p>;
		const component = (
			<Provider store={store(state)}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<SectionExpansionPanel header={header} content={content} actions={actions} />
					</ThemeProvider>
				</StyledEngineProvider>
			</Provider>
		);
		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiAccordionActions-root"), "to be truthy");
	});

	it("Not renders Section Expansion Panel Actions if actions are null", () => {
		const header = <p>Header</p>;
		const content = <p>Content</p>;
		const component = (
			<Provider store={store(state)}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<SectionExpansionPanel header={header} content={content} />
					</ThemeProvider>
				</StyledEngineProvider>
			</Provider>
		);
		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiAccordionActions-root"), "to be falsy");
	});

	it("Fails if expansionPanelProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = (
				<Provider store={store(state)}>
					<SectionExpansionPanel expansionPanelProps="Wrong type" />
				</Provider>
			);
			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(error, "to have message", "expansionPanelProps property is not of type AccordionProps");
			});
		});
	});

	it("Fails if expansionPanelActionsProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = (
				<Provider store={store(state)}>
					<SectionExpansionPanel expansionPanelActionsProps="Wrong type" />
				</Provider>
			);
			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(error, "to have message", "expansionPanelActionsProps property is not of type AccordionActionsProps");
			});
		});
	});

	it("Uses expansionPanelProps.defaultExpanded correctly", () => {
		const expansionPanelProps = new AccordionProps();

		expansionPanelProps.set(AccordionProps.propNames.defaultExpanded, true);

		const component = (
			<Provider store={store(state)}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<SectionExpansionPanel expansionPanelProps={expansionPanelProps} />
					</ThemeProvider>
				</StyledEngineProvider>
			</Provider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-expanded"), "to be truthy");
	});

	it("Uses expansionPanelProps.disabled correctly", () => {
		const expansionPanelProps = new AccordionProps();

		expansionPanelProps.set(AccordionProps.propNames.disabled, true);

		const component = (
			<Provider store={store(state)}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<SectionExpansionPanel expansionPanelProps={expansionPanelProps} />
					</ThemeProvider>
				</StyledEngineProvider>
			</Provider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-disabled"), "to be truthy");
	});

	it("Default value for disabled property is correct if expansionPanelProps wasn't passed", () => {
		const component = (
			<Provider store={store(state)}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<SectionExpansionPanel />
					</ThemeProvider>
				</StyledEngineProvider>
			</Provider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-disabled"), "to be falsy");
	});

	it("Default value for disabled property is correct if expansionPanelProps was passed without setting that", () => {
		const expansionPanelProps = new AccordionProps();

		const component = (
			<Provider store={store(state)}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<SectionExpansionPanel expansionPanelProps={expansionPanelProps} />
					</ThemeProvider>
				</StyledEngineProvider>
			</Provider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-disabled"), "to be falsy");
	});

	it("Uses expansionPanelActionsProps.disableSpacing correctly", () => {
		const actions = <p>Actions</p>;
		const expansionPanelActionsProps = new AccordionActionsProps();

		expansionPanelActionsProps.set(AccordionActionsProps.propNames.disableSpacing, true);

		const component = (
			<Provider store={store(state)}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<SectionExpansionPanel expansionPanelActionsProps={expansionPanelActionsProps} actions={actions} />
					</ThemeProvider>
				</StyledEngineProvider>
			</Provider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiAccordionActions-spacing"), "to be falsy");
	});

	it("DisableSpacing value for disabled property is correct if expansionPanelActionsProps wasn't passed", () => {
		const actions = <p>Actions</p>;
		const component = (
			<Provider store={store(state)}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<SectionExpansionPanel actions={actions} />
					</ThemeProvider>
				</StyledEngineProvider>
			</Provider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiAccordionActions-spacing"), "to be truthy");
	});

	it("DisableSpacing value for disabled property is correct if expansionPanelActionsProps was passed without setting that", () => {
		const actions = <p>Actions</p>;
		const expansionPanelActionsProps = new AccordionActionsProps();

		const component = (
			<Provider store={store(state)}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<SectionExpansionPanel expansionPanelActionsProps={expansionPanelActionsProps} actions={actions} />
					</ThemeProvider>
				</StyledEngineProvider>
			</Provider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiAccordionActions-spacing"), "to be truthy");
	});

	it("Uses expansionPanelProps.constrained correctly", () => {
		const expansionPanelProps = new AccordionProps();

		expansionPanelProps.set(AccordionProps.propNames.constrained, true);

		const component = (
			<Provider store={store(state)}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<SectionExpansionPanel expansionPanelProps={expansionPanelProps} />
					</ThemeProvider>
				</StyledEngineProvider>
			</Provider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".makeStyles-constrainedSummaryRoot-87"), "to be truthy");
		expect(mountedComponent.exists(".makeStyles-constrainedSummaryContent-88"), "to be truthy");
	});

	it("Default value for constrained property is correct if expansionPanelProps was passed without setting that", () => {
		const expansionPanelProps = new AccordionProps();

		const component = (
			<Provider store={store(state)}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<SectionExpansionPanel expansionPanelProps={expansionPanelProps} />
					</ThemeProvider>
				</StyledEngineProvider>
			</Provider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".makeStyles-constrainedSummaryRoot-96"), "to be falsy");
		expect(mountedComponent.exists(".makeStyles-constrainedSummaryContent-97"), "to be falsy");
	});

	it("handles internal on change function", () => {
		const header = <p>Header</p>;
		const content = <p>Content</p>;
		const actions = <p>Actions</p>;
		const expansionPanelId = "ExpPanel123";
		const component = (
			<Provider store={store(state)}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<SectionExpansionPanel
							header={header}
							content={content}
							actions={actions}
							expansionPanelId={expansionPanelId}
						/>
					</ThemeProvider>
				</StyledEngineProvider>
			</Provider>
		);
		const mountedComponent = mount(component);

		mountedComponent.find(AccordionSummary).simulate("click");

		expect(mountedComponent.exists(".Mui-expanded"), "to be false");
	});
});
