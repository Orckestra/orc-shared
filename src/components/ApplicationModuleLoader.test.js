import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Loader } from "./Authenticate";
import ApplicationModuleLoader from "./ApplicationModuleLoader";
import { mount } from "enzyme";
import { getDefaultScope, getScopes } from "../actions/scopes";
import sinon from "sinon";
import { initializeFirstModuleScope } from "../actions/modules";
import { scopeTypes } from "../constants";

const TestComp = () => {
	return <div className="test" />;
};

jest.mock("../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = (path = [], params = "") => "URL: " + path.join("/") + " " + JSON.stringify(params);
	return modExport;
});

describe("ApplicationModuleLoader", () => {
	let state, store;

	beforeEach(() => {
		state = Immutable.fromJS({
			requests: {},
			scopes: {
				test1: {
					id: "test1",
					name: { "en-CA": "Test 1", "en-US": "Test 1" },
					children: ["test2"],
				},
			},
			authentication: {
				name: "foo@bar.com",
			},
			settings: {
				defaultScope: "aDefaultScope",
				loadedModulesScope: ["moduleA", "moduleB"],
				modules: ["moduleA", "moduleB"],
			},
		});
		store = state => ({
			subscribe: () => {},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		});
	});

	it("shows the component when scopes configuration are all loaded", () =>
		expect(
			<Provider store={store(state)}>
				<ApplicationModuleLoader>
					<TestComp />
				</ApplicationModuleLoader>
			</Provider>,
			"when mounted",
			"to exhaustively satisfy",
			<TestComp />,
		));

	it("shows a load indicator component when default scope is still unknown", () => {
		state = state.setIn(["settings", "defaultScope"], null);
		return expect(
			<Provider store={store(state)}>
				<ThemeProvider theme={{}}>
					<ApplicationModuleLoader>
						<TestComp />
					</ApplicationModuleLoader>
				</ThemeProvider>
			</Provider>,
			"when mounted",
			"to exhaustively satisfy",
			<ThemeProvider theme={{}}>
				<Loader />
			</ThemeProvider>,
		);
	});

	it("shows a load indicator component when scopes trees are not loaded for all modules", () => {
		state = state.setIn(["settings", "loadedModulesScope"], Immutable.fromJS(["moduleA"]));
		return expect(
			<Provider store={store(state)}>
				<ThemeProvider theme={{}}>
					<ApplicationModuleLoader>
						<TestComp />
					</ApplicationModuleLoader>
				</ThemeProvider>
			</Provider>,
			"when mounted",
			"to exhaustively satisfy",
			<ThemeProvider theme={{}}>
				<Loader />
			</ThemeProvider>,
		);
	});

	it("scopes tree and default scope should be loaded when rendering the component", () => {
		const theStore = store(state);

		const component = (
			<Provider store={theStore}>
				<ThemeProvider theme={{}}>
					<ApplicationModuleLoader>
						<TestComp />
					</ApplicationModuleLoader>
				</ThemeProvider>
			</Provider>
		);

		mount(component);

		expect(theStore.dispatch, "to have calls satisfying", [
			{ args: [getDefaultScope("moduleA")] },
			{ args: [getScopes("moduleA")] },
			{ args: [getDefaultScope("moduleB")] },
			{ args: [getScopes("moduleB")] },
		]);
	});

	it("First module scope should be initialized when System is part application modules", () => {
		state = state.setIn(["settings", "modules"], Immutable.fromJS(["moduleA", "System"]));

		const theStore = store(state);

		const component = (
			<Provider store={theStore}>
				<ThemeProvider theme={{}}>
					<ApplicationModuleLoader>
						<TestComp />
					</ApplicationModuleLoader>
				</ThemeProvider>
			</Provider>
		);

		mount(component);

		expect(theStore.dispatch, "to have calls satisfying", [
			{ args: [initializeFirstModuleScope(scopeTypes.global)] },
			{ args: [getDefaultScope("moduleA")] },
			{ args: [getScopes("moduleA")] },
			{ args: [getDefaultScope("System")] },
			{ args: [getScopes("System")] },
		]);
	});
});
