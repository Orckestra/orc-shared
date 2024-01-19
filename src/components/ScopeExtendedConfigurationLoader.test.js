import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import ScopeExtendedConfigurationLoader from "./ScopeExtendedConfigurationLoader";
import { mount } from "enzyme";
import { getScopeExtendedConfiguration } from "../actions/scopes";
import sinon from "sinon";

jest.mock("../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = (path = [], params = "") => "URL: " + path.join("/") + " " + JSON.stringify(params);
	return modExport;
});

describe("ScopeExtendedConfigurationLoader", () => {
	let state, store;

	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				locale: "en-US",
			},
			authentication: {
				name: "foo@bar.com",
			},
			requests: {},
			scopes: {
				TheOldScope: {
					id: "TheOldScope",
					name: { "en-CA": "Test 1", "en-US": "TheOldScope" },
					children: ["test2"],
				},
			},
			settings: {
				defaultScope: "aDefaultScope",
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
		});
		store = state => ({
			subscribe: () => {},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		});
	});

	it("dispatch request to get extended configuration", () => {
		const theStore = store(state);

		const component = (
			<Provider store={theStore}>
				<ThemeProvider theme={{}}>
					<ScopeExtendedConfigurationLoader />
				</ThemeProvider>
			</Provider>
		);

		mount(component);

		expect(theStore.dispatch, "to have calls satisfying", [{ args: [getScopeExtendedConfiguration("TheOldScope")] }]);
	});
});
