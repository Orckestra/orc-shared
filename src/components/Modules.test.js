import React from "react";
import { IntlProvider } from "react-intl";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { mount } from "unexpected-reaction";
import { Wrapper as SegmentWrapper, List as SegmentList, Item as SegmentItem } from "./Routing/SegmentPage";
import { Modules } from "./Modules";
import TabBar from "./MaterialUI/Navigation/TabBar";

describe("Modules", () => {
	let modules, Mod2, Mod3, Page1, Page2, Page3, store, state;

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
				route: {},
				config: { prependPath: "/:scope/", prependHref: "/TestScope/" },
			},
			router: {
				location: {},
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

	it("renders a module table with navigation tabs", () => {
		const component = (
			<Provider store={store}>
				<MemoryRouter initialEntries={["/TestScope/demos"]}>
					<IntlProvider locale="en">
						<Modules modules={modules} scope="TestScope" />
					</IntlProvider>
				</MemoryRouter>
			</Provider>
		);

		const module = {
			icon: "cloud",
			label: "Module 3",
			href: "/TestScope/demos",
			mappedFrom: "/TestScope/demos",
			active: true,
		};

		const expected = [
			<Provider store={store}>
				<MemoryRouter initialEntries={["/TestScope/demos"]}>
					<IntlProvider locale="en">
						<TabBar module={module} pages={[]} />
					</IntlProvider>
				</MemoryRouter>
			</Provider>,
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

		expect(
			mount(
				<Provider store={store}>
					<MemoryRouter initialEntries={["/TestScope/users/page1"]}>
						<IntlProvider locale="en">
							<Modules modules={modules} scope="TestScope" />
						</IntlProvider>
					</MemoryRouter>
				</Provider>,
			).childNodes,
			"to satisfy",
			[
				<Provider store={store}>
					<MemoryRouter initialEntries={["/TestScope/users/page1"]}>
						<IntlProvider locale="en">
							<TabBar module={module} pages={[]} />
						</IntlProvider>
					</MemoryRouter>
				</Provider>,
				<MemoryRouter initialEntries={["/TestScope/users/page1"]}>
					<SegmentWrapper>
						<SegmentList>
							<SegmentItem to="/TestScope/users/page1" active>
								Page 1
							</SegmentItem>
							<SegmentItem to="/TestScope/users/page2">Page 2</SegmentItem>
						</SegmentList>
						<Page1 />
					</SegmentWrapper>
				</MemoryRouter>,
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
				<Provider store={store}>
					<MemoryRouter initialEntries={["/TestScope/photos"]}>
						<IntlProvider locale="en">
							<Modules modules={modules} />
						</IntlProvider>
					</MemoryRouter>
				</Provider>,
			).childNodes,
			"to satisfy",
			[
				<Provider store={store}>
					<MemoryRouter initialEntries={["/TestScope/photos"]}>
						<IntlProvider locale="en">
							<TabBar module={module} pages={[]} />
						</IntlProvider>
					</MemoryRouter>
				</Provider>,
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
				<Provider store={store}>
					<MemoryRouter initialEntries={["/TestScope/demos"]}>
						<IntlProvider locale="en">
							<Modules modules={modules} />
						</IntlProvider>
					</MemoryRouter>
				</Provider>,
			).childNodes,
			"to satisfy",
			[
				<Provider store={store}>
					<MemoryRouter initialEntries={["/TestScope/demos"]}>
						<IntlProvider locale="en">
							<TabBar module={module} pages={[]} />
						</IntlProvider>
					</MemoryRouter>
				</Provider>,
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
				scopes: {
					TestScope: {
						id: "TestScope",
						name: { "en-CA": "Test 1" },
						foo: false,
						bar: false,
						children: ["test2"],
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
					<Provider store={store}>
						<MemoryRouter initialEntries={["/TestScope/demos"]}>
							<IntlProvider locale="en">
								<Modules modules={modules} pathConfig={{ customPath: "/", demos: { prependPath: "/:scope/" } }} />
							</IntlProvider>
						</MemoryRouter>
					</Provider>,
				).childNodes,
				"to satisfy",
				[
					<Provider store={store}>
						<MemoryRouter initialEntries={["/TestScope/demos"]}>
							<IntlProvider locale="en">
								<TabBar module={module} pages={[]} />
							</IntlProvider>
						</MemoryRouter>
					</Provider>,
					<Mod3 />,
				],
			);
		});
	});
});
