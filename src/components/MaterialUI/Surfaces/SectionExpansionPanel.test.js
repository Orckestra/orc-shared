import React from "react";
import { mount } from "enzyme";
import SectionExpansionPanel from "./SectionExpansionPanel";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionActions from "@material-ui/core/AccordionActions";
import { ExpansionPanelProps, ExpansionPanelActionsProps } from "./expansionPanelProps";
import { ignoreConsoleError } from "../../../utils/testUtils";
import { Provider } from "react-redux";
import Immutable from "immutable";
import { MuiThemeProvider } from "@material-ui/core";
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
			subscribe: () => { },
			getState: () => state,
			dispatch: () => { },
		});
	});

	it("Renders Section Expansion Panel with actions if actions are not null", () => {
		const header = <p>Header</p>;
		const content = <p>Content</p>;
		const actions = <p>Actions</p>;
		const component = (
			<Provider store={store(state)}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<SectionExpansionPanel header={header} content={content} actions={actions} />
				</MuiThemeProvider>
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
				<MuiThemeProvider theme={createMuiTheme()}>
					<SectionExpansionPanel header={header} content={content} actions={actions} />
				</MuiThemeProvider>
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
				<MuiThemeProvider theme={createMuiTheme()}>
					<SectionExpansionPanel header={header} content={content} />
				</MuiThemeProvider>
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
			expect(() => mount(component), "to throw a", TypeError).then((error) => {
				expect(error, "to have message", "expansionPanelProps property is not of type ExpansionPanelProps")
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
			expect(() => mount(component), "to throw a", TypeError).then((error) => {
				expect(error, "to have message", "expansionPanelActionsProps property is not of type ExpansionPanelActionsProps")
			});
		});
	});

	it("Uses expansionPanelProps.defaultExpanded correctly", () => {
		const expansionPanelProps = new ExpansionPanelProps();

		expansionPanelProps.set(ExpansionPanelProps.propNames.defaultExpanded, true);

		const component = (
			<Provider store={store(state)}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<SectionExpansionPanel expansionPanelProps={expansionPanelProps} />
				</MuiThemeProvider>
			</Provider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-expanded"), "to be truthy");
	});

	it("Uses expansionPanelProps.disabled correctly", () => {
		const expansionPanelProps = new ExpansionPanelProps();

		expansionPanelProps.set(ExpansionPanelProps.propNames.disabled, true);

		const component = (
			<Provider store={store(state)}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<SectionExpansionPanel expansionPanelProps={expansionPanelProps} />
				</MuiThemeProvider>
			</Provider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-disabled"), "to be truthy");
	});

	it("Default value for disabled property is correct if expansionPanelProps wasn't passed", () => {
		const component = (
			<Provider store={store(state)}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<SectionExpansionPanel />
				</MuiThemeProvider>
			</Provider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-disabled"), "to be falsy");
	});

	it("Default value for disabled property is correct if expansionPanelProps was passed without setting that", () => {
		const expansionPanelProps = new ExpansionPanelProps();

		const component = (
			<Provider store={store(state)}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<SectionExpansionPanel expansionPanelProps={expansionPanelProps} />
				</MuiThemeProvider>
			</Provider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-disabled"), "to be falsy");
	});

	it("Uses expansionPanelActionsProps.disableSpacing correctly", () => {
		const actions = <p>Actions</p>;
		const expansionPanelActionsProps = new ExpansionPanelActionsProps();

		expansionPanelActionsProps.set(ExpansionPanelActionsProps.propNames.disableSpacing, true);

		const component = (
			<Provider store={store(state)}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<SectionExpansionPanel expansionPanelActionsProps={expansionPanelActionsProps} actions={actions} />
				</MuiThemeProvider>
			</Provider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiAccordionActions-spacing"), "to be falsy");
	});

	it("DisableSpacing value for disabled property is correct if expansionPanelActionsProps wasn't passed", () => {
		const actions = <p>Actions</p>;
		const component = (
			<Provider store={store(state)}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<SectionExpansionPanel actions={actions} />
				</MuiThemeProvider>
			</Provider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiAccordionActions-spacing"), "to be truthy");
	});

	it("DisableSpacing value for disabled property is correct if expansionPanelActionsProps was passed without setting that", () => {
		const actions = <p>Actions</p>;
		const expansionPanelActionsProps = new ExpansionPanelActionsProps();

		const component = (
			<Provider store={store(state)}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<SectionExpansionPanel expansionPanelActionsProps={expansionPanelActionsProps} actions={actions} />
				</MuiThemeProvider>
			</Provider>
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
			<Provider store={store(state)}>
				<MuiThemeProvider theme={createMuiTheme()}>
					<SectionExpansionPanel
						header={header}
						content={content}
						actions={actions}
						expansionPanelId={expansionPanelId}
					/>
				</MuiThemeProvider>
			</Provider>
		);
		const mountedComponent = mount(component);

		mountedComponent.find(AccordionSummary).simulate("click");

		expect(mountedComponent.exists(".Mui-expanded"), "to be false");
	});
});
