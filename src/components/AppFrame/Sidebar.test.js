import React from "react";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import Sidebar, { Bar, EnhancedMenuItem, MenuToggle, Logo } from "./Sidebar";
import MenuItem from "./MenuItem";

describe("Sidebar", () => {
	let state, store, modules;
	beforeEach(() => {
		modules = [
			{
				id: "first",
				icon: "cars",
				label: "First page",
			},
			{
				id: "second",
				icon: "person",
				label: "Second page",
			},
		];
		state = Immutable.fromJS({
			navigation: { route: { match: { params: { scope: "Global" } } } },
		});
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
	});

	it("renders a sidebar with app selector and page menu", () =>
		expect(
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<MemoryRouter initialEntries={["/Global/second"]}>
						<Sidebar modules={modules} />
					</MemoryRouter>
				</ThemeProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<MemoryRouter initialEntries={["/Global/second"]}>
						<Bar>
							<MenuToggle />
							<EnhancedMenuItem icon="cars" id="first" label="First page" />
							<EnhancedMenuItem icon="person" id="second" label="Second page" />
							<Logo />
						</Bar>
					</MemoryRouter>
				</ThemeProvider>
			</Provider>,
		));

	it("renders a sidebar showing alerts", () =>
		expect(
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<MemoryRouter initialEntries={["/Global/second"]}>
						<Sidebar modules={modules} activeModules={["first"]} />
					</MemoryRouter>
				</ThemeProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<MemoryRouter initialEntries={["/Global/second"]}>
						<Bar>
							<MenuToggle />
							<EnhancedMenuItem icon="cars" id="first" label="First page" alert />
							<EnhancedMenuItem icon="person" id="second" label="Second page" />
							<Logo />
						</Bar>
					</MemoryRouter>
				</ThemeProvider>
			</Provider>,
		));

	it("renders an open sidebar", () =>
		expect(
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<MemoryRouter initialEntries={["/Global/second"]}>
						<Sidebar open modules={modules} />
					</MemoryRouter>
				</ThemeProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<MemoryRouter initialEntries={["/Global/second"]}>
						<Bar>
							<MenuToggle open />
							<EnhancedMenuItem open icon="cars" id="first" label="First page" />
							<EnhancedMenuItem open icon="person" id="second" label="Second page" />
							<Logo />
						</Bar>
					</MemoryRouter>
				</ThemeProvider>
			</Provider>,
		));

	it("renders a minimal sidebar", () =>
		expect(
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<MemoryRouter>
						<Sidebar />
					</MemoryRouter>
				</ThemeProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<MemoryRouter>
						<Bar>
							<MenuToggle />
							<Logo />
						</Bar>
					</MemoryRouter>
				</ThemeProvider>
			</Provider>,
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
					<EnhancedMenuItem id="route" path="/Global/somewhere" />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<MemoryRouter>
					<MenuItem href="/Global/route" />
				</MemoryRouter>
			</Provider>,
		));

	it("sets the active flag if path matches href", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/Global/route/subpath"]}>
					<EnhancedMenuItem id="route" />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<MemoryRouter>
					<MenuItem active href="/Global/route" />
				</MemoryRouter>
			</Provider>,
		));
});

describe("MenuToggle", () => {
	let toggle, store;
	beforeEach(() => {
		toggle = () => {};
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => ({}),
		};
	});

	describe("with no theme", () => {
		it("renders a MenuItem with specific settings", () =>
			expect(
				<Provider store={store}>
					<ThemeProvider theme={{ foo: "bar" }}>
						<MemoryRouter>
							<MenuToggle toggle={toggle} />
						</MemoryRouter>
					</ThemeProvider>
				</Provider>,
				"when mounted",
				"to satisfy",
				<Provider store={store}>
					<MenuItem
						id="sidebarMenuToggle"
						menuToggle
						icon="menu"
						onClick={expect.it("to be a function")}
					/>
				</Provider>,
			));

		it("renders as open", () =>
			expect(
				<Provider store={store}>
					<ThemeProvider theme={{ foo: "bar" }}>
						<MemoryRouter>
							<MenuToggle toggle={toggle} open />
						</MemoryRouter>
					</ThemeProvider>
				</Provider>,
				"when mounted",
				"to satisfy",
				<Provider store={store}>
					<MenuItem
						id="sidebarMenuToggle"
						menuToggle
						open
						icon="layers"
						onClick={expect.it("to be a function")}
					/>
				</Provider>,
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
				<Provider store={store}>
					<ThemeProvider theme={theme}>
						<MemoryRouter>
							<MenuToggle toggle={toggle} />
						</MemoryRouter>
					</ThemeProvider>
				</Provider>,
				"when mounted",
				"to satisfy",
				<Provider store={store}>
					<MenuItem menuToggle icon="closed" onClick={expect.it("to be a function")} />
				</Provider>,
			));

		it("renders as open", () =>
			expect(
				<Provider store={store}>
					<ThemeProvider theme={theme}>
						<MemoryRouter>
							<MenuToggle toggle={toggle} open />
						</MemoryRouter>
					</ThemeProvider>
				</Provider>,
				"when mounted",
				"to satisfy",
				<Provider store={store}>
					<MenuItem menuToggle open icon="open" onClick={expect.it("to be a function")} />
				</Provider>,
			));
	});
});
