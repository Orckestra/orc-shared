import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import sinon from "sinon";
import Icon from "../Icon";
import { ScopeIcon, ContentLabel, ScopeNode, ScopeText } from "./ScopeNode";

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
					<ScopeNode
						name="A scope"
						type="test"
						id="ScopeId"
						closeSelector={closeSelector}
						isAuthorizedScope
					/>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<ContentLabel id="selectorNodeScopeId" closeSelector={closeSelector}>
				<ScopeIcon type="test" />
				<ScopeText>A scope</ScopeText>
			</ContentLabel>,
		));

	it("displays an icon and a label for an unauthorized scope", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<ScopeNode
						name="A scope"
						type="test"
						id="ScopeId"
						closeSelector={closeSelector}
					/>
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
					<ScopeNode
						type="test"
						id="ScopeId"
						closeSelector={closeSelector}
						isAuthorizedScope
					/>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<ContentLabel id="selectorNodeScopeId" closeSelector={closeSelector}>
				<ScopeIcon type="test" />
				<ScopeText>ScopeId</ScopeText>
			</ContentLabel>,
		));

	it("displays an icon and a the fallback id for a scope when name is null", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<ScopeNode
						name={null}
						type="test"
						id="ScopeId"
						closeSelector={closeSelector}
						isAuthorizedScope
					/>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<ContentLabel id="selectorNodeScopeId" closeSelector={closeSelector}>
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
						closeSelector={closeSelector}
					/>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<ContentLabel id="selectorNodeScopeId" type="Virtual">
				<ScopeIcon type="Virtual" />
				<ScopeText>A scope</ScopeText>
			</ContentLabel>,
		));
});

describe("ContentLabel", () => {
	it("sets css for Global scope", () =>
		expect(
			<ContentLabel id="selectorNodeScopeId" type="Global" />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "text-transform: uppercase;")
				.and("to contain", ":hover {background-color: #222;}")
				.and("not to contain", "color: #999")
				.and("not to contain", "cursor: default;"),
		));

	it("sets css for Virtual scopes", () =>
		expect(
			<ContentLabel id="selectorNodeScopeId" type="Virtual" />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "color: #999999; cursor: default;")
				.and("not to contain", "text-transform: uppercase;")
				.and("not to contain", ":hover"),
		));

	it("sets css for other scopes", () =>
		expect(
			<ContentLabel id="selectorNodeScopeId" type="someOther" />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("not to contain", "color: #999")
				.and("not to contain", "cursor: default;")
				.and("not to contain", "text-transform: uppercase;")
				.and("to contain", ":hover {background-color: #222;}"),
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
		expect(
			<ScopeIcon theme={theme} type="Test" />,
			"when mounted",
			"to satisfy",
			<Icon id="test-icon" />,
		));

	it("renders in a color based on scope type", () =>
		expect(
			<ScopeIcon theme={theme} type="Test" />,
			"when mounted",
			"to have style rules satisfying",
			"to contain",
			"color: #00ff00;",
		));

	it("by default renders a cross", () =>
		expect(
			<ScopeIcon theme={theme} type="N/A" />,
			"when mounted",
			"to satisfy",
			<Icon id="cross" />,
		));
});
