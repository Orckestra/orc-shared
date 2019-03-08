import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import sinon from "sinon";
import { push } from "connected-react-router";
import { REMOVE_TAB } from "../../actions/navigation";
import withNavigationData, { getPageData } from "./withNavigationData";

const TestComp = () => <div />;
const TestComp1 = () => <div />;
const TestComp2 = () => <div />;
const TestComp3 = () => <div />;
const TestComp4 = () => <div />;
const TestComp5 = () => <div />;
const TestComp6 = () => <div />;
const TestComp7 = () => <div />;

describe("withNavigation", () => {
	let state, store, modules;
	beforeEach(() => {
		state = Immutable.fromJS({
			objs: { test: { foo: { someField: "11" }, bar: { someField: "22" } } },
			navigation: {
				tabIndex: {
					"/TestScope/test/page1": {
						href: "/TestScope/test/page1",
						path: "/:scope/test/page1",
						params: { scope: "TestScope" },
					},
					"/OtherScope/test/foo": {
						href: "/OtherScope/test/foo",
						path: "/:scope/test/:page2",
						params: { scope: "OtherScope", page2: "foo" },
					},
					"/TestScope/test/notexist": {
						href: "/TestScope/test/notexist",
					},
				},
				moduleTabs: {
					test: [
						"/TestScope/test/page1",
						"/OtherScope/test/foo",
						"/TestScope/test/notexist",
					],
				},
				mappedHrefs: {},
				route: {
					match: {
						url: "/TestScope/test/page1",
						path: "/:scope/test/page1",
						params: { scope: "Global", page2: "bar" },
					},
				},
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
						component: TestComp3,
					},
				},
			},
		};
	});

	it("provides state information about navigation", () =>
		expect(withNavigationData, "called with", [TestComp]).then(EnhComp =>
			expect(
				<Provider store={store}>
					<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
						<EnhComp modules={modules} />
					</MemoryRouter>
				</Provider>,
				"to deeply render as",
				<TestComp
					pages={[
						{
							icon: "thing",
							label: "Thing",
							href: "/TestScope/test",
							mappedFrom: "/TestScope/test",
							active: false,
						},
						{
							label: "Page 1",
							href: "/TestScope/test/page1",
							mappedFrom: "/TestScope/test/page1",
							active: true,
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
				/>,
			),
		));

	it("handles incomplete paths", () => {
		state.setIn(
			["navigation", "route", "match"],
			Immutable.fromJS({
				url: "/",
				path: "/",
				params: {},
			}),
		);
		return expect(withNavigationData, "called with", [TestComp]).then(EnhComp =>
			expect(
				<Provider store={store}>
					<MemoryRouter initialEntries={["/"]}>
						<EnhComp modules={modules} />
					</MemoryRouter>
				</Provider>,
				"to deeply render as",
				<TestComp />,
			),
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
					moduleTabs: { test: ["/TestScope/test", "/TestScope/test/page2"] },
					tabIndex: {
						"/TestScope/test": {
							href: "/TestScope/test",
						},
						"/TestScope/test/page2": {
							href: "/TestScope/test/page2",
						},
					},
					mappedHrefs: {
						"/TestScope/test": "/TestScope/test/page1",
						"/TestScope/test/page2": "/TestScope/test/page2/sub",
					},
					route: {
						match: {
							url: "/TestScope/test/page1",
							path: "/:scope/test/page1",
							params: { scope: "TestScope" },
						},
					},
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
			expect(withNavigationData, "called with", [TestComp]).then(EnhComp =>
				expect(
					<Provider store={store}>
						<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
							<EnhComp modules={modules} />
						</MemoryRouter>
					</Provider>,
					"to deeply render as",
					<TestComp
						pages={[
							{
								icon: "thing",
								label: "Thing",
								href: "/TestScope/test/page1",
								mappedFrom: "/TestScope/test",
								active: true,
							},
							{
								label: { id: "page2", defaultMessage: "Page 2" },
								href: "/TestScope/test/page2/sub",
								mappedFrom: "/TestScope/test/page2",
								active: false,
							},
						]}
						moduleName="test"
						moduleHref="/TestScope/test/page1"
					/>,
				),
			));
	});

	it("provides a curryable close handler", () => {
		const fakeEvent = {
			stopPropagation: sinon.spy().named("stopPropagation"),
			preventDefault: sinon.spy().named("preventDefault"),
		};
		return expect(withNavigationData, "called with", [TestComp]).then(EnhComp =>
			expect(
				<Provider store={store}>
					<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
						<EnhComp modules={modules} />
					</MemoryRouter>
				</Provider>,
				"to deeply render as",
				<TestComp
					close={expect.it(
						"called with",
						["test", "/TestScope/test"],
						"called with",
						["/TestScope/test/page2/info", "/TestScope/test/page2"],
						"called with",
						[fakeEvent],
					)}
				/>,
			).then(() =>
				Promise.all([
					expect(store.dispatch, "to have calls satisfying", [
						{
							args: [
								{
									type: REMOVE_TAB,
									payload: { module: "test", path: "/TestScope/test/page2" },
								},
							],
						},
					]),
					expect(fakeEvent.stopPropagation, "was called once"),
					expect(fakeEvent.preventDefault, "was called once"),
				]),
			),
		);
	});

	it("navigates to module page if closing current tab", () => {
		const fakeEvent = {
			stopPropagation: sinon.spy().named("stopPropagation"),
			preventDefault: sinon.spy().named("preventDefault"),
		};
		return expect(withNavigationData, "called with", [TestComp]).then(EnhComp =>
			expect(
				<Provider store={store}>
					<MemoryRouter initialEntries={["/TestScope/test/page2/info"]}>
						<EnhComp modules={modules} />
					</MemoryRouter>
				</Provider>,
				"to deeply render as",
				<TestComp
					close={expect.it(
						"called with",
						["test", "/TestScope/test"],
						"called with",
						["/TestScope/test/page2/info", "/TestScope/test/page2"],
						"called with",
						[fakeEvent],
					)}
				/>,
			).then(() =>
				Promise.all([
					expect(store.dispatch, "to have calls satisfying", [
						{
							args: [
								{
									type: REMOVE_TAB,
									payload: { module: "test", path: "/TestScope/test/page2" },
								},
							],
						},
						{
							args: [push("/TestScope/test")],
						},
					]),
					expect(fakeEvent.stopPropagation, "was called once"),
					expect(fakeEvent.preventDefault, "was called once"),
				]),
			),
		);
	});
});

describe("getPageData", () => {
	let module;
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
	});

	it("extracts the module page data for an empty path", () =>
		expect(getPageData, "when called with", ["", {}, module], "to satisfy", {
			icon: "thing",
			label: "Thing",
			component: TestComp1,
			pages: {},
		}));

	it("extracts the data for a nested segment page", () =>
		expect(
			getPageData,
			"when called with",
			["/page3/seg2", {}, module],
			"to satisfy",
			{
				label: "Segment 2",
				component: TestComp5,
			},
		));

	it("extracts the data for a nested subpage", () =>
		expect(
			getPageData,
			"when called with",
			["/page2/sub1", {}, module],
			"to satisfy",
			{
				component: TestComp7,
			},
		));

	it("handles variable path steps", () =>
		expect(
			getPageData,
			"when called with",
			["/thing", { var: "thing" }, module],
			"to satisfy",
			{
				label: "Page 1",
				component: TestComp2,
			},
		));

	it("handles missing page data", () =>
		expect(
			getPageData,
			"when called with",
			["/page2/notHere", {}, module],
			"to be undefined",
		));
});
