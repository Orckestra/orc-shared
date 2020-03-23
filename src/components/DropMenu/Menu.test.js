import React from "react";
import { Provider } from "react-redux";
import sinon from "sinon";
import { getStyledClassSelector } from "../../utils/testUtils";
import Menu, { Drawer, List, Item, ItemIcon } from "./Menu";

describe("Menu", () => {
	it("renders a closed menu", () =>
		expect(
			<Menu menuItems={[{ label: "First", icon: "one", handler: () => {} }]} />,
			"when mounted",
			"to satisfy",
			null,
		));

	it("renders an open menu", () =>
		expect(
			<Provider store={{ getState: () => ({}), subscribe: () => {}, dispatch: () => {} }}>
				<Menu
					id="testMenu"
					open
					menuItems={[
						{ id: "first", label: "First", icon: "one", handler: () => {} },
						{ id: "second", label: "Second", icon: "two", handler: () => {} },
					]}
					toggle={() => {}}
				/>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Drawer in>
				<List id="testMenu">
					<Item id="first">
						<ItemIcon id="one" />
						First
					</Item>
					<Item id="second">
						<ItemIcon id="two" />
						Second
					</Item>
				</List>
			</Drawer>,
		));

	it("closes on click outside, or click on item", () => {
		const reset = sinon.spy().named("reset");
		const handler = sinon.spy().named("handler");
		return expect(
			<Provider store={{ getState: () => ({}), subscribe: () => {}, dispatch: () => {} }}>
				<Menu open menuItems={[{ label: "Foo", handler }]} reset={reset} />
			</Provider>,
			"when mounted",
			"with event",
			{ type: "click", target: getStyledClassSelector(<Item />) },
			"to satisfy",
			<Drawer in>
				<List onClickOutside={reset}>
					<Item>Foo</Item>
				</List>
			</Drawer>,
		).then(() =>
			Promise.all([expect(reset, "was called"), expect(handler, "was called")]),
		);
	});

	describe("Drawer", () => {
		it("sets transition time according to its timeout", () =>
			expect(
				<Drawer in timeout={500} />,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"transition: opacity 500ms ease-out;",
			));
	});

	describe("Item", () => {
		let theme;
		beforeEach(() => {
			theme = {
				colors: { application: { base: "#ff00ff" } },
			};
		});

		it("shows a background with the highlight color when hovering", () =>
			expect(
				<Item theme={theme} />,
				"when mounted",
				"to have style rules satisfying",
				"to match",
				/:hover\s*\{[^}]*\bbackground-color: #ff00ff;[^}]*\}/,
			));

		it("has a default highlight color", () =>
			expect(
				<Item />,
				"when mounted",
				"to have style rules satisfying",
				"to match",
				/:hover\s*\{[^}]*\bbackground-color: #ffffff;[^}]*\}/,
			));
	});
});
