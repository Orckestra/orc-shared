import React from "react";
import Immutable from "immutable";
import sinon from "sinon";
import Bar from "./Bar";
import Navigation from "./index";

const TestComp = () => <div />;

describe("Navigation", () => {
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
				component: TestComp,
			},
		};
	});

	it("renders a navigation tab bar with state-based props", () =>
		expect(
			<Navigation store={store} modules={modules} />,
			"renders elements",
			"to render as",
			<Bar
				pages={[
					{
						label: "Thing",
					},
					{
						label: "Page 1",
					},
					{
						label: "Page 2",
					},
				]}
				moduleName="test"
				moduleHref="/TestScope/test"
				close={expect.it("to be a function")}
			/>,
		));
});
