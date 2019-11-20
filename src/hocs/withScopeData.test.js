import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import { RSAA } from "redux-api-middleware";
import sinon from "sinon";
import withScopeData from "./withScopeData";

jest.mock("../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = () => "URL";
	return modExport;
});

const TestComp = props => (
	<div>
		{"{\n  " +
			Object.entries(props)
				.map(
					([prop, value]) =>
						prop +
						": " +
						(typeof value === "function"
							? "function"
							: typeof value === "string"
							? '"' + value + '"'
							: value),
				)
				.join(",\n  ") +
			"\n}"}
	</div>
);
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
					"when mounted",
					"to satisfy",
					<TestComp
						match={{ path: "/", url: "/", params: {}, isExact: true }}
						location={{ pathname: "/", search: "", hash: "" }}
						history={{}}
						staticContext={undefined}
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
					"when mounted",
					"to be ok",
				),
			)
			.then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{
						args: [
							{
								[RSAA]: {
									types: [
										"GET_SCOPES_REQUEST",
										"GET_SCOPES_SUCCESS",
										"GET_SCOPES_FAILURE",
									],
								},
							},
						],
					},
				]),
			);
	});
});
