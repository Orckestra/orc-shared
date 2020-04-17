import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Immutable from "immutable";
import sinon from "sinon";
import { TabBar, ScrollableBar } from "./Bar";
import Tab from "./Tab";
import Navigation from "./index";

jest.mock("./Tab", () => ({
	__esModule: true,
	default: require("../../utils/testUtils").PropStruct,
}));

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
					test: ["/TestScope/test", "/TestScope/test/page1", "/TestScope/test/page2"],
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
				<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
					<Navigation modules={modules} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<TabBar>
					<Tab
						active={false}
						href="/TestScope/test"
						icon="thing"
						label="Thing"
						mappedFrom="/TestScope/test"
						module
					/>
					<ScrollableBar>
						<Tab
							active={true}
							close={() => {}}
							href="/TestScope/test/page1"
							label="Page 1"
							mappedFrom="/TestScope/test/page1"
							hide={false}
							outsideScope={false}
						/>
						<Tab
							active={false}
							close={() => {}}
							href="/TestScope/test/page2"
							label="Page 2"
							mappedFrom="/TestScope/test/page2"
							hide={false}
							outsideScope={false}
						/>
					</ScrollableBar>
				</TabBar>
			</MemoryRouter>,
		));
});
