import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import { mount } from "enzyme";
import sinon from "sinon";
import Icon from "../Icon";
import { ScopeIcon, ContentLabel, ScopeNode, ScopeText } from "./ScopeNode";
import { TestWrapper } from "../../utils/testUtils";

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
			<Provider store={store}>
				<MemoryRouter>
					<ScopeNode name="A scope" type="test" id="ScopeId" closeSelector={closeSelector} isAuthorizedScope={true} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<ContentLabel id="selectorNodeScopeId" onClick={closeSelector}>
				<ScopeIcon type="test" />
				<ScopeText>A scope</ScopeText>
			</ContentLabel>,
		));

	it("displays an icon and a label for the global scope", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<ScopeNode name="A scope" type="Global" id="ScopeId" closeSelector={closeSelector} isAuthorizedScope={true} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<ContentLabel id="selectorNodeScopeId" onClick={closeSelector} isGlobal={true}>
				<ScopeIcon type="Global" />
				<ScopeText>A scope</ScopeText>
			</ContentLabel>,
		));

	it("displays an icon and a label for an unauthorized scope", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<ScopeNode name="A scope" type="test" id="ScopeId" closeSelector={closeSelector} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<ContentLabel id="selectorNodeScopeId">
				<ScopeIcon type="test" />
				<ScopeText>A scope</ScopeText>
			</ContentLabel>,
		));

	it("displays an icon and a the fallback id for a scope when name is undefined", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<ScopeNode type="test" id="ScopeId" closeSelector={closeSelector} isAuthorizedScope={true} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<ContentLabel id="selectorNodeScopeId" onClick={closeSelector}>
				<ScopeIcon type="test" />
				<ScopeText>ScopeId</ScopeText>
			</ContentLabel>,
		));

	it("displays an icon and a the fallback id for a scope when name is null", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<ScopeNode name={null} type="test" id="ScopeId" closeSelector={closeSelector} isAuthorizedScope={true} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<ContentLabel id="selectorNodeScopeId" onClick={closeSelector}>
				<ScopeIcon type="test" />
				<ScopeText>ScopeId</ScopeText>
			</ContentLabel>,
		));

	it("handles virtual scopes", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<ScopeNode
						name="A scope"
						type="Virtual"
						id="ScopeId"
						isAuthorizedScope={true}
						closeSelector={closeSelector}
					/>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<ContentLabel id="selectorNodeScopeId">
				<ScopeIcon type="Virtual" />
				<ScopeText>A scope</ScopeText>
			</ContentLabel>,
		));

	it("Call onScopeSelect on Node click if scope type is not virtual", () => {
		const component = (
			<TestWrapper provider={{ store }} memoryRouter>
				<ScopeNode name="A scope" type="test" id="ScopeId" closeSelector={closeSelector} isAuthorizedScope={true} />
			</TestWrapper>
		);

		const preventDefaultSpy = sinon.spy();

		const mountedComponent = mount(component);

		const event = {
			preventDefault: preventDefaultSpy,
		};

		const node = mountedComponent.find(ContentLabel);

		node.invoke("onClick")(event);

		expect(preventDefaultSpy, "was called");
		expect(closeSelector, "to have a call satisfying", { args: [event] });
	});
});

describe("ContentLabel", () => {
	let onClick;
	beforeEach(() => {
		onClick = () => {};
	});

	it("sets css for authorized Global scope", () =>
		expect(
			<ContentLabel id="selectorNodeScopeId" isGlobal={true} onClick={onClick} />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "text-transform: uppercase;")
				.and("to contain", ":hover {background-color: #222;}")
				.and("not to contain", "color: #999999")
				.and("not to contain", "cursor: default;"),
		));

	it("sets css for unauthorized Global scope", () =>
		expect(
			<ContentLabel id="selectorNodeScopeId" isGlobal={true} />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "text-transform: uppercase;")
				.and("not to contain", ":hover {background-color: #222;}")
				.and("to contain", "color: #999999")
				.and("to contain", "cursor: default;"),
		));

	it("sets css for a not-clickable and a non-global scope", () =>
		expect(
			<ContentLabel isGlobal={false} />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("not to contain", "text-transform: uppercase;")
				.and("not to contain", ":hover {background-color: #222;}")
				.and("to contain", "color: #999999")
				.and("to contain", "cursor: default;"),
		));

	it("sets css for a clickable and a non-global scope", () =>
		expect(
			<ContentLabel isGlobal={false} onClick={onClick} />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("not to contain", "text-transform: uppercase;")
				.and("to contain", ":hover {background-color: #222;}")
				.and("not to contain", "color: #999999")
				.and("not to contain", "cursor: default;"),
		));
});

describe("ScopeIcon", () => {
	let theme;
	beforeEach(() => {
		theme = {
			icons: {
				scopeTypes: {
					Test: "test-icon",
				},
			},
			colors: {
				scopeTypes: {
					Test: "#00ff00",
				},
			},
		};
	});

	it("renders an icon with id based on scope type", () =>
		expect(<ScopeIcon theme={theme} type="Test" />, "when mounted", "to satisfy", <Icon id="test-icon" />));

	it("renders in a color based on scope type", () =>
		expect(
			<ScopeIcon theme={theme} type="Test" />,
			"when mounted",
			"to have style rules satisfying",
			"to contain",
			"color: #00ff00;",
		));

	it("by default renders a cross", () =>
		expect(<ScopeIcon theme={theme} type="N/A" />, "when mounted", "to satisfy", <Icon id="cross" />));
});
