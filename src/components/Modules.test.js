import React from "react";
import Immutable from "immutable";
import { mount } from "unexpected-reaction";
import SegmentPage from "./Routing/SegmentPage";
import { Modules } from "./Modules";
import TabBar from "./MaterialUI/Navigation/TabBar";
import { TestWrapper, createMuiTheme } from "./../utils/testUtils";
import sinon from "sinon";
import { createMemoryHistory } from "history";

describe("Modules", () => {
	let modules, Mod2, Mod3, Page1, Page2, Page3, store, state;

	const match = {
		url: "/TestScope/users/page1",
		path: "/:scope/users/page1",
		params: { scope: "TestScope" },
	};

	beforeEach(() => {
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
			modules: {
				tree: {},
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
