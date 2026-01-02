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
	let closeSelector, store;
	beforeEach(() => {
		closeSelector = sinon.spy().named("close");
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
				<ScopeNode name="A scope" type="test" id="ScopeId" closeSelector={closeSelector} isAuthorizedScope={true} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<div id="selectorNodeScopeId" onClick={closeSelector}>
					<ScopeIcon type="test" />
					<div>A scope</div>
				</div>
			</TestWrapper>,
		));

	it("displays an icon and a label for the global scope", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<ScopeNode name="A scope" type="Global" id="ScopeId" closeSelector={closeSelector} isAuthorizedScope={true} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<div id="selectorNodeScopeId" onClick={closeSelector}>
					<ScopeIcon type="Global" />
					<div>A scope</div>
				</div>
			</TestWrapper>,
		));

	it("displays an icon and a label for an unauthorized scope", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<ScopeNode name="A scope" type="test" id="ScopeId" closeSelector={closeSelector} />
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
				<ScopeNode type="test" id="ScopeId" closeSelector={closeSelector} isAuthorizedScope={true} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<div id="selectorNodeScopeId" onClick={closeSelector}>
					<ScopeIcon type="test" />
					<div>ScopeId</div>
				</div>
			</TestWrapper>,
		));

	it("displays an icon and a the fallback id for a scope when name is null", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<ScopeNode name={null} type="test" id="ScopeId" closeSelector={closeSelector} isAuthorizedScope={true} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<div id="selectorNodeScopeId" onClick={closeSelector}>
					<ScopeIcon type="test" />
					<div>ScopeId</div>
				</div>
			</TestWrapper>,
		));

	it("handles virtual scopes", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<ScopeNode name="A scope" type="Virtual" id="ScopeId" isAuthorizedScope={true} closeSelector={closeSelector} />
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

	it("Call onScopeSelect on Node click if scope type is not virtual", () => {
		const component = (
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} memoryRouter={{}}>
				<ScopeNode name="A scope" type="test" id="ScopeId" closeSelector={closeSelector} isAuthorizedScope={true} />
			</TestWrapper>
		);

		const preventDefaultSpy = sinon.spy();

		const mountedComponent = mount(component);

		const event = {
			preventDefault: preventDefaultSpy,
		};

		const node = mountedComponent.find("[data-qa='content-label']");

		node.invoke("onClick")(event);

		expect(preventDefaultSpy, "was called");
		expect(closeSelector, "to have a call satisfying", { args: [event] });
	});
});
