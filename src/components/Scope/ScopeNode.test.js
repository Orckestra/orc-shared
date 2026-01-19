import React from "react";
import Immutable from "immutable";
import { mount } from "enzyme";
import { ScopeIcon } from "../MaterialUI/ScopeSelector/TreeItem";
import sinon from "sinon";
import { ScopeNode } from "./ScopeNode";
import { TestWrapper } from "../../utils/testUtils";
import { createMuiTheme } from "../../utils/testUtils";

const theme = createMuiTheme();

describe("ScopeNode", () => {
	let onClick, store;
	beforeEach(() => {
		onClick = sinon.spy().named("onClick");
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () =>
				Immutable.fromJS({
					navigation: { route: { match: { path: "/", params: {} } } },
				}),
		};
	});

	it("displays an icon and a label for a scope", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<ScopeNode name="A scope" type="test" scopeId="ScopeId" isAuthorizedScope={true} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<div id="selectorNodeScopeId">
					<ScopeIcon type="test" />
					<div>A scope</div>
				</div>
			</TestWrapper>,
		));

	it("displays an icon and a label for the global scope", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<ScopeNode name="A scope" type="Global" scopeId="ScopeId" isAuthorizedScope={true} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<div id="selectorNodeScopeId">
					<ScopeIcon type="Global" />
					<div>A scope</div>
				</div>
			</TestWrapper>,
		));

	it("displays an icon and a label for an unauthorized scope", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<ScopeNode name="A scope" type="test" scopeId="ScopeId" />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<div id="selectorNodeScopeId">
					<ScopeIcon type="test" />
					<div>A scope</div>
				</div>
			</TestWrapper>,
		));

	it("displays an icon and a the fallback id for a scope when name is undefined", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<ScopeNode type="test" scopeId="ScopeId" isAuthorizedScope={true} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<div id="selectorNodeScopeId">
					<ScopeIcon type="test" />
					<div>ScopeId</div>
				</div>
			</TestWrapper>,
		));

	it("displays an icon and a the fallback id for a scope when name is null", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<ScopeNode name={null} type="test" scopeId="ScopeId" isAuthorizedScope={true} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<div id="selectorNodeScopeId">
					<ScopeIcon type="test" />
					<div>ScopeId</div>
				</div>
			</TestWrapper>,
		));

	it("handles virtual scopes", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<ScopeNode name="A scope" type="Virtual" scopeId="ScopeId" isAuthorizedScope={true} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<div id="selectorNodeScopeId">
					<ScopeIcon type="Virtual" />
					<div>A scope</div>
				</div>
			</TestWrapper>,
		));

	it("displays an icon without label for a scope with custom children", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<ScopeNode type="test" isAuthorizedScope={true}>
					<div>Another Display Test</div>
				</ScopeNode>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<div id="selectorNodescopeUnknown">
					<ScopeIcon type="test" />
					<div>Another Display Test</div>
				</div>
			</TestWrapper>,
		));

	it("Call onClick on Node click when defined", () => {
		const component = (
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<ScopeNode name="A scope" type="test" scopeId="ScopeId" onClick={onClick} isAuthorizedScope={true} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const event = {
			preventDefault: () => {},
		};

		const node = mountedComponent.find("[data-qa='content-label']").first();

		node.invoke("onClick")(event);

		expect(onClick, "to have a call satisfying", { args: [event] });
	});
});
