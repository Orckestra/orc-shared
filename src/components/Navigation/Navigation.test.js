import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Immutable from "immutable";
import sinon from "sinon";
import Bar from "./Bar";
import Navigation from "./index";

const TestComp = () => <div />;
const TestComp1 = () => <div />;
const TestComp2 = () => <div />;

describe("Navigation", () => {
	let state, store, modules;
	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				tabIndex: {
					"/TestScope/test/page1": {
						href: "/TestScope/test/page1",
						path: "/:scope/test/page1",
						params: { scope: "TestScope" },
					},
					"/TestScope/test/page2": {
						href: "/TestScope/test/page2",
						path: "/:scope/test/page2",
						params: { scope: "TestScope" },
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
				component: TestComp,
				pages: {
					"/page1": {
						label: "Page 1",
						component: TestComp1,
					},
					"/page2": {
						label: "Page 2",
						component: TestComp2,
					},
				},
			},
		};
	});

	it("renders a navigation tab bar with state-based props", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/TestScope/test"]}>
					<Navigation modules={modules} />
				</MemoryRouter>
			</Provider>,
			"to deeply render as",
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
