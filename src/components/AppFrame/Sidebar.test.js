import React from "react";
import Immutable from "immutable";
import { TestWrapper } from "../../utils/testUtils";
import Sidebar, { EnhancedMenuItem, MenuToggle, Logo } from "./Sidebar";
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
			navigation: { route: { match: { params: { scope: "Global" } } }, config: { prependHref: "/Global/" } },
			settings: { defaultScope: "myScope" },
			modules: {
				tree: "modulesTree",
				visibleModules: ["a", "module123"],
				lastScopeAndModuleSelection: {
					scope: "Norway",
					moduleName: "Profiles",
					routingPerformed: false,
				},
			},
		});
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
	});

	it("renders a sidebar with app selector and page menu", () =>
		expect(
			<TestWrapper
				provider={{ store }}
				stylesProvider
				muiThemeProvider
				memoryRouter={{ initialEntries: ["/Global/second"] }}
			>
				<Sidebar modules={modules} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper
				provider={{ store }}
				stylesProvider
				muiThemeProvider
				memoryRouter={{ initialEntries: ["/Global/second"] }}
			>
				<div>
					<MenuToggle />
					<EnhancedMenuItem icon="cars" title="First page" id="first" label="First page" />
					<EnhancedMenuItem icon="person" title="Second page" id="second" label="Second page" />
					<Logo />
				</div>
			</TestWrapper>,
		));

	it("renders a sidebar showing alerts", () =>
		expect(
			<TestWrapper
				provider={{ store }}
				stylesProvider
				muiThemeProvider
				memoryRouter={{ initialEntries: ["/Global/second"] }}
			>
				<Sidebar modules={modules} activeModules={{ first: { type: "confirm" } }} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper
				provider={{ store }}
				stylesProvider
				muiThemeProvider
				memoryRouter={{ initialEntries: ["/Global/second"] }}
			>
				<div>
					<MenuToggle />
					<EnhancedMenuItem icon="cars" title="First page" id="first" label="First page" alert={{ type: "confirm" }} />
					<EnhancedMenuItem icon="person" title="Second page" id="second" label="Second page" />
					<Logo />
				</div>
			</TestWrapper>,
		));

	it("renders an open sidebar", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider memoryRouter>
				<Sidebar open modules={modules} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider memoryRouter>
				<div>
					<MenuToggle open />
					<EnhancedMenuItem open icon="cars" title="First page" id="first" label="First page" />
					<EnhancedMenuItem open icon="person" title="Second page" id="second" label="Second page" />
					<Logo />
				</div>
			</TestWrapper>,
		));

	it("renders a minimal sidebar", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider memoryRouter>
				<Sidebar />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider memoryRouter>
				<div>
					<MenuToggle />
					<Logo />
				</div>
			</TestWrapper>,
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
						config: { prependHref: "/Global/" },
					},
					modules: {
						tree: "modulesTree",
						visibleModules: ["route"],
						lastScopeAndModuleSelection: {
							scope: "Norway",
							moduleName: "Profiles",
							routingPerformed: false,
						},
					},
					settings: { defaultScope: "myScope" },
				}),
		};
	});

	it("renders a MenuItem with href", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider memoryRouter>
				<EnhancedMenuItem id="route" path="/Global/somewhere" />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider memoryRouter>
				<MenuItem href="/Global/route" />
			</TestWrapper>,
		));

	it("sets the active flag if path matches href", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider memoryRouter>
				<EnhancedMenuItem id="route" />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider memoryRouter>
				<MenuItem active href="/Global/route" />
			</TestWrapper>,
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
				<TestWrapper provider={{ store }} stylesProvider muiThemeProvider memoryRouter>
					<MenuToggle toggle={toggle} />
				</TestWrapper>,
				"when mounted",
				"to satisfy",
				<TestWrapper provider={{ store }} stylesProvider muiThemeProvider memoryRouter>
					<MenuItem id="sidebarMenuToggle" menuToggle icon="expand" onClick={expect.it("to be a function")} />
				</TestWrapper>,
			));

		it("renders as open", () =>
			expect(
				<TestWrapper provider={{ store }} stylesProvider muiThemeProvider memoryRouter>
					<MenuToggle toggle={toggle} open />
				</TestWrapper>,
				"when mounted",
				"to satisfy",
				<TestWrapper provider={{ store }} stylesProvider muiThemeProvider memoryRouter>
					<MenuItem id="sidebarMenuToggle" menuToggle open icon="collapse" onClick={expect.it("to be a function")} />
				</TestWrapper>,
			));
	});
});
