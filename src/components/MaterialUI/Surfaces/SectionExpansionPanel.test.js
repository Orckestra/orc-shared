import React from "react";
import { mount } from "enzyme";
import ExpansionPanel from "./ExpansionPanel";
import ExpansionPanelMui from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import { ExpansionPanelProps, ExpansionPanelActionsProps } from "./expansionPanelProps";
import { ignoreConsoleError } from "../../../utils/testUtils";
import { Provider } from "react-redux";
import Immutable from "immutable";

describe("Expansion Panel", () => {
	let state, store;
	beforeEach(() => {
		state = Immutable.fromJS({
			view: {
				ExpPanel123: {
					isExpanded: true
				}
			}
		});
		store = state => ({
			subscribe: () => { },
			getState: () => state,
			dispatch: () => { },
		});
	});


	it("Renders Expansion Panel with actions if actions are not null", () => {
		const header = <p>Header</p>;
		const content = <p>Content</p>;
		const actions = <p>Actions</p>;
		const component = (
			<Provider store={store(state)}>
				<ExpansionPanel header={header} content={content} actions={actions} />
			</Provider>
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

	it("Renders Expansion Panel Actions if actions are not null", () => {
		const header = <p>Header</p>;
		const content = <p>Content</p>;
		const actions = <p>Actions</p>;
		const component = (
			<Provider store={store(state)}>
				<ExpansionPanel header={header} content={content} actions={actions} />
			</Provider>
		);
		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiExpansionPanelActions-root"), "to be truthy");
	});

	it("Not renders Expansion Panel Actions if actions are null", () => {
		const header = <p>Header</p>;
		const content = <p>Content</p>;
		const component = (
			<Provider store={store(state)}>
				<ExpansionPanel header={header} content={content} />
			</Provider>
		);
		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiExpansionPanelActions-root"), "to be falsy");
	});

	it("Fails if expansionPanelProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = (
				<Provider store={store(state)}>
					<ExpansionPanel expansionPanelProps="Wrong type" />
				</Provider>
			);
			expect(() => mount(component), "to throw a", TypeError);
		});
	});

	it("Fails if expansionPanelActionsProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = (
				<Provider store={store(state)}>
					<ExpansionPanel expansionPanelActionsProps="Wrong type" />
				</Provider>
			);
			expect(() => mount(component), "to throw a", TypeError);
		});
	});

	it("Uses expansionPanelProps.defaultExpanded correctly", () => {
		const expansionPanelProps = new ExpansionPanelProps();

		expansionPanelProps.set(ExpansionPanelProps.propNames.defaultExpanded, true);

		const component = (
			<Provider store={store(state)}>
				<ExpansionPanel expansionPanelProps={expansionPanelProps} />
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
				<ExpansionPanel expansionPanelProps={expansionPanelProps} />
			</Provider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-disabled"), "to be truthy");
	});

	it("Default value for disabled property is correct if expansionPanelProps wasn't passed", () => {
		const component = (
			<Provider store={store(state)}>
				<ExpansionPanel />
			</Provider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-disabled"), "to be falsy");
	});

	it("Default value for disabled property is correct if expansionPanelProps was passed without setting that", () => {
		const expansionPanelProps = new ExpansionPanelProps();

		const component = (
			<Provider store={store(state)}>
				<ExpansionPanel expansionPanelProps={expansionPanelProps} />
			</Provider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".Mui-disabled"), "to be falsy");
	});

	it("Uses expansionPanelActionsProps.disableSpacing correctly", () => {
		const actions = <p>Actions</p>;
		const expansionPanelActionsProps = new ExpansionPanelActionsProps();

		expansionPanelActionsProps.set(
			ExpansionPanelActionsProps.propNames.disableSpacing,
			true,
		);

		const component = (
			<Provider store={store(state)}>
				<ExpansionPanel
					expansionPanelActionsProps={expansionPanelActionsProps}
					actions={actions}
				/>
			</Provider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiExpansionPanelActions-spacing"), "to be falsy");
	});

	it("DisableSpacing value for disabled property is correct if expansionPanelActionsProps wasn't passed", () => {
		const actions = <p>Actions</p>;
		const component = (
			<Provider store={store(state)}>
				<ExpansionPanel actions={actions} />
			</Provider >
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiExpansionPanelActions-spacing"), "to be truthy");
	});

	it("DisableSpacing value for disabled property is correct if expansionPanelActionsProps was passed without setting that", () => {
		const actions = <p>Actions</p>;
		const expansionPanelActionsProps = new ExpansionPanelActionsProps();

		const component = (
			<Provider store={store(state)}>
				<ExpansionPanel
					expansionPanelActionsProps={expansionPanelActionsProps}
					actions={actions}
				/>
			</Provider >
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiExpansionPanelActions-spacing"), "to be truthy");
	});

	it("handles internal on change function", () => {
		const header = <p>Header</p>;
		const content = <p>Content</p>;
		const actions = <p>Actions</p>;
		const expansionPanelId = "ExpPanel123";
		const component = (
			<Provider store={store(state)}>
				<ExpansionPanel header={header} content={content} actions={actions} expansionPanelId={expansionPanelId} />
			</Provider>
		);
		const mountedComponent = mount(component);

		mountedComponent.find(ExpansionPanelSummary).simulate('click');

		expect(mountedComponent.exists(".Mui-expanded"), "to be false");
	});
});
