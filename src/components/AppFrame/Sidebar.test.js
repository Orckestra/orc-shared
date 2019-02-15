import React from "react";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import Sidebar, { Bar, EnhancedMenuItem, MenuToggle } from "./Sidebar";
import MenuItem from "./MenuItem";

describe("Sidebar", () => {
	let modules;
	beforeEach(() => {
		modules = [
			{
				id: "first",
				icon: "cars",
				label: "First page",
			},
		];
	});

	it("renders a sidebar with app selector and page menu", () =>
		expect(
			<Sidebar modules={modules} />,
			"to render as",
			<Bar>
				<MenuToggle />
				<EnhancedMenuItem icon="cars" id="first" label="First page" />
			</Bar>,
		));

	it("renders an open sidebar", () =>
		expect(
			<Sidebar open modules={modules} />,
			"to render as",
			<Bar>
				<MenuToggle open />
				<EnhancedMenuItem open icon="cars" id="first" label="First page" />
			</Bar>,
		));

	it("renders a minimal sidebar", () =>
		expect(
			<Sidebar />,
			"to render as",
			<Bar>
				<MenuToggle />
			</Bar>,
		));
});

describe("EnhancedMenuItem", () => {
	let store;
	beforeEach(() => {
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () =>
				Immutable.fromJS({
					navigation: {
						route: {
							match: {
								params: { scope: "Global" },
							},
						},
					},
				}),
		};
	});

	it("renders a MenuItem with href", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<EnhancedMenuItem id="route" />
				</MemoryRouter>
			</Provider>,
			"to deeply render as",
			<MenuItem href="/Global/route" />,
		));
});

describe("MenuToggle", () => {
	let toggle;
	beforeEach(() => {
		toggle = () => {};
	});

	describe("with no theme", () => {
		it("renders a MenuItem with specific settings", () =>
			expect(
				<ThemeProvider theme={{ foo: "bar" }}>
					<MemoryRouter>
						<MenuToggle toggle={toggle} />
					</MemoryRouter>
				</ThemeProvider>,
				"to deeply render as",
				<MenuItem menuToggle icon="menu" onClick={toggle} />,
			));

		it("renders as open", () =>
			expect(
				<ThemeProvider theme={{ foo: "bar" }}>
					<MemoryRouter>
						<MenuToggle toggle={toggle} open />
					</MemoryRouter>
				</ThemeProvider>,
				"to deeply render as",
				<MenuItem menuToggle open icon="layers" onClick={toggle} />,
			));
	});

	describe("with theme values", () => {
		let theme;
		beforeEach(() => {
			theme = {
				icons: {
					sidebarOpen: "open",
					sidebarClosed: "closed",
				},
			};
		});

		it("renders a MenuItem with specific settings", () =>
			expect(
				<ThemeProvider theme={theme}>
					<MemoryRouter>
						<MenuToggle toggle={toggle} />
					</MemoryRouter>
				</ThemeProvider>,
				"to deeply render as",
				<MenuItem menuToggle icon="closed" onClick={toggle} />,
			));

		it("renders as open", () =>
			expect(
				<ThemeProvider theme={theme}>
					<MemoryRouter>
						<MenuToggle toggle={toggle} open />
					</MemoryRouter>
				</ThemeProvider>,
				"to deeply render as",
				<MenuItem menuToggle open icon="open" onClick={toggle} />,
			));
	});
});
