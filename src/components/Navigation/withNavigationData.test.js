import React from "react";
import { Provider } from "react-redux";
import Immutable from "immutable";
import sinon from "sinon";
import { push } from "connected-react-router";
import { REMOVE_TAB } from "../../actions/navigation";
import withNavigationData from "./withNavigationData";

const TestComp = () => <div />;
const TestComp1 = () => <div />;
const TestComp2 = () => <div />;
const TestComp3 = () => <div />;
const TestComp4 = () => <div />;

describe("withNavigation", () => {
	let state, store, modules;
	beforeEach(() => {
		state = Immutable.fromJS({
			objs: { test: { foo: { someField: "11" }, bar: { someField: "22" } } },
			navigation: {
				tabIndex: {
					"/TestScope/test/page1": {
						href: "/TestScope/test/page1",
					},
					"/TestScope/test/page2": {
						href: "/TestScope/test/page2",
					},
				},
				moduleTabs: {
					test: ["/TestScope/test/page1", "/TestScope/test/page2"],
				},
				mappedHrefs: {},
				route: {
					match: {
						url: "/TestScope/test/page1",
						path: "/:scope/test/page1",
						params: { scope: "TestScope" },
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
					"/page2": {
						label: { id: "page2", defaultMessage: "Page 2 {someField}" },
						dataPath: ["objs", "test", "foo"],
						component: TestComp3,
					},
				},
			},
		};
		jsdom.reconfigure({ url: "http://localhost/TestScope/test/page1" });
	});

	it("provides state information about navigation", () =>
		expect(withNavigationData, "called with", [TestComp]).then(EnhComp =>
			expect(
				<Provider store={store}>
					<EnhComp modules={modules} />
				</Provider>,
				"to deeply render as",
				<TestComp
					pages={[
						{
							icon: "thing",
							label: "Thing",
							href: "/TestScope/test",
							active: false,
						},
						{
							label: "Page 1",
							href: "/TestScope/test/page1",
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
							href: "/TestScope/test/page2",
							active: false,
						},
					]}
					moduleName="test"
					moduleHref="/TestScope/test"
				/>,
			),
		));

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
					moduleTabs: { test: ["/TestScope/test/page2"] },
					tabIndex: {
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
							label: "Page 2",
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
						<EnhComp modules={modules} />
					</Provider>,
					"to deeply render as",
					<TestComp
						pages={[
							{
								icon: "thing",
								label: "Thing",
								href: "/TestScope/test/page1",
								active: true,
							},
							{
								label: "Page 2",
								href: "/TestScope/test/page2/sub",
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
					<EnhComp modules={modules} />
				</Provider>,
				"to deeply render as",
				<TestComp
					close={expect.it(
						"called with",
						["test", "/TestScope/test"],
						"called with",
						["/TestScope/test/page2"],
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
					<EnhComp modules={modules} />
				</Provider>,
				"to deeply render as",
				<TestComp
					close={expect.it(
						"called with",
						["test", "/TestScope/test"],
						"called with",
						["/TestScope/test/page1"],
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
									payload: { module: "test", path: "/TestScope/test/page1" },
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
