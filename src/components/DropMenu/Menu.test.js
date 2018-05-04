import React from "react";
import sinon from "sinon";
import Menu, { Drawer, List, Item, ItemIcon } from "./Menu";

describe("Menu", () => {
	it("renders a closed menu", () =>
		expect(
			<Menu menuItems={[{ label: "First", icon: "one", handler: () => {} }]} />,
			"to render with all attributes as",
			<Drawer />,
		));

	it("renders an open menu", () =>
		expect(
			<Menu
				open
				menuItems={[
					{ label: "First", icon: "one", handler: () => {} },
					{ label: "Second", icon: "two", handler: () => {} },
				]}
				toggle={() => {}}
			/>,
			"to render as",
			<Drawer in>
				<List>
					<Item>
						<ItemIcon id="one" />
						<span>First</span>
					</Item>
					<Item>
						<ItemIcon id="two" />
						<span>Second</span>
					</Item>
				</List>
			</Drawer>,
		));

	it("closes on click outside, or click on item", () => {
		const toggle = sinon.spy().named("toggle");
		const handler = sinon.spy().named("handler");
		return expect(
			<Menu
				open
				menuItems={[{ label: "Foo", icon: "one", handler }]}
				toggle={toggle}
			/>,
			"to render as",
			<Drawer in>
				<List onClickOutside={toggle} />
			</Drawer>,
		)
			.and("with event click", "on", <Item />)
			.then(() =>
				Promise.all([
					expect(toggle, "was called"),
					expect(handler, "was called"),
				]),
			);
	});

	describe("Drawer", () => {
		it("sets transition time according to its timeout", () =>
			expect(
				<Drawer in timeout={500} />,
				"to render style rules",
				"to contain",
				"transition: opacity 500ms ease-out;",
			));
	});

	describe("Item", () => {
		let theme;
		beforeEach(() => {
			theme = {
				appHighlightColor: "#ff00ff",
			};
		});

		it("shows a background with the highlight color when hovering", () =>
			expect(
				<Item theme={theme} />,
				"to render style rules",
				"to match",
				/:hover\s*\{[^}]*\bbackground-color: #ff00ff;[^}]*\}/,
			));

		it("has a default highlight color", () =>
			expect(
				<Item />,
				"to render style rules",
				"to match",
				/:hover\s*\{[^}]*\bbackground-color: #ffffff;[^}]*\}/,
			));
	});
});
