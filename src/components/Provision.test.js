import React from "react";
import Immutable from "immutable";
import { mount } from "unexpected-reaction";
import { createMuiTheme, spyOnConsole } from "../utils/testUtils";
import Provision from "./Provision";

jest.mock("../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = () => "URL";
	return modExport;
});

const fakeStore = {
	subscribe: listener => () => {},
	dispatch: action => action,
	getState: () =>
		Immutable.fromJS({
			locale: {
				locale: "en-US",
			},
			authentication: {
				name: "foo@bar.com",
			},
			scopes: {
				Global: {
					name: { en: "Global", fr: "Global" },
					id: "Global",
					children: ["MyScope"],
					currency: {
						displayName: {
							en: "Euro",
							fr: "Euro",
						},
					},
					defaultCulture: "en-US",
				},
				MyScope: {
					name: { en: "First child", fr: "Premier fils" },
					id: "FirstChild",
					children: ["ChildScope"],
					parentScopeId: "Global",
				},
				ChildScope: {
					name: { en: "First grandchild", fr: "Premier petit-fils" },
					id: "FirstGrandchild",
					parentScopeId: "MyScope",
				},
			},
			settings: {
				defaultScope: "myScope",
				loadedModulesScope: ["moduleA", "moduleB"],
				modules: ["moduleA", "moduleB"],
			},
			navigation: {
				route: {
					match: { path: "/:scope/TheModuleName/:entityId", params: { scope: "TheOldScope", entityId: "loaderId" } },
				},
				moduleTabs: {},
				config: { prependPath: "/:scope/", prependHref: "/Scope1/" },
			},
		}),
	replaceReducer: () => {},
};

const muiTheme = createMuiTheme();

const TestComp = () => <div>Test</div>;

describe("Provision", () => {
	spyOnConsole(["error"]);
	it("renders", () =>
		expect(
			<Provision store={fakeStore} muiTheme={muiTheme}>
				<TestComp />
			</Provision>,
			"when mounted",
			"to satisfy",
			<div>Test</div>,
		).then(() => expect(console.error, "was not called")));

	it("handles getting no mui theme", () => {
		let mountedComponent = () => expect(<Provision store={fakeStore} />, "when mounted");

		expect(mountedComponent, "to throw");
	});

	it("fails if no children given", () =>
		expect(
			() => expect(<Provision store={fakeStore} muiTheme={muiTheme} />, "when mounted"),
			"to throw",
			"React.Children.only expected to receive a single React element child.",
		).then(() =>
			expect(console.error, "to have calls satisfying", [
				{
					args: [
						expect.it(
							"to start with",
							"Error: Uncaught [Error: React.Children.only expected to receive a single React element child.]",
						),
						expect.it("to be an", Error),
					],
				},
				{},
			]),
		));

	describe("global styles", () => {
		it("ensures required styling on html element to make IE11 happy", () => {
			mount(
				<Provision store={fakeStore} muiTheme={muiTheme}>
					<div />
				</Provision>,
			);
			return expect("html", "as a selector to have style rules", "to contain", "height: 100%;");
		});

		it("ensures required body styling", () => {
			mount(
				<Provision store={fakeStore} muiTheme={muiTheme}>
					<div />
				</Provision>,
			);
			return expect(
				"body",
				"as a selector to have style rules",
				"to match",
				/body\s*\{\s*height: 100%;\s*margin: 0;\s*overflow: hidden;\s*\}/,
			);
		});

		it("ensures required viewport styling", () => {
			mount(
				<Provision store={fakeStore} muiTheme={muiTheme}>
					<div />
				</Provision>,
			);
			return expect("#app", "as a selector to have style rules", "to match", /#app\s*\{\s*height: 100%;\s*\}/);
		});
	});
});
