import React from "react";
import { MemoryRouter } from "react-router-dom";
import MenuItem, { Block, MenuIcon, Label, Alert } from "./MenuItem";

describe("MenuItem", () => {
	it("renders an icon and no label", () =>
		expect(
			<MenuItem random="prop" icon="cake" />,
			"to render as",
			<Block random="prop">
				<MenuIcon id="cake" />
				<Label />
			</Block>,
		));

	it("renders an icon and label", () =>
		expect(
			<MenuItem icon="cake" label="Test" />,
			"to render as",
			<Block>
				<MenuIcon id="cake" />
				<Label>Test</Label>
			</Block>,
		));

	it("renders an open state", () =>
		expect(
			<MenuItem icon="cake" open />,
			"to render as",
			<Block>
				<MenuIcon id="cake" />
				<Label show />
			</Block>,
		));

	it("shows activity marker", () =>
		expect(
			<MenuItem icon="cake" label="Test" alert />,
			"to render as",
			<Block>
				<MenuIcon id="cake" />
				<Alert />
				<Label>Test</Label>
			</Block>,
		));

	describe("Block", () => {
		it("sets text color to highlight if active", () =>
			expect(
				<MemoryRouter>
					<Block to="" active />
				</MemoryRouter>,
				"to render style rules",
				"to contain",
				"color: #ffffff;",
			));

		it("sets text color to grey if not active", () =>
			expect(
				<MemoryRouter>
					<Block to="" />
				</MemoryRouter>,
				"to render style rules",
				"to contain",
				"color: #999999;",
			));

		it("adds a hover rule if menu flag is unset", () =>
			expect(
				<MemoryRouter>
					<Block to="" />
				</MemoryRouter>,
				"to render style rules",
				"to match",
				/:hover\s*\{[^}]*\bcolor: #ffffff;[^}]*\}/,
			));

		it("does not add a hover rule if menuToggle flag is set", () =>
			expect(
				<MemoryRouter>
					<Block to="" menuToggle />
				</MemoryRouter>,
				"to render style rules",
				"not to match",
				/:hover\s*\{[^}]*\bcolor: #ffffff;[^}]*\}/,
			));
	});

	describe("Label", () => {
		it("sets full opacity if open", () =>
			expect(
				<Label show />,
				"to render style rules",
				"to contain",
				"opacity: 1;",
			));

		it("sets zero opacity if not open", () =>
			expect(<Label />, "to render style rules", "to contain", "opacity: 0;"));
	});
});
