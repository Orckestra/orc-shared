import React from "react";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import { mount } from "enzyme";
import sinon from "sinon";
import { spyOnConsole } from "../../utils/testUtils";
import { REMOVE_TAB } from "../../actions/navigation";
import { resetLastScope } from "../../selectors/navigation";
import useNavigationState, { getPageData } from "./useNavigationState";
import Bar from "./Bar";
import { PropStruct } from "../../utils/testUtils";
import { cloneDeep } from "lodash";

const TestComp1 = props => (
	<div data-test-id="comp-1">
		<PropStruct {...props} />
	</div>
);
const TestComp2 = props => (
	<div data-test-id="comp-2">
		<PropStruct {...props} />
	</div>
);
const TestComp3 = props => (
	<div data-test-id="comp-3">
		<PropStruct {...props} />
	</div>
);
const TestComp4 = props => (
	<div data-test-id="comp-4">
		<PropStruct {...props} />
	</div>
);
const TestComp5 = props => (
	<div data-test-id="comp-5">
		<PropStruct {...props} />
	</div>
);
const TestComp6 = props => (
	<div data-test-id="comp-6">
		<PropStruct {...props} />
	</div>
);
const TestComp7 = props => (
	<div data-test-id="comp-7">
		<PropStruct {...props} />
	</div>
);
const TestComp8 = props => (
	<div data-test-id="comp-8">
		<PropStruct {...props} />
	</div>
);
const TestComp9 = props => (
	<div data-test-id="comp-9">
		<PropStruct {...props} />
	</div>
);

let firstPagTabClose = null;

const makeTestComp =
	Comp =>
	({ modules }) => {
		const navigationState = useNavigationState(modules);

		firstPagTabClose = navigationState.pages?.length >= 2 ? navigationState.pages[1].close : null;

		return <Comp {...navigationState}></Comp>;
	};

describe("useNavigationState", () => {
	spyOnConsole(["warn"]);

	let state, store, modules, TestBar, TestProps, modulesWithSelector;
	beforeEach(() => {
		state = Immutable.fromJS({
			objs: { test: { foo: { someField: "11" }, bar: { someField: "22" } } },
			navigation: {
				tabIndex: {
					test: {
						href: "/OtherScope/test",
						path: "/:scope/test",
						params: { scope: "OtherScope" },
					},
					"test/page1": {
						href: "/TestScope/test/page1",
						path: "/:scope/test/page1",
						params: { scope: "TestScope" },
					},
					"test/foo": {
						href: "/OtherScope/test/foo",
						path: "/:scope/test/:page2",
						params: { scope: "OtherScope", page2: "foo" },
					},
					"test/bar": {
						href: "/OtherScope/test/bar",
						path: "/:scope/test/:page2",
						params: { scope: "OtherScope", page2: "bar" },
					},
					"test/page3": {
						href: "/TestScope/test/page3",
						path: "/:scope/test/page3",
						params: { scope: "TestScope" },
					},
					"test/notexist": {
						href: "/TestScope/test/notexist",
					},
				},
				moduleTabs: {
					test: ["test", "test/page1", "test/foo", "test/bar", "test/page3", "test/notexist"],
				},
				mappedHrefs: {},
				route: {
					match: {
						url: "/TestScope/test/page1",
						path: "/:scope/test/page1",
						params: { scope: "TestScope", page2: "bar" },
					},
				},
				config: { prependPath: "/:scope/", prependHref: "/TestScope/" },
			},
			scopes: {
				Global: {
					id: "Global",
					name: { "en-CA": "Test 1" },
					foo: false,
					bar: false,
					children: ["test2"],
					scopePath: ["Global"],
				},
				TestScope: {
					id: "TestScope",
					name: { "en-CA": "Test 1" },
					foo: false,
					bar: false,
					children: ["test2"],
					scopePath: ["Global", "TestScope"],
				},
				OtherScope: {
					id: "OtherScope",
					name: { "en-CA": "Test 1" },
					foo: false,
					bar: false,
					children: ["test2"],
					scopePath: ["Global", "OtherScope"],
				},
			},
			locale: {
				locale: null,
				supportedLocales: [
					{ language: "English", cultureIso: "en-US" },
					{ language: "Francais", cultureIso: "fr" },
				],
			},
			settings: {
				defaultScope: "myScope",
			},
		});
		store = {
			subscribe: () => {},
			dispatch: sinon.spy().named("dispatch"),
			getState: () => state,
		};
		modules = {
			test: {
				icon: "thing",
				label: "Thing",
				component: TestComp1,
				pages: {
					"/page1": {
						label: "Page 1",
						component: TestComp2,
					},
					"/:page2": {
						label: { id: "page2", defaultMessage: "Page 2 {someField}" },
						dataPath: ["objs", "test"],
						dataIdParam: "page2",
						mustTruncate: true,
						component: TestComp3,
					},
					"/page3": {
						label: { id: "page3", defaultMessage: "Page 3 {someField}" },
						component: TestComp4,
						labelValueSelector: () => state => state.getIn(["objs", "test", "bar"]),
					},
				},
			},
		};
		modulesWithSelector = {
			test: {
				icon: "thing",
				label: "Thing",
				component: TestComp1,
				pageScopeSelector: (state, obj) => obj.scope,
				pages: {
					"/page1": {
						label: "Page 1",
						component: TestComp2,
					},
					"/:page2": {
						label: { id: "page2", defaultMessage: "Page 2 {someField}" },
						dataPath: ["objs", "test"],
						dataIdParam: "page2",
						mustTruncate: true,
						component: TestComp3,
					},
					"/page3": {
						label: { id: "page3", defaultMessage: "Page 3 {someField}" },
						component: TestComp4,
						labelValueSelector: () => state => state.getIn(["objs", "test", "bar"]),
					},
				},
			},
		};
		TestBar = makeTestComp(Bar);
		TestProps = makeTestComp(PropStruct);
	});
	afterEach(() => {
		resetLastScope();
	});

	it("provides state information about navigation without pages", () => {
		state = state
			.setIn(["navigation", "tabIndex"], Immutable.fromJS({}))
			.setIn(["navigation", "moduleTabs"], Immutable.fromJS({ test: [undefined] }));

		expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
						<TestBar modules={modules} />
					</MemoryRouter>
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<IntlProvider locale="en">
					<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
						<Bar
							module={{
								icon: "thing",
								label: "Thing",
								href: "/TestScope/test",
								mappedFrom: "/TestScope/test",
								active: false,
							}}
							pages={[]}
							moduleName="test"
							moduleHref="/TestScope/test"
						/>
					</MemoryRouter>
				</IntlProvider>
			</Provider>,
		).then(() =>
			expect(console.warn, "to have calls satisfying", [
				{
					args: ["Using dataPath label value pointers is deprecated, use labelValueSelector instead"],
				},
				{
					args: ["Using dataPath label value pointers is deprecated, use labelValueSelector instead"],
				},
			]),
		);
	});

	it("provides state information about navigation", () =>
		expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
						<TestBar modules={modules} />
					</MemoryRouter>
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<IntlProvider locale="en">
					<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
						<Bar
							module={{
								icon: "thing",
								label: "Thing",
								href: "/TestScope/test",
								mappedFrom: "/TestScope/test",
								active: false,
							}}
							pages={[
								{
									label: "Page 1",
									href: "/TestScope/test/page1",
									mappedFrom: "/TestScope/test/page1",
									active: true,
									params: "__ignore",
									path: "__ignore",
									outsideScope: false,
									scopeNotSupported: false,
								},
								{
									label: {
										id: "page2",
										defaultMessage: "Page 2 {someField}",
										values: {
											someField: "11",
										},
									},
									href: "/OtherScope/test/foo",
									mappedFrom: "/OtherScope/test/foo",
									active: false,
									params: "__ignore",
									path: "__ignore",
									mustTruncate: true,
									outsideScope: true,
									scopeNotSupported: false,
								},
								{
									label: {
										id: "page2",
										defaultMessage: "Page 2 {someField}",
										values: {
											someField: "22",
										},
									},
									href: "/OtherScope/test/bar",
									mappedFrom: "/OtherScope/test/bar",
									active: false,
									params: "__ignore",
									path: "__ignore",
									mustTruncate: true,
									outsideScope: true,
									scopeNotSupported: false,
								},
								{
									label: {
										id: "page3",
										defaultMessage: "Page 3 {someField}",
										values: { someField: "22" },
									},
									href: "/TestScope/test/page3",
									mappedFrom: "/TestScope/test/page3",
									active: false,
									params: "__ignore",
									path: "__ignore",
									outsideScope: false,
									scopeNotSupported: false,
								},
								{
									href: "/TestScope/test/notexist",
									mappedFrom: "/TestScope/test/notexist",
									label: "[Not found]",
									active: false,
								},
							]}
							moduleName="test"
							moduleHref="/TestScope/test"
						/>
					</MemoryRouter>
				</IntlProvider>
			</Provider>,
		).then(() =>
			expect(console.warn, "to have calls satisfying", [
				{
					args: ["Using dataPath label value pointers is deprecated, use labelValueSelector instead"],
				},
				{
					args: ["Using dataPath label value pointers is deprecated, use labelValueSelector instead"],
				},
			]),
		));

	it("provides state information about navigation when redirection is needed", () =>
		expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
						<TestBar modules={modulesWithSelector} />
					</MemoryRouter>
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<IntlProvider locale="en">
					<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
						<Bar
							module={{
								icon: "thing",
								label: "Thing",
								href: "/TestScope/test",
								mappedFrom: "/TestScope/test",
								active: false,
							}}
							pages={[
								{
									label: "Page 1",
									href: "/TestScope/test/page1",
									mappedFrom: "/TestScope/test/page1",
									active: true,
									params: "__ignore",
									path: "__ignore",
									outsideScope: false,
									scopeNotSupported: false,
								},
								{
									label: {
										id: "page2",
										defaultMessage: "Page 2 {someField}",
										values: {
											someField: "11",
										},
									},
									href: "/TestScope/test/foo",
									mappedFrom: "/TestScope/test/foo",
									active: false,
									params: "__ignore",
									path: "__ignore",
									mustTruncate: true,
									outsideScope: true,
									scopeNotSupported: true,
								},
								{
									label: {
										id: "page2",
										defaultMessage: "Page 2 {someField}",
										values: {
											someField: "22",
										},
									},
									href: "/TestScope/test/bar",
									mappedFrom: "/TestScope/test/bar",
									active: false,
									params: "__ignore",
									path: "__ignore",
									mustTruncate: true,
									outsideScope: true,
									scopeNotSupported: true,
								},
								{
									label: {
										id: "page3",
										defaultMessage: "Page 3 {someField}",
										values: { someField: "22" },
									},
									href: "/TestScope/test/page3",
									mappedFrom: "/TestScope/test/page3",
									active: false,
									params: "__ignore",
									path: "__ignore",
									outsideScope: false,
									scopeNotSupported: false,
								},
								{
									href: "/TestScope/test/notexist",
									mappedFrom: "/TestScope/test/notexist",
									label: "[Not found]",
									active: false,
								},
							]}
							moduleName="test"
							moduleHref="/TestScope/test"
						/>
					</MemoryRouter>
				</IntlProvider>
			</Provider>,
		).then(() =>
			expect(console.warn, "to have calls satisfying", [
				{
					args: ["Using dataPath label value pointers is deprecated, use labelValueSelector instead"],
				},
				{
					args: ["Using dataPath label value pointers is deprecated, use labelValueSelector instead"],
				},
			]),
		));

	it("provides state information about navigation when redirection is needed and currentScopeDefinition is undefined", () => {
		let stateWithEmptyScopes = cloneDeep(state);
		stateWithEmptyScopes = stateWithEmptyScopes.setIn(["scopes"], Immutable.Map());
		const storeWithEmptyScopes = {
			subscribe: () => {},
			dispatch: sinon.spy().named("dispatch"),
			getState: () => stateWithEmptyScopes,
		};

		expect(
			<Provider store={storeWithEmptyScopes}>
				<IntlProvider locale="en">
					<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
						<TestBar modules={modulesWithSelector} />
					</MemoryRouter>
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={storeWithEmptyScopes}>
				<IntlProvider locale="en">
					<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
						<Bar
							module={{
								icon: "thing",
								label: "Thing",
								href: "/TestScope/test",
								mappedFrom: "/TestScope/test",
								active: false,
							}}
							pages={[
								{
									label: "Page 1",
									href: "/TestScope/test/page1",
									mappedFrom: "/TestScope/test/page1",
									active: true,
									params: "__ignore",
									path: "__ignore",
									outsideScope: false,
									scopeNotSupported: false,
								},
								{
									label: {
										id: "page2",
										defaultMessage: "Page 2 {someField}",
										values: {
											someField: "11",
										},
									},
									href: "/TestScope/test/foo",
									mappedFrom: "/TestScope/test/foo",
									active: false,
									params: "__ignore",
									path: "__ignore",
									mustTruncate: true,
									outsideScope: true,
									scopeNotSupported: true,
								},
								{
									label: {
										id: "page2",
										defaultMessage: "Page 2 {someField}",
										values: {
											someField: "22",
										},
									},
									href: "/TestScope/test/bar",
									mappedFrom: "/TestScope/test/bar",
									active: false,
									params: "__ignore",
									path: "__ignore",
									mustTruncate: true,
									outsideScope: true,
									scopeNotSupported: true,
								},
								{
									label: {
										id: "page3",
										defaultMessage: "Page 3 {someField}",
										values: { someField: "22" },
									},
									href: "/TestScope/test/page3",
									mappedFrom: "/TestScope/test/page3",
									active: false,
									params: "__ignore",
									path: "__ignore",
									outsideScope: false,
									scopeNotSupported: false,
								},
								{
									href: "/TestScope/test/notexist",
									mappedFrom: "/TestScope/test/notexist",
									label: "[Not found]",
									active: false,
								},
							]}
							moduleName="test"
							moduleHref="/TestScope/test"
						/>
					</MemoryRouter>
				</IntlProvider>
			</Provider>,
		).then(() =>
			expect(console.warn, "to have calls satisfying", [
				{
					args: ["Using dataPath label value pointers is deprecated, use labelValueSelector instead"],
				},
				{
					args: ["Using dataPath label value pointers is deprecated, use labelValueSelector instead"],
				},
			]),
		);
	});

	it("handles incomplete paths", () => {
		state.setIn(
			["navigation", "route", "match"],
			Immutable.fromJS({
				url: "/",
				path: "/",
				params: {},
			}),
		);
		return expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/"]}>
					<TestProps modules={modules} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<PropStruct moduleName="" moduleHref="" module="__ignore" pages="__ignore" />,
		);
	});

	describe("with segments", () => {
		beforeEach(() => {
			state = Immutable.fromJS({
				router: {
					result: {
						module: "test",
						segments: true,
					},
				},
				navigation: {
					moduleTabs: { test: ["test", "test/page2"] },
					tabIndex: {
						test: {
							href: "/TestScope/test",
							params: { scope: "TestScope" },
						},
						"test/page2": {
							href: "/TestScope/test/page2",
							params: { scope: "TestScope" },
						},
					},
					mappedHrefs: {
						test: "test/page1",
						"test/page2": "test/page2/sub",
					},
					route: {
						match: {
							url: "/TestScope/test/page1",
							path: "/:scope/test/page1",
							params: { scope: "TestScope" },
						},
					},
					config: { prependPath: "/:scope/", prependHref: "/TestScope/" },
				},
				scopes: {
					TestScope: {
						id: "TestScope",
						name: { "en-CA": "Test 1" },
						foo: false,
						bar: false,
						children: ["test2"],
					},
					OtherScope: {
						id: "OtherScope",
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
				settings: {
					defaultScope: "myScope",
				},
			});
			modules = {
				test: {
					icon: "thing",
					label: "Thing",
					component: TestComp1,
					segments: {
						"/page1": {
							label: "Page 1",
							component: TestComp2,
						},
						"/page2": {
							label: { id: "page2", defaultMessage: "Page 2" },
							component: TestComp3,
							subpages: {
								"/sub": {
									component: TestComp4,
								},
							},
						},
					},
				},
			};
		});

		it("makes sure segment hrefs are correct", () =>
			expect(
				<Provider store={store}>
					<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
						<TestProps modules={modules} />
					</MemoryRouter>
				</Provider>,
				"when mounted",
				"to satisfy",
				<PropStruct
					module={{
						icon: "thing",
						label: "Thing",
						href: "/TestScope/test/page1",
						mappedFrom: "/TestScope/test",
						active: true,
					}}
					pages={[
						{
							label: { id: "page2", defaultMessage: "Page 2" },
							href: "/TestScope/test/page2/sub",
							mappedFrom: "/TestScope/test/page2",
							active: false,
							outsideScope: false,
							scopeNotSupported: false,
							params: "__ignore",
							close: () => {},
						},
					]}
					moduleName="test"
					moduleHref="/TestScope/test/page1"
				/>,
			));
	});

	describe("tab label values", () => {
		let page;
		beforeEach(() => {
			state = Immutable.fromJS({
				objs: { test: { foo: { someField: "11" }, bar: { someField: "22" } } },
				navigation: {
					tabIndex: {
						test: {
							href: "/TestScope/test",
							path: "/:scope/test",
							params: { scope: "TestScope" },
						},
						"test/foo": {
							href: "/TestScope/test/foo",
							path: "/:scope/test/:pageVar",
							params: { scope: "TestScope", pageVar: "foo" },
						},
						"test/bar": {
							href: "/TestScope/test/bar",
							path: "/:scope/test/:pageVar",
							params: { scope: "TestScope", pageVar: "bar" },
						},
					},
					moduleTabs: {
						test: ["test/foo", "test/bar"],
					},
					mappedHrefs: {},
					route: {
						match: {
							url: "/TestScope/test/page1",
							path: "/:scope/test/page1",
							params: { scope: "TestScope", page2: "bar" },
						},
					},
					config: { prependPath: "/:scope/", prependHref: "/TestScope/" },
				},
				scopes: {
					TestScope: {
						id: "TestScope",
						name: { "en-CA": "Test 1" },
						foo: false,
						bar: false,
						children: ["test2"],
					},
					OtherScope: {
						id: "OtherScope",
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
				settings: {
					defaultScope: "myScope",
				},
			});
			page = {
				label: { id: "page", defaultMessage: "Page {someField}" },
				component: TestComp1,
			};
			modules = page => ({
				test: {
					icon: "thing",
					label: "Thing",
					component: TestComp1,
					pages: {
						"/:pageVar": page,
					},
				},
			});
		});

		it("gets a state value for a tab via selector", () => {
			page.labelValueSelector =
				(params = {}) =>
				state => {
					return state.getIn(["objs", "test", params.pageVar]);
				};
			return expect(
				<Provider store={store}>
					<IntlProvider locale="en">
						<MemoryRouter initialEntries={["/TestScope/test/foo"]}>
							<TestBar modules={modules(page)} />
						</MemoryRouter>
					</IntlProvider>
				</Provider>,
				"when mounted",
				"to satisfy",
				<Provider store={store}>
					<IntlProvider locale="en">
						<MemoryRouter initialEntries={["/TestScope/test/foo"]}>
							<Bar
								module={{
									icon: "thing",
									label: "Thing",
									href: "/TestScope/test",
									mappedFrom: "/TestScope/test",
									active: false,
								}}
								pages={[
									{
										label: {
											id: "page",
											defaultMessage: "Page {someField}",
											values: {
												someField: "11",
											},
										},
										href: "/TestScope/test/foo",
										mappedFrom: "/TestScope/test/foo",
										active: true,
										params: { scope: "TestScope", pageVar: "foo" },
										path: "__ignore",
									},
									{
										label: {
											id: "page",
											defaultMessage: "Page {someField}",
											values: {
												someField: "22",
											},
										},
										href: "/TestScope/test/bar",
										mappedFrom: "/TestScope/test/bar",
										active: false,
										params: { scope: "TestScope", pageVar: "bar" },
										path: "__ignore",
									},
								]}
								moduleName="test"
								moduleHref="/TestScope/test"
							/>
						</MemoryRouter>
					</IntlProvider>
				</Provider>,
			);
		});

		it("handles if selector does not follow required function type", () => {
			page.labelValueSelector = (params = {}) => ({ stuff: true, params });
			return expect(
				<Provider store={store}>
					<IntlProvider locale="en">
						<MemoryRouter initialEntries={["/TestScope/test/foo"]}>
							<TestBar modules={modules(page)} />
						</MemoryRouter>
					</IntlProvider>
				</Provider>,
				"when mounted",
				"to satisfy",
				<Provider store={store}>
					<IntlProvider locale="en">
						<MemoryRouter initialEntries={["/TestScope/test/foo"]}>
							<Bar
								module={{
									icon: "thing",
									label: "Thing",
									href: "/TestScope/test",
									mappedFrom: "/TestScope/test",
									active: false,
								}}
								pages={[
									{
										label: {
											id: "page",
											defaultMessage: "Page {someField}",
											values: {},
										},
										href: "/TestScope/test/foo",
										mappedFrom: "/TestScope/test/foo",
										active: true,
										params: { scope: "TestScope", pageVar: "foo" },
										path: "__ignore",
									},
									{
										label: {
											id: "page",
											defaultMessage: "Page {someField}",
											values: {},
										},
										href: "/TestScope/test/bar",
										mappedFrom: "/TestScope/test/bar",
										active: false,
										params: { scope: "TestScope", pageVar: "bar" },
										path: "__ignore",
									},
								]}
								moduleName="test"
								moduleHref="/TestScope/test"
							/>
						</MemoryRouter>
					</IntlProvider>
				</Provider>,
			);
		});

		it("gets a state value for a tab via data path (deprecated)", () => {
			page.dataPath = ["objs", "test"];
			page.dataIdParam = "pageVar";
			return expect(
				<Provider store={store}>
					<IntlProvider locale="en">
						<MemoryRouter initialEntries={["/TestScope/test/foo"]}>
							<TestBar modules={modules(page)} />
						</MemoryRouter>
					</IntlProvider>
				</Provider>,
				"when mounted",
				"to satisfy",
				<Provider store={store}>
					<IntlProvider locale="en">
						<MemoryRouter initialEntries={["/TestScope/test/foo"]}>
							<Bar
								module={{
									icon: "thing",
									label: "Thing",
									href: "/TestScope/test",
									mappedFrom: "/TestScope/test",
									active: false,
								}}
								pages={[
									{
										label: {
											id: "page",
											defaultMessage: "Page {someField}",
											values: {
												someField: "11",
											},
										},
										href: "/TestScope/test/foo",
										mappedFrom: "/TestScope/test/foo",
										active: true,
										params: { scope: "TestScope", pageVar: "foo" },
										path: "__ignore",
									},
									{
										label: {
											id: "page",
											defaultMessage: "Page {someField}",
											values: {
												someField: "22",
											},
										},
										href: "/TestScope/test/bar",
										mappedFrom: "/TestScope/test/bar",
										active: false,
										params: { scope: "TestScope", pageVar: "bar" },
										path: "__ignore",
									},
								]}
								moduleName="test"
								moduleHref="/TestScope/test"
							/>
						</MemoryRouter>
					</IntlProvider>
				</Provider>,
			).then(() =>
				expect(console.warn, "to have calls satisfying", [
					{
						args: ["Using dataPath label value pointers is deprecated, use labelValueSelector instead"],
					},
					{
						args: ["Using dataPath label value pointers is deprecated, use labelValueSelector instead"],
					},
				]),
			);
		});
	});

	it("provides a close handler for tabs", () => {
		const fakeEvent = {
			stopPropagation: sinon.spy().named("stopPropagation"),
			preventDefault: sinon.spy().named("preventDefault"),
		};
		return expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
						<TestBar modules={modules} />
					</MemoryRouter>
				</IntlProvider>
			</Provider>,
			"when mounted",
			"with event",
			{
				type: "click",
				target: '[data-href="/TestScope/test/page3"] svg',
				data: fakeEvent,
			},
		).then(() =>
			Promise.all([
				expect(store.dispatch, "to have calls satisfying", [
					{
						args: [
							{
								type: REMOVE_TAB,
								payload: { module: "test", path: "/TestScope/test/page3" },
							},
						],
					},
				]),
				expect(fakeEvent.stopPropagation, "was called once"),
				expect(fakeEvent.preventDefault, "was called once"),
			]),
		);
	});

	it("Tab closing handler is not invoked when entity selector returns invalid entity", () => {
		const fakeEvent = {
			stopPropagation: sinon.spy().named("stopPropagation"),
			preventDefault: sinon.spy().named("preventDefault"),
		};

		const closingHandler = sinon.spy().named("closingHandler");
		const entitySelector = sinon.spy(() => ({ entityId: "entityId" })).named("entitySelector");

		modules.test.closingTabHandler = {
			handler: closingHandler,
			entitySelector: entitySelector,
		};

		return expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
						<TestBar modules={modules} />
					</MemoryRouter>
				</IntlProvider>
			</Provider>,
			"when mounted",
			"with event",
			{
				type: "click",
				target: '[data-href="/TestScope/test/page3"] svg',
				data: fakeEvent,
			},
		).then(() =>
			Promise.all([
				expect(store.dispatch, "to have calls satisfying", [
					{
						args: [
							{
								type: REMOVE_TAB,
								payload: { module: "test", path: "/TestScope/test/page3" },
							},
						],
					},
				]),
				expect(fakeEvent.stopPropagation, "was called once"),
				expect(fakeEvent.preventDefault, "was called once"),
				expect(closingHandler, "was not called"),
				expect(entitySelector, "was called once"),
			]),
		);
	});

	it("Tab closing handler is not invoked when entity selector returns undefined", () => {
		const fakeEvent = {
			stopPropagation: sinon.spy().named("stopPropagation"),
			preventDefault: sinon.spy().named("preventDefault"),
		};

		const closingHandler = sinon.spy().named("closingHandler");
		const entitySelector = sinon.spy(() => {}).named("entitySelector");

		modules.test.closingTabHandler = {
			handler: closingHandler,
			entitySelector: entitySelector,
		};

		return expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
						<TestBar modules={modules} />
					</MemoryRouter>
				</IntlProvider>
			</Provider>,
			"when mounted",
			"with event",
			{
				type: "click",
				target: '[data-href="/TestScope/test/page3"] svg',
				data: fakeEvent,
			},
		).then(() =>
			Promise.all([
				expect(store.dispatch, "to have calls satisfying", [
					{
						args: [
							{
								type: REMOVE_TAB,
								payload: { module: "test", path: "/TestScope/test/page3" },
							},
						],
					},
				]),
				expect(fakeEvent.stopPropagation, "was called once"),
				expect(fakeEvent.preventDefault, "was called once"),
				expect(closingHandler, "was not called"),
				expect(entitySelector, "was called once"),
			]),
		);
	});

	it("Tab closing handler is not invoked when entity selector returns invalid entity id", () => {
		const fakeEvent = {
			stopPropagation: sinon.spy().named("stopPropagation"),
			preventDefault: sinon.spy().named("preventDefault"),
		};

		const closingHandler = sinon.spy().named("closingHandler");
		const entitySelector = sinon.spy(() => ({ entity: {} })).named("entitySelector");

		modules.test.closingTabHandler = {
			handler: closingHandler,
			entitySelector: entitySelector,
		};

		return expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
						<TestBar modules={modules} />
					</MemoryRouter>
				</IntlProvider>
			</Provider>,
			"when mounted",
			"with event",
			{
				type: "click",
				target: '[data-href="/TestScope/test/page3"] svg',
				data: fakeEvent,
			},
		).then(() =>
			Promise.all([
				expect(store.dispatch, "to have calls satisfying", [
					{
						args: [
							{
								type: REMOVE_TAB,
								payload: { module: "test", path: "/TestScope/test/page3" },
							},
						],
					},
				]),
				expect(fakeEvent.stopPropagation, "was called once"),
				expect(fakeEvent.preventDefault, "was called once"),
				expect(closingHandler, "was not called"),
				expect(entitySelector, "was called once"),
			]),
		);
	});

	it("Ensure tab closing handler is invoked when closing a tab", () => {
		const fakeEvent = {
			stopPropagation: sinon.spy().named("stopPropagation"),
			preventDefault: sinon.spy().named("preventDefault"),
		};

		const closingHandler = sinon.spy().named("closingHandler");
		const entitySelector = sinon.spy(() => ({ entityId: "entityId", entity: {} })).named("entitySelector");

		modules.test.closingTabHandler = {
			handler: closingHandler,
			entitySelector: entitySelector,
		};

		return expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
						<TestBar modules={modules} />
					</MemoryRouter>
				</IntlProvider>
			</Provider>,
			"when mounted",
			"with event",
			{
				type: "click",
				target: '[data-href="/TestScope/test/page3"] svg',
				data: fakeEvent,
			},
		).then(() =>
			Promise.all([
				expect(store.dispatch, "to have calls satisfying", [
					{
						args: [
							{
								type: REMOVE_TAB,
								payload: { module: "test", path: "/TestScope/test/page3" },
							},
						],
					},
				]),
				expect(fakeEvent.stopPropagation, "was called once"),
				expect(fakeEvent.preventDefault, "was called once"),
				expect(entitySelector, "was called once"),
				expect(closingHandler, "was called once"),
			]),
		);
	});

	it("Ensure tab closing handler is invoked when explicitly closing a tab", () => {
		const fakeEvent = {
			stopPropagation: sinon.spy().named("stopPropagation"),
			preventDefault: sinon.spy().named("preventDefault"),
		};

		const closingHandler = sinon.spy().named("closingHandler");
		const entitySelector = sinon.spy(() => ({ entityId: "entityId", entity: {} })).named("entitySelector");

		modules.test.closingTabHandler = {
			handler: closingHandler,
			entitySelector: entitySelector,
		};

		const component = (
			<Provider store={store}>
				<IntlProvider locale="en">
					<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
						<TestBar modules={modules} />
					</MemoryRouter>
				</IntlProvider>
			</Provider>
		);

		mount(component);

		expect(firstPagTabClose, "not to be null");

		firstPagTabClose(null, true);

		expect(fakeEvent.stopPropagation, "was not called");
		expect(fakeEvent.preventDefault, "was not called");
		expect(closingHandler, "was called once");
		expect(entitySelector, "was called once");
	});
});
describe("getPageData", () => {
	let module, module2, module3;
	beforeEach(() => {
		module = {
			icon: "thing",
			label: "Thing",
			component: TestComp1,
			pages: {
				"/:var": {
					label: "Page 1",
					component: TestComp2,
				},
				"/page2": {
					label: { id: "page2", defaultMessage: "Page 2 {someField}" },
					dataPath: ["objs", "test", "foo"],
					component: TestComp3,
					subpages: {
						"/sub1": {
							component: TestComp7,
						},
					},
				},
				"/page3": {
					label: "Page 3",
					segments: {
						"/seg1": {
							label: "Segment 1",
							component: TestComp4,
						},
						"/seg2": {
							label: "Segment 2",
							component: TestComp5,
						},
						"/seg3": {
							label: "Segment 3",
							component: TestComp6,
						},
					},
				},
			},
		};
		module2 = {
			icon: "thing",
			label: "Thing",
			component: TestComp1,
			pages: {
				"/:var/:var2": {
					label: "Page 4",
					component: TestComp8,
				},
			},
		};
		module3 = {
			icon: "thing",
			label: "Thing",
			component: TestComp1,
			pages: {
				"/:var2(abc\\d{1,2})": {
					label: "Page 5",
					component: TestComp9,
				},
				"/:var3(def\\d{1,3})": {
					label: "Page 6",
					component: TestComp7,
				},
			},
		};
	});

	it("extracts the module page data for an empty path", () =>
		expect(getPageData, "when called with", ["", {}, module], "to satisfy", {
			icon: "thing",
			label: "Thing",
			component: TestComp1,
			pages: {},
		}));

	it("extracts the data for a nested segment page", () =>
		expect(getPageData, "when called with", ["/page3/seg2", {}, module], "to satisfy", {
			label: "Segment 2",
			component: TestComp5,
		}));

	it("extracts the data for a nested subpage", () =>
		expect(getPageData, "when called with", ["/page2/sub1", {}, module], "to satisfy", {
			component: TestComp7,
		}));

	it("handles variable path steps", () =>
		expect(getPageData, "when called with", ["/thing", { var: "thing" }, module], "to satisfy", {
			label: "Page 1",
			component: TestComp2,
		}));

	it("handles variable path steps which uses 'path to regex'", () =>
		expect(getPageData, "when called with", ["/abc99", { var2: "abc99" }, module3], "to satisfy", {
			label: "Page 5",
			component: TestComp9,
		}));

	it("handles variable path steps which uses 'path to regex' with multiple pages", () =>
		expect(getPageData, "when called with", ["/def666", { var3: "def666" }, module3], "to satisfy", {
			label: "Page 6",
			component: TestComp7,
		}));

	it("handles multiple variable path steps", () =>
		expect(
			getPageData,
			"when called with",
			["/firstThing/secondThing", { var: "firstThing", var2: "secondThing" }, module2],
			"to satisfy",
			{
				label: "Page 4",
				component: TestComp8,
			},
		));

	it("handles missing data with multiple variable path steps", () =>
		expect(
			getPageData,
			"when called with",
			["/firstThing/notHere", { var: "firstThing", var2: "secondThing" }, module2],
			"to be undefined",
		));

	it("handles missing page data", () =>
		expect(getPageData, "when called with", ["/page2/notHere", {}, module], "to be undefined"));
});
