import React from "react";
import { Provider } from "react-redux";
import Immutable from "immutable";
import sinon from "sinon";
import { push } from "redux-little-router";
import { REMOVE_TAB } from "../../actions/navigation";
import withNavigationData from "./withNavigationData";

const TestComp = () => <div />;
const TestComp1 = () => <div />;

describe("withNavigation", () => {
	let state, store, modules;
	beforeEach(() => {
		state = Immutable.fromJS({
			router: {
				params: {
					scope: "TestScope",
				},
				result: {
					module: "test",
				},
			},
			navigation: {
				tabIndex: {
					"/TestScope/test/page1": {
						label: "Page 1",
						href: "/TestScope/test/page1",
					},
					"/TestScope/test/page2": {
						label: "Page 2",
						href: "/TestScope/test/page2",
					},
				},
				moduleTabs: {
					test: ["/TestScope/test/page1", "/TestScope/test/page2"],
				},
				segmentHrefs: {},
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
							label: "Page 2",
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
					params: {
						scope: "TestScope",
					},
					result: {
						module: "test",
						segments: true,
					},
				},
				navigation: {
					moduleTabs: { test: ["/TestScope/test/page2"] },
					tabIndex: {
						"/TestScope/test/page2": {
							label: "Page 2",
							href: "/TestScope/test/page2",
						},
					},
					segmentHrefs: {
						"/TestScope/test": "/TestScope/test/page1",
						"/TestScope/test/page2": "/TestScope/test/page2/sub",
					},
				},
			});
			modules = {
				test: {
					icon: "thing",
					label: "Thing",
					component: TestComp1,
					mode: "segments",
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
