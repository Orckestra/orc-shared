import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import FullPage from "./Routing/FullPage";
import { Modules, Module } from "./Modules";

describe("Modules", () => {
	let modules, Mod2, Mod3, Page1, Page2, Page3, store, state;
	beforeEach(() => {
		Mod2 = () => <div />;
		Mod3 = () => <div />;
		Page1 = () => <div />;
		Page2 = () => <div />;
		Page3 = () => <div />;
		modules = {
			users: {
				label: "Module 1",
				icon: "user",
				segments: {
					"/page1": {
						component: Page1,
						title: "Page 1",
					},
					"/page2": {
						component: Page2,
						title: "Page 2",
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
						title: "Page 3",
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
			},
			router: {
				location: {},
			},
		});
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
	});

	it("renders a module table with navigation tabs", () => {
		jsdom.reconfigure({ url: "http://localhost/TestScope/demos" });
		return expect(
			<Provider store={store}>
				<BrowserRouter>
					<Modules modules={modules} scope="TestScope" />
				</BrowserRouter>
			</Provider>,
			"when deeply rendered",
			"to contain",
			<Navigation modules={modules} />,
		);
	});

	it("renders a module table as a routing system (user route)", () => {
		jsdom.reconfigure({ url: "http://localhost/TestScope/users" });
		return expect(
			<Provider store={store}>
				<BrowserRouter>
					<Modules modules={modules} scope="TestScope" />
				</BrowserRouter>
			</Provider>,
			"when deeply rendered",
			"to contain",
			<Switch>
				<Route>
					<Module config={modules.users} path="/:scope/users" />
				</Route>
			</Switch>,
		);
	});

	it("renders a module table as a routing system (photo route)", () => {
		jsdom.reconfigure({ url: "http://localhost/TestScope/photos" });
		return expect(
			<Provider store={store}>
				<BrowserRouter>
					<Modules modules={modules} scope="TestScope" />
				</BrowserRouter>
			</Provider>,
			"when deeply rendered",
			"to contain",
			<Switch>
				<Route>
					<Module config={modules.photos} path="/:scope/photos" />
				</Route>
			</Switch>,
		);
	});

	it("renders a module table as a routing system (demo route)", () => {
		jsdom.reconfigure({ url: "http://localhost/TestScope/demos" });
		return expect(
			<Provider store={store}>
				<BrowserRouter>
					<Modules modules={modules} scope="TestScope" />
				</BrowserRouter>
			</Provider>,
			"when deeply rendered",
			"to contain",
			<Switch>
				<Route>
					<Module config={modules.demos} path="/:scope/demos" />
				</Route>
			</Switch>,
		);
	});
});

describe("Module", () => {
	let modules, Mod1, Mod2, Mod3, Page1, Page2, Page3;
	beforeEach(() => {
		Mod1 = () => <div />;
		Mod2 = () => <div />;
		Mod3 = () => <div />;
		Page1 = () => <div />;
		Page2 = () => <div />;
		Page3 = () => <div />;
		modules = {
			users: {
				name: "users",
				label: "Module 1",
				icon: "user",
				mode: "segments",
				pages: {
					"/page1": {
						name: "page1",
						component: Page1,
						label: "Page 1",
					},
					"/page2": {
						name: "page2",
						component: Page2,
						label: "Page 2",
					},
				},
			},
			photos: {
				name: "photos",
				label: "Module 2",
				icon: "image",
				component: Mod1,
				pages: {
					"/:page3": {
						name: "page3",
						component: Page3,
						title: "Page 3",
					},
					"/page4": {
						name: "page4",
						label: "Page 4",
						mode: "segments",
						pages: {
							"/page1": {
								name: "page1",
								component: Page1,
								label: "Page 1",
							},
							"/page2": {
								name: "page2",
								component: Page2,
								label: "Page 2",
							},
						},
					},
				},
			},
			demos: {
				name: "demos",
				label: "Module 3",
				icon: "cloud",
				component: Mod2,
			},
			fail: {
				name: "fail",
				label: "Fault",
				icon: "explosion",
			},
			subpagefail: {
				name: "subpagefail",
				label: "Subpage failure",
				icon: "explosion",
				component: Mod3,
				pages: {
					"/missing": {
						name: "missing",
						label: "Missing component",
					},
				},
			},
		};
	});

	it("renders a main page", () =>
		expect(
			<Module config={modules.demos} path="/foo/bar" />,
			"renders elements",
			"to render as",
			<FullPage path="/foo/bar" config={modules.demos} />,
		));
});
