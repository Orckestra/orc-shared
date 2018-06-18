import React from "react";
import Icon from "../Icon";
import { ScopeIcon, ContentLabel, ScopeNode } from "./ScopeNode";

describe("ScopeNode", () => {
	let onClick;
	beforeEach(() => {
		onClick = () => {};
	});

	it("displays an icon and a label for a scope", () =>
		expect(
			<ScopeNode name="A scope" type="test" onClick={onClick} />,
			"to render with all attributes as",
			<ContentLabel onClick={onClick} type="test">
				<ScopeIcon type="test" />
				A scope
			</ContentLabel>,
		));

	it("handles virtual scopes", () =>
		expect(
			<ScopeNode name="A scope" type="Virtual" onClick={onClick} />,
			"to render with all attributes as",
			<ContentLabel type="Virtual">
				<ScopeIcon type="Virtual" />
				A scope
			</ContentLabel>,
		));
});

describe("ContentLabel", () => {
	it("sets css for Global scope", () =>
		expect(<ContentLabel type="Global" />, "to render style rules").then(
			styles =>
				expect(styles, "to contain", "text-transform: uppercase;").and(
					"to contain",
					":hover {background-color: #222;}",
				),
		));

	it("sets css for Virtual scope", () =>
		expect(<ContentLabel type="Virtual" />, "to render style rules").then(
			styles =>
				expect(styles, "to contain", "color: #999; cursor: default;").and(
					"not to contain",
					":hover",
				),
		));

	it("sets css for other scopes", () =>
		expect(<ContentLabel type="SomeOther" />, "to render style rules").then(
			styles =>
				expect(styles, "not to contain", "text-transform: uppercase;").and(
					"to contain",
					":hover {background-color: #222;}",
				),
		));
});

describe("ScopeIcon", () => {
	let theme;
	beforeEach(() => {
		theme = {
			scopeTypeIcons: {
				Test: "test-icon",
			},
			scopeTypeColors: {
				Test: "#00ff00",
			},
		};
	});

	it("renders an icon with id based on scope type", () =>
		expect(
			<ScopeIcon theme={theme} type="Test" />,
			"to render as",
			<Icon id="test-icon" />,
		));

	it("renders in a color based on scope type", () =>
		expect(
			<ScopeIcon theme={theme} type="Test" />,
			"to render style rules",
			"to contain",
			"color: #00ff00;",
		));

	it("by default renders a cross", () =>
		expect(
			<ScopeIcon theme={theme} type="N/A" />,
			"to render as",
			<Icon id="cross" />,
		));
});
