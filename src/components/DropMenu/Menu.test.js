import React from "react";
import sinon from "sinon";
import { Ignore } from "unexpected-reaction";
import { getClassName } from "../../utils/testUtils";
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
			<Menu
				open
				menuItems={[
					{ label: "First", icon: "one", handler: () => {} },
					{ label: "Second", icon: "two", handler: () => {} },
				]}
				toggle={() => {}}
			/>,
			"when mounted",
			"to satisfy",
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
			"when mounted",
			"with event",
			{ type: "click", target: "." + getClassName(<Item />) },
			"to satisfy",
			<Drawer in>
				<List onClickOutside={toggle}>
					<Item>
						<svg>
							<Ignore />
						</svg>
						<span>Foo</span>
					</Item>
				</List>
			</Drawer>,
		).then(() =>
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
				appHighlightColor: "#ff00ff",
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
