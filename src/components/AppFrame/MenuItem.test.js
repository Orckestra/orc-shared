import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { Ignore } from "unexpected-reaction";
import MenuItem, { Block, MenuIcon, Label, Alert } from "./MenuItem";

const BlockWithA = Block.withComponent("a");

describe("MenuItem", () => {
	let store = {
		subscribe: () => {},
		dispatch: () => {},
		getState: () => ({}),
	};

	it("renders an icon and no label", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<MenuItem
						id="test"
						href="/foo/test"
						data-test-id="test"
						icon="cake"
					/>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<Block id="test" data-test-id="test" to="/foo/test">
					<MenuIcon id="cake" />
					<Ignore />
				</Block>
			</MemoryRouter>,
		));

	it("renders a menu toggle as an <a> tag", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<MenuItem id="test" icon="cake" menuToggle />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<BlockWithA id="test" menuToggle>
					<MenuIcon id="cake" />
					<Ignore />
				</BlockWithA>
			</MemoryRouter>,
		));

	it("renders an icon and label", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<MenuItem id="test" href="/foo/test" icon="cake" label="Test" />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<Block id="test" to="/foo/test">
					<MenuIcon id="cake" />
					<Label>Test</Label>
				</Block>
			</MemoryRouter>,
		));

	it("renders an open state", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<MenuItem id="test" href="/foo/test" icon="cake" open />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<Block id="test" to="/foo/test">
					<MenuIcon id="cake" />
					<Label show>
						<Ignore />
					</Label>
				</Block>
			</MemoryRouter>,
		));

	it("shows activity marker", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<MenuItem id="test" href="/foo/test" icon="cake" label="Test" alert />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<Block id="test" to="/foo/test">
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
