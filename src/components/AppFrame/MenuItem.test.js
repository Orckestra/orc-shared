import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Ignore } from "unexpected-reaction";
import MenuItem, { Block, MenuIcon, Label, Alert } from "./MenuItem";

const BlockWithA = Block.withComponent("a");

describe("MenuItem", () => {
	it("renders an icon and no label", () =>
		expect(
			<MemoryRouter>
				<MenuItem href="/foo/test" data-test-id="test" icon="cake" />
			</MemoryRouter>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<Block data-test-id="test" to="/foo/test">
					<MenuIcon id="cake" />
					<Ignore />
				</Block>
			</MemoryRouter>,
		));

	it("renders a menu toggle as an <a> tag", () =>
		expect(
			<MemoryRouter>
				<MenuItem icon="cake" menuToggle />
			</MemoryRouter>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<BlockWithA menuToggle>
					<MenuIcon id="cake" />
					<Ignore />
				</BlockWithA>
			</MemoryRouter>,
		));

	it("renders an icon and label", () =>
		expect(
			<MemoryRouter>
				<MenuItem href="/foo/test" icon="cake" label="Test" />
			</MemoryRouter>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<Block to="/foo/test">
					<MenuIcon id="cake" />
					<Label>Test</Label>
				</Block>
			</MemoryRouter>,
		));

	it("renders an open state", () =>
		expect(
			<MemoryRouter>
				<MenuItem href="/foo/test" icon="cake" open />
			</MemoryRouter>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<Block to="/foo/test">
					<MenuIcon id="cake" />
					<Label show>
						<Ignore />
					</Label>
				</Block>
			</MemoryRouter>,
		));

	it("shows activity marker", () =>
		expect(
			<MemoryRouter>
				<MenuItem href="/foo/test" icon="cake" label="Test" alert />
			</MemoryRouter>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<Block to="/foo/test">
					<MenuIcon id="cake" />
					<Alert />
					<Label>Test</Label>
				</Block>
			</MemoryRouter>,
		));

	describe("Block", () => {
		it("sets text color to highlight if active", () =>
			expect(
				<MemoryRouter>
					<Block to="" active />
				</MemoryRouter>,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"color: #ffffff;",
			));

		it("sets text color to grey if not active", () =>
			expect(
				<MemoryRouter>
					<Block to="" />
				</MemoryRouter>,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"color: #999999;",
			));

		it("adds a hover rule if menu flag is unset", () =>
			expect(
				<MemoryRouter>
					<Block to="" />
				</MemoryRouter>,
				"when mounted",
				"to have style rules satisfying",
				"to match",
				/:hover\s*\{[^}]*\bcolor: #ffffff;[^}]*\}/,
			));

		it("does not add a hover rule if menuToggle flag is set", () =>
			expect(
				<MemoryRouter>
					<Block to="" menuToggle />
				</MemoryRouter>,
				"when mounted",
				"to have style rules satisfying",
				"not to match",
				/:hover\s*\{[^}]*\bcolor: #ffffff;[^}]*\}/,
			));
	});

	describe("Label", () => {
		it("sets full opacity if open", () =>
			expect(
				<Label show />,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"opacity: 1;",
			));

		it("sets zero opacity if not open", () =>
			expect(
				<Label />,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"opacity: 0;",
			));
	});
});
