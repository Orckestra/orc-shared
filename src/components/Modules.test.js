import React from "react";
import Immutable from "immutable";
import { mount } from "unexpected-reaction";
import SegmentPage from "./Routing/SegmentPage";
import { Modules, Module } from "./Modules";
import TabBar from "./MaterialUI/Navigation/TabBar";
import { TestWrapper, createMuiTheme } from "./../utils/testUtils";
import sinon from "sinon";
import { createMemoryHistory } from "history";
import { INITIALIZE_FIRST_MODULE_SCOPE, SET_MODULE_AS_VISIBLE, SET_ROUTING_PERFORMED } from "../actions/modules";
import { resetLastScope } from "../selectors/navigation";

describe("Modules", () => {
	let modules, Mod2, Mod3, Page1, Page2, Page3, store, state, match;

	beforeEach(() => {
		resetLastScope();

		match = {
			url: "/TestScope/users/page1",
			path: "/:scope/users/page1",
			params: { scope: "TestScope" },
		};

		Mod2 = () => <div id="Mod2" />;
		Mod3 = () => <div id="Mod3" />;
		Page1 = () => <div id="Page1" />;
		Page2 = () => <div id="Page2" />;
		Page3 = () => <div id="Page3" />;
		modules = {
			users: {
				label: "Module 1",
				icon: "user",
				segments: {
					"/page1": {
						component: Page1,
						label: "Page 1",
					},
					"/page2": {
						component: Page2,
						label: "Page 2",
					},
				},
			},
			photos: {
				label: "Module 2",
				icon: "image",
				component: Mod2,
				pages: {
					"/:page3": {
						component: Page3,
						label: "Page 3",
					},
				},
			},
			demos: {
				label: "Module 3",
				icon: "cloud",
				component: Mod3,
			},
		};
		state = Immutable.fromJS({
			navigation: {
				tabIndex: {},
				moduleTabs: {},
				mappedHrefs: {},
				route: {
					match: match,
				},
				config: { prependPath: "/:scope/", prependHref: "/TestScope/" },
			},
			router: {
				location: {},
			},
			view: {
				edit: {
					users: {},
					photos: {},
					demos: {},
				},
			},
			requests: {
				logout: false,
			},
			settings: {
				defaultScope: "myScope",
			},
			scopes: {
				TestScope: {
					id: "TestScope",
					name: { "en-CA": "Test 1" },
					foo: false,
					bar: false,
					children: ["test2"],
					isAuthorizedScope: true,
				},
				TestScope1: {
					id: "TestScope1",
					name: { "en-CA": "Test 1" },
					foo: false,
					bar: false,
					children: ["test2"],
					isAuthorizedScope: false,
				},
			},
			modules: {
				tree: {},
				visibleModules: ["users", "demos", "photos"],
				lastScopeAndModuleSelection: {
					scope: "TestScope",
					moduleName: null,
					routingPerformed: false,
				},
			},
			locale: {
				locale: null,
				supportedLocales: [
					{ language: "English", cultureIso: "en-US" },
					{ language: "Francais", cultureIso: "fr" },
				],
			},
		});
		store = {
			subscribe: () => {},
			dispatch: sinon.spy().named("dispatch"),
			getState: () => state,
		};
	});

	const theme = createMuiTheme();

	it("renders a module table with navigation tabs", () => {
		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter={{ initialEntries: ["/TestScope/demos"] }}
				intlProvider
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<Modules modules={modules} scope="TestScope" />
			</TestWrapper>
		);

		const module = {
			icon: "cloud",
			label: "Module 3",
			href: "/TestScope/demos",
			mappedFrom: "/TestScope/demos",
			active: true,
		};

		const expected = [
			<TestWrapper
				provider={{ store }}
				memoryRouter={{ initialEntries: ["/TestScope/demos"] }}
				intlProvider
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={[]} />
			</TestWrapper>,
			<Mod3 />,
		];

		expect(mount(component).childNodes, "to satisfy", expected);
	});

	it("renders a module table when routing is required for photos", () => {
		const history = createMemoryHistory({ initialEntries: ["/TestScope/demos?arg=data"] });
		const mockHistoryPush = sinon.spy(history, "push");

		const component = (
			<TestWrapper provider={{ store }} router={{ history }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<Modules modules={modules} scope="TestScope" />
			</TestWrapper>
		);

		state = state.setIn(["modules", "lastScopeAndModuleSelection", "moduleName"], "photos");

		const module = {
			icon: "image",
			label: "Module 2",
			href: "/TestScope/photos",
			mappedFrom: "/TestScope/photos",
			active: true,
		};

		const expected = [
			<TestWrapper provider={{ store }} router={{ history }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<TabBar module={module} pages={[]} />
			</TestWrapper>,
			<Mod2 />,
		];

		expect(mount(component).childNodes, "to satisfy", expected);

		expect(mockHistoryPush, "to have calls satisfying", [{ args: ["/TestScope/photos"] }]);

		expect(store.dispatch, "to have a call satisfying", { args: [{ type: SET_ROUTING_PERFORMED }] });
	});

	it("renders a module table when routing is required for photos when already set correctly", () => {
		match.url = "/TestScope/demos";
		match.path = "/:scope/demos";

		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter={{ initialEntries: ["/TestScope/demos"] }}
				intlProvider
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<Modules modules={modules} scope="TestScope" />
			</TestWrapper>
		);

		state = state.setIn(["modules", "lastScopeAndModuleSelection", "routingPerformed"], true);
		state = state.setIn(["modules", "lastScopeAndModuleSelection", "moduleName"], "demos");

		const module = {
			icon: "cloud",
			label: "Module 3",
			href: "/TestScope/demos",
			mappedFrom: "/TestScope/demos",
			active: true,
		};

		const expected = [
			<TestWrapper
				provider={{ store }}
				memoryRouter={{ initialEntries: ["/TestScope/demos"] }}
				intlProvider
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={[]} />
			</TestWrapper>,
			<Mod3 />,
		];

		expect(mount(component).childNodes, "to satisfy", expected);
	});

	it("renders a module table on first available module if requested one not visible", () => {
		const history = createMemoryHistory({ initialEntries: ["/TestScope/demos?arg=data"] });
		const mockHistoryPush = sinon.spy(history, "push");

		const component = (
			<TestWrapper provider={{ store }} router={{ history }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<Modules modules={modules} scope="TestScope" />
			</TestWrapper>
		);

		state = state.setIn(["modules", "visibleModules"], Immutable.fromJS(["demos", "users"]));
		state = state.setIn(["modules", "lastScopeAndModuleSelection", "moduleName"], "photos");

		const module = {
			icon: "cloud",
			label: "Module 3",
			href: "/TestScope/demos",
			mappedFrom: "/TestScope/demos",
			active: true,
		};

		const expected = [
			<TestWrapper
				provider={{ store }}
				memoryRouter={{ initialEntries: ["/TestScope/demos"] }}
				intlProvider
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={[]} />
			</TestWrapper>,
			<Mod3 />,
		];

		expect(mount(component).childNodes, "to satisfy", expected);

		expect(mockHistoryPush, "to have calls satisfying", [{ args: ["/TestScope/demos"] }]);

		expect(store.dispatch, "to have a call satisfying", { args: [{ type: SET_ROUTING_PERFORMED }] });
	});

	it("renders a module table when routing cannot be performed without visible modules", () => {
		const history = createMemoryHistory({ initialEntries: ["/TestScope/demos?arg=data"] });
		const mockHistoryPush = sinon.spy(history, "push");

		const component = (
			<TestWrapper provider={{ store }} router={{ history }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<Modules modules={modules} scope="TestScope" />
			</TestWrapper>
		);

		state = state.setIn(["modules", "visibleModules"], Immutable.fromJS([]));
		state = state.setIn(["modules", "lastScopeAndModuleSelection", "moduleName"], "photos");

		mount(component);

		expect(mockHistoryPush, "not to have calls satisfying", [{ args: ["/TestScope/photos"] }]);

		expect(store.dispatch, "not to have calls satisfying", [{ args: [{ type: SET_ROUTING_PERFORMED }] }]);
	});

	it("renders a module table as a routing system (user route)", () => {
		const module = {
			icon: "user",
			label: "Module 1",
			href: "/TestScope/users",
			mappedFrom: "/TestScope/users",
			active: true,
		};

		const location = {
			pathname: "/TestScope/users/page1",
		};

		expect(
			mount(
				<TestWrapper
					provider={{ store }}
					memoryRouter={{ initialEntries: ["/TestScope/users/page1"] }}
					intlProvider
					stylesProvider
					muiThemeProvider={{ theme }}
				>
					<Modules modules={modules} scope="TestScope" />
				</TestWrapper>,
			).childNodes,
			"to satisfy",
			[
				<TestWrapper
					provider={{ store }}
					memoryRouter={{ initialEntries: ["/TestScope/users/page1"] }}
					intlProvider
					stylesProvider
					muiThemeProvider={{ theme }}
				>
					<TabBar module={module} pages={[]} />
				</TestWrapper>,
				<TestWrapper
					provider={{ store }}
					memoryRouter={{ initialEntries: ["/TestScope/users/page1"] }}
					stylesProvider
					muiThemeProvider={{ theme }}
				>
					<SegmentPage path="/:scope/users" location={location} segments={modules.users.segments} match={match} />
				</TestWrapper>,
			],
		);
	});

	it("renders a module table as a routing system (photo route)", () => {
		const module = {
			icon: "image",
			label: "Module 2",
			href: "/TestScope/photos",
			mappedFrom: "/TestScope/photos",
			active: true,
		};

		expect(
			mount(
				<TestWrapper
					provider={{ store }}
					memoryRouter={{ initialEntries: ["/TestScope/photos"] }}
					intlProvider
					stylesProvider
					muiThemeProvider={{ theme }}
				>
					<Modules modules={modules} />
				</TestWrapper>,
			).childNodes,
			"to satisfy",
			[
				<TestWrapper
					provider={{ store }}
					memoryRouter={{ initialEntries: ["/TestScope/photos"] }}
					intlProvider
					stylesProvider
					muiThemeProvider={{ theme }}
				>
					<TabBar module={module} pages={[]} />
				</TestWrapper>,
				<Mod2 />,
			],
		);
	});

	it("renders a module table as a routing system (demo route)", () => {
		const module = {
			icon: "cloud",
			label: "Module 3",
			href: "/TestScope/demos",
			mappedFrom: "/TestScope/demos",
			active: true,
		};

		expect(
			mount(
				<TestWrapper
					provider={{ store }}
					memoryRouter={{ initialEntries: ["/TestScope/demos"] }}
					intlProvider
					stylesProvider
					muiThemeProvider={{ theme }}
				>
					<Modules modules={modules} />
				</TestWrapper>,
			).childNodes,
			"to satisfy",
			[
				<TestWrapper
					provider={{ store }}
					memoryRouter={{ initialEntries: ["/TestScope/demos"] }}
					intlProvider
					stylesProvider
					muiThemeProvider={{ theme }}
				>
					<TabBar module={module} pages={[]} />
				</TestWrapper>,
				<Mod3 />,
			],
		);
	});

	it("properly sets visible modules and scope when not already set", () => {
		modules.users.hide = () => () => true;
		modules.demos.hide = false;

		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter={{ initialEntries: ["/TestScope/demos"] }}
				intlProvider
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<Modules modules={modules} scope="TestScope" />
			</TestWrapper>
		);

		state = state.setIn(["modules", "visibleModules"], Immutable.fromJS([]));
		state = state.setIn(["modules", "lastScopeAndModuleSelection", "moduleName"], null);
		state = state.setIn(["modules", "lastScopeAndModuleSelection", "scope"], null);

		mount(component);

		expect(store.dispatch, "to have a call satisfying", { args: [{ type: SET_MODULE_AS_VISIBLE, payload: "demos" }] });

		expect(store.dispatch, "to have a call satisfying", { args: [{ type: SET_MODULE_AS_VISIBLE, payload: "photos" }] });

		expect(store.dispatch, "not to have calls satisfying", [
			{ args: [{ type: SET_MODULE_AS_VISIBLE, payload: "users" }] },
		]);

		expect(store.dispatch, "to have a call satisfying", {
			args: [{ type: INITIALIZE_FIRST_MODULE_SCOPE, payload: "TestScope" }],
		});
	});

	it("Does not set visible modules and scope when route is not yet initialized", () => {
		modules.users.hide = () => () => true;
		modules.demos.hide = false;

		state = state.setIn(["navigation", "route", "match", "params", "scope"], null);

		state = state.setIn(["modules", "visibleModules"], Immutable.fromJS([]));

		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter={{ initialEntries: ["/TestScope/demos"] }}
				intlProvider
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<Modules modules={modules} scope="TestScope" />
			</TestWrapper>
		);

		mount(component);

		expect(store.dispatch, "not to have calls satisfying", [
			{ args: [{ type: SET_MODULE_AS_VISIBLE, payload: "demos" }] },
		]);

		expect(store.dispatch, "not to have calls satisfying", [
			{ args: [{ type: SET_MODULE_AS_VISIBLE, payload: "photos" }] },
		]);

		expect(store.dispatch, "not to have calls satisfying", [
			{ args: [{ type: SET_MODULE_AS_VISIBLE, payload: "users" }] },
		]);

		expect(store.dispatch, "not to have calls satisfying", [
			{ args: [{ type: INITIALIZE_FIRST_MODULE_SCOPE, payload: "TestScope" }] },
		]);
	});

	describe("with custom href", () => {
		beforeEach(() => {
			state = Immutable.fromJS({
				navigation: {
					tabIndex: {},
					moduleTabs: {},
					mappedHrefs: {},
					route: {},
					config: { customPath: "/", demos: { prependPath: "/:scope/" } },
					currentPrependPath: "/TestScope/",
				},
				router: {
					location: {},
				},
				settings: {
					defaultScope: "myScope",
				},
				modules: {
					tree: {},
					visibleModules: ["users", "demos", "photos"],
					lastScopeAndModuleSelection: {
						scope: "TestScope",
						moduleName: null,
						routingPerformed: false,
					},
				},
				view: {
					edit: {
						module: {},
					},
				},
				requests: {
					logout: false,
				},
				scopes: {
					TestScope: {
						id: "TestScope",
						name: { "en-CA": "Test 1" },
						foo: false,
						bar: false,
						children: ["test2"],
						isAuthorizedScope: true,
					},
				},
				locale: {
					locale: null,
					supportedLocales: [
						{ language: "English", cultureIso: "en-US" },
						{ language: "Francais", cultureIso: "fr" },
					],
				},
			});
		});

		const theme = createMuiTheme();

		it("renders a module table with custom prepend href ", () => {
			const module = {
				icon: "cloud",
				label: "Module 3",
				href: "/TestScope/demos",
				mappedFrom: "/TestScope/",
				active: true,
			};

			expect(
				mount(
					<TestWrapper
						provider={{ store }}
						memoryRouter={{ initialEntries: ["/TestScope/demos"] }}
						intlProvider
						stylesProvider
						muiThemeProvider={{ theme }}
					>
						<Modules modules={modules} pathConfig={{ customPath: "/", demos: { prependPath: "/:scope/" } }} />
					</TestWrapper>,
				).childNodes,
				"to satisfy",
				[
					<TestWrapper
						provider={{ store }}
						memoryRouter={{ initialEntries: ["/TestScope/demos"] }}
						intlProvider
						stylesProvider
						muiThemeProvider={{ theme }}
					>
						<TabBar module={module} pages={[]} />
					</TestWrapper>,
					<Mod3 />,
				],
			);
		});
	});

	describe("check is scope authorized", () => {
		let history;
		beforeAll(() => {
			history = createMemoryHistory({ initialEntries: ["/TestScope/demos?arg=data"] });
			sinon.spy(history, "push");
			history.push.named("history.push");
		});

		beforeEach(() => {
			state = Immutable.fromJS({
				navigation: {
					tabIndex: {},
					moduleTabs: {},
					mappedHrefs: {},
					route: {
						match: {
							url: "/TestScope/demos",
							params: {
								scope: "TestScope",
							},
						},
					},
					config: { prependPath: "/:scope/", prependHref: "/TestScope/" },
				},
				router: {
					location: {},
				},
				settings: {
					defaultScope: "TestScope2",
				},
				modules: {
					tree: {},
					visibleModules: ["users", "demos", "photos"],
					lastScopeAndModuleSelection: {
						scope: "TestScope",
						moduleName: null,
						routingPerformed: false,
					},
				},
				view: {
					edit: {
						module: {},
					},
				},
				requests: {
					logout: false,
				},
				scopes: {
					TestScope: {
						id: "TestScope",
						name: { "en-CA": "Test 1" },
						foo: false,
						bar: false,
						isAuthorizedScope: false,
						children: ["TestScope2"],
					},
					TestScope2: {
						id: "TestScope2",
						name: { "en-CA": "Test 2" },
						foo: false,
						bar: false,
						isAuthorizedScope: true,
						children: [],
					},
				},
				locale: {
					locale: null,
					supportedLocales: [
						{ language: "English", cultureIso: "en-US" },
						{ language: "Francais", cultureIso: "fr" },
					],
				},
			});
		});

		it("renders a module table when scope not Authorized", () => {
			mount(
				<TestWrapper provider={{ store }} router={{ history }} intlProvider>
					<Modules modules={modules} />
				</TestWrapper>,
			);

			expect(history.push, "to have calls satisfying", [{ args: ["/TestScope2/demos?arg=data"] }]);
		});
	});
});

describe("Module", () => {
	let config, Page1, store, state, match;

	let history, pushSpy;
	beforeAll(() => {
		history = createMemoryHistory({ initialEntries: ["/TestScope/demos"] });
		pushSpy = sinon.spy(history, "push");
		history.push.named("history.push");
	});

	beforeEach(() => {
		match = {
			url: "/TestScope/users/page1",
			path: "/:scope/users/page1",
			params: { scope: "TestScope" },
		};

		config = {
			label: "Module 1",
			icon: "user",
			hide: true,
			segments: {
				"/page1": {
					component: Page1,
					label: "Page 1",
				},
			},
		};
		state = Immutable.fromJS({
			navigation: {
				tabIndex: {},
				moduleTabs: {},
				mappedHrefs: {},
				route: {
					match: match,
				},
				config: { prependPath: "/:scope/", prependHref: "/TestScope/" },
			},
			router: {
				location: {},
			},
			modules: {
				tree: {},
				visibleModules: ["firstModule", "module123"],
				lastScopeAndModuleSelection: {
					scope: "TestScope",
					moduleName: "Profiles",
					routingPerformed: true,
				},
			},
			view: {
				edit: {
					users: {},
					photos: {},
					demos: {},
				},
			},
			requests: {
				logout: false,
			},
			settings: {
				defaultScope: "myScope",
			},
			scopes: {
				TestScope: {
					id: "TestScope",
					name: { "en-CA": "Test 1" },
					foo: false,
					bar: false,
					children: ["test2"],
					isAuthorizedScope: true,
				},
			},
			locale: {
				locale: null,
				supportedLocales: [
					{ language: "English", cultureIso: "en-US" },
					{ language: "Francais", cultureIso: "fr" },
				],
			},
		});
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
	});

	const theme = createMuiTheme();

	it("Calls pushes to first module when unauthorized user trying to access hidden module", () => {
		const component = (
			<TestWrapper provider={{ store }} router={{ history }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<Module id="notVisibleModule" config={config} match={match} path={match.path} location={{}} />
			</TestWrapper>
		);

		mount(component);

		expect(history.push, "to have calls satisfying", [{ args: ["/TestScope/firstModule"] }]);

		pushSpy.resetHistory();
	});

	it("Does not call pushes to first module when unauthorized user trying to access hidden module and hide property is a function which retrieves false", () => {
		config.hide = () => false;

		const component = (
			<TestWrapper provider={{ store }} router={{ history }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<Module id="firstModule" config={config} match={match} path={match.path} location={{}} />
			</TestWrapper>
		);

		mount(component);

		expect(history.push, "not to have calls satisfying", [{ args: ["/TestScope/firstModule"] }]);

		pushSpy.resetHistory();
	});

	it("Calls pushes to first module when unauthorized user trying to access hidden module and hide property is a function which retrieves true", () => {
		config.hide = () => true;

		const component = (
			<TestWrapper provider={{ store }} router={{ history }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<Module id="notVisibleModule" config={config} match={match} path={match.path} location={{}} />
			</TestWrapper>
		);

		mount(component);

		expect(history.push, "to have calls satisfying", [{ args: ["/TestScope/firstModule"] }]);

		pushSpy.resetHistory();
	});

	it("Does not call pushes to first module when already set to that location", () => {
		state = state.setIn(["navigation", "route", "match", "url"], "/TestScope/firstModule");
		state = state.setIn(["navigation", "route", "match", "path"], "/:scope/firstModule");

		config.hide = () => true;

		const component = (
			<TestWrapper provider={{ store }} router={{ history }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<Module id="notVisibleModule" config={config} match={match} path={match.path} location={{}} />
			</TestWrapper>
		);

		mount(component);

		expect(history.push, "not to have calls satisfying", [{ args: ["/TestScope/firstModule"] }]);

		pushSpy.resetHistory();
	});

	it("Does not call pushes to first module when redirection is not yet completed to new scope", () => {
		state = state.setIn(["modules", "lastScopeAndModuleSelection", "scope"], "newScope");

		config.hide = () => true;

		const component = (
			<TestWrapper provider={{ store }} router={{ history }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<Module id="notVisibleModule" config={config} match={match} path={match.path} location={{}} />
			</TestWrapper>
		);

		mount(component);

		expect(history.push, "not to have calls satisfying", [{ args: ["/TestScope/firstModule"] }]);

		pushSpy.resetHistory();
	});
});
