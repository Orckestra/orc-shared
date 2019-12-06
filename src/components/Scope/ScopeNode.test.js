import React from "react";
import Icon from "../Icon";
import { ScopeIcon, ContentLabel, ScopeNode, ScopeText } from "./ScopeNode";

describe("ScopeNode", () => {
	let onClick;
	beforeEach(() => {
		onClick = () => {};
	});

	it("displays an icon and a label for a scope", () =>
		expect(
			<ScopeNode
				name="A scope"
				type="test"
				id="scopeId"
				onClick={onClick}
				isAuthorizedScope
			/>,
			"when mounted",
			"to satisfy",
			<ContentLabel onClick={onClick}>
				<ScopeIcon type="test" />
				<ScopeText>A scope</ScopeText>
			</ContentLabel>,
		));

	it("displays an icon and a label for an unauthorized scope", () =>
		expect(
			<ScopeNode name="A scope" type="test" id="scopeId" onClick={onClick} />,
			"when mounted",
			"to satisfy",
			<ContentLabel>
				<ScopeIcon type="test" />
				<ScopeText>A scope</ScopeText>
			</ContentLabel>,
		));

	it("displays an icon and a the fallback id for a scope when name is undefined", () =>
		expect(
			<ScopeNode
				type="test"
				id="scope-Id"
				onClick={onClick}
				isAuthorizedScope
			/>,
			"when mounted",
			"to satisfy",
			<ContentLabel onClick={onClick}>
				<ScopeIcon type="test" />
				<ScopeText>scope-Id</ScopeText>
			</ContentLabel>,
		));

	it("displays an icon and a the fallback id for a scope when name is null", () =>
		expect(
			<ScopeNode
				name={null}
				type="test"
				id="scope-Id"
				onClick={onClick}
				isAuthorizedScope
			/>,
			"when mounted",
			"to satisfy",
			<ContentLabel onClick={onClick}>
				<ScopeIcon type="test" />
				<ScopeText>scope-Id</ScopeText>
			</ContentLabel>,
		));

	it("handles virtual scopes", () =>
		expect(
			<ScopeNode
				name="A scope"
				type="Virtual"
				id="scopeId"
				onClick={onClick}
			/>,
			"when mounted",
			"to satisfy",
			<ContentLabel type="Virtual">
				<ScopeIcon type="Virtual" />
				<ScopeText>A scope</ScopeText>
			</ContentLabel>,
		));
});

describe("ContentLabel", () => {
	it("sets css for Global scope", () =>
		expect(
			<ContentLabel type="Global" />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "text-transform: uppercase;")
				.and("to contain", ":hover {background-color: #222;}")
				.and("not to contain", "color: #999; cursor: default;"),
		));

	it("sets css for Virtual scopes", () =>
		expect(
			<ContentLabel type="Virtual" />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "color: #999; cursor: default;")
				.and("not to contain", "text-transform: uppercase;")
				.and("not to contain", ":hover"),
		));

	it("sets css for other scopes", () =>
		expect(
			<ContentLabel type="someOther" />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("not to contain", "color: #999; cursor: default;")
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
			scopeTypeColors: {
				Test: "#00ff00",
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
