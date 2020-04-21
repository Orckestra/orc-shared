import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import { RSAA } from "redux-api-middleware";
import sinon from "sinon";
import { PropStruct } from "../../utils/testUtils";
import useScopeData from "./useScopeData";

jest.mock("../../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = () => "URL";
	return modExport;
});

const TestComp = ({ spy, ...props }) => {
	const [currentScope, defaultNodeState, getScope] = useScopeData();
	return (
		<div>
			<input id="getScope" value="" onChange={e => spy(getScope(e.target.value))} />
			<PropStruct
				currentScope={currentScope}
				defaultNodeState={defaultNodeState}
				{...props}
			/>
		</div>
	);
};

describe("useScopeData", () => {
	let state, store, spy;
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
					children: ["test2"],
				},
				test2: {
					id: "test2",
					name: { "en-US": "Test 2" },
					foo: false,
					bar: true,
					parentScopeId: "test1",
					children: ["test3", "test4"],
				},
				test3: {
					id: "test3",
					name: { "en-CA": "Test 3" },
					foo: true,
					bar: false,
					parentScopeId: "test2",
				},
				test4: {
					id: "test4",
					name: { "en-US": "Test 4" },
					foo: true,
					bar: true,
					parentScopeId: "test2",
				},
			},
			settings: {
				defaultScope: "ds",
			},
		});
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		};
		spy = sinon.spy().named("getScopeSpy");
	});

	it("provides scope data props to the enhanced component", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<TestComp spy={spy} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "change", target: "#getScope", value: "test2" },
			"to contain",
			<PropStruct
				currentScope={{
					id: "test3",
					name: "Test 3",
					foo: true,
					bar: false,
					parentScopeId: "test2",
				}}
				defaultNodeState={{ test1: true, test2: true }}
			/>,
		)
			.then(() =>
				expect(spy, "to have calls satisfying", [
					{
						args: [
							{
								id: "test2",
								name: "Test 2",
								foo: false,
								bar: true,
								parentScopeId: "test1",
								children: ["test3", "test4"],
							},
						],
					},
				]),
			)

			.then(() => expect(store.dispatch, "was not called")));

	it("loads scopes if it has none", () => {
		state = state.setIn(["scopes"], Immutable.Map());
		return expect(
			<Provider store={store}>
				<MemoryRouter>
					<TestComp />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to be a",
			"DOMElement",
		).then(() =>
			expect(store.dispatch, "to have calls satisfying", [
				{
					args: [
						{
							[RSAA]: {
								types: ["GET_SCOPES_REQUEST", "GET_SCOPES_SUCCESS", "GET_SCOPES_FAILURE"],
							},
						},
					],
				},
			]),
		);
	});
});
