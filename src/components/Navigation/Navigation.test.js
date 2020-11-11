import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Immutable from "immutable";
import sinon from "sinon";
import Navigation from "./index";
import TabBar from "../MaterialUI/Navigation/TabBar";
import { IntlProvider } from "react-intl";

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
			settings: {
				defaultScope: "myScope",
			},
		});
		store = {
			subscribe: () => { },
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

	it("renders a navigation tab bar with state-based props", () => {
		const module = {
			icon: 'thing',
			label: 'Thing',
			href: '/TestScope/test',
			mappedFrom: '/TestScope/test',
			active: false
		};

		const pages = [
			{
				label: 'Page 1',
				href: '/TestScope/test/page1',
				active: true
			},
			{
				label: 'Page 2',
				href: '/TestScope/test/page2',
				active: false
			}
		];

		expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/TestScope/test/page1"]}>
					<IntlProvider locale="en">
						<Navigation modules={modules} />
					</IntlProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<MemoryRouter>
					<IntlProvider locale="en">
						<TabBar module={module} pages={pages} />
					</IntlProvider>
				</MemoryRouter>
			</Provider>
		);
	});
});
