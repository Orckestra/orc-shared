import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import sinon from "sinon";
import withScopeData from "./withScopeData";

jest.mock("../utils/loadConfig", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = () => "URL";
	return modExport;
});

const TestComp = () => <div />;

describe("withScopeData", () => {
	let state, store;
	beforeEach(() => {
		state = Immutable.fromJS({
			input: {},
			locale: {
				locale: "en-CA",
				supportedLocales: ["en-US", "en-CA"],
			},
			navigation: {
				route: { location: {}, match: { params: { scope: "test3" } } },
			},
			scopes: {
				test1: {
					id: "test1",
					name: { "en-CA": "Test 1" },
					foo: false,
					bar: false,
				},
				test2: {
					id: "test2",
					name: { "en-US": "Test 2" },
					foo: false,
					bar: true,
				},
				test3: {
					id: "test3",
					name: { "en-CA": "Test 3" },
					foo: true,
					bar: false,
				},
				test4: {
					id: "test4",
					name: { "en-US": "Test 4" },
					foo: true,
					bar: true,
				},
			},
		});
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		};
	});

	it("provides scope data props to the enhanced component", () =>
		expect(withScopeData, "when called with", [TestComp])
			.then(Comp =>
				expect(
					<Provider store={store}>
						<MemoryRouter>
							<Comp />
						</MemoryRouter>
					</Provider>,
					"when deeply rendered",
					"to have rendered with all attributes",
					<TestComp
						currentScope={{
							id: "test3",
							name: "Test 3",
							foo: true,
							bar: false,
						}}
						getScope={expect
							.it("to be a function")
							.and("when called with", ["test2"], "to equal", {
								id: "test2",
								name: "Test 2",
								foo: false,
								bar: true,
							})}
						loadScopes={expect.it("to be a function")}
						match={{ path: "/", url: "/", params: {}, isExact: true }}
						location={{ pathname: "/", search: "", hash: "" }}
						history={expect.it("to be an object")}
					/>,
				),
			)
			.then(() => expect(store.dispatch, "was not called")));

	it("loads scopes if it has none", () => {
		state = state.set("scopes", Immutable.Map());
		return expect(withScopeData, "when called with", [TestComp])
			.then(Comp =>
				expect(
					<Provider store={store}>
						<MemoryRouter>
							<Comp />
						</MemoryRouter>
					</Provider>,
					"to deeply render as",
					<TestComp />,
				),
			)
			.then(() => expect(store.dispatch, "was called"));
	});
});
