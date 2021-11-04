import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import Authenticate, { Loader } from "./Authenticate";
import ApplicationModuleLoader from "./ApplicationModuleLoader";

const TestComp = () => {
	return <div className="test" />;
};

jest.mock("../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = () => "URL";
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
			dispatch: () => {},
		});
	});

	it("shows the Authenticate component when scopes configuration are all loaded", () =>
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
					<Authenticate>
						<TestComp />
					</Authenticate>
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
					<Authenticate>
						<TestComp />
					</Authenticate>
				</ThemeProvider>
			</Provider>,
			"when mounted",
			"to exhaustively satisfy",
			<ThemeProvider theme={{}}>
				<Loader />
			</ThemeProvider>,
		);
	});
});
