import React from "react";
import Immutable from "immutable";
import sinon from "sinon";
import Navigation from "./index";
import TabBar from "../MaterialUI/Navigation/TabBar";
import { TestWrapper, createMuiTheme } from "./../../utils/testUtils";

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
				config: { prependPath: "/:scope/", prependHref: "/TestScope/" },
			},
			modules: {
				tree: {},
			},
			view: {
				edit: {
					test: {},
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

	const theme = createMuiTheme();

	it("renders a navigation tab bar with state-based props", () => {
		const module = {
			icon: "thing",
			label: "Thing",
			href: "/TestScope/test",
			mappedFrom: "/TestScope/test",
			active: false,
		};

		const pages = [
			{
				label: "Page 1",
				href: "/TestScope/test/page1",
				active: true,
				params: { scope: "TestScope", entityId: "page1" },
				path: "/:scope/test/:entityId",
			},
			{
				label: "Page 2",
				href: "/TestScope/test/page2",
				active: false,
				params: { scope: "TestScope", entityId: "page2" },
				path: "/:scope/test/:entityId",
			},
		];

		expect(
			<TestWrapper
				provider={{ store }}
				memoryRouter={{ initialEntries: ["/TestScope/test/page1"] }}
				intlProvider
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<Navigation modules={modules} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} memoryRouter intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<TabBar module={module} pages={pages} />
			</TestWrapper>,
		);
	});
});
