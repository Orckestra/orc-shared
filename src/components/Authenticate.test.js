import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import Authenticate, { Loader, Wrapper } from "./Authenticate";
import { ERROR, LOGOUT } from "../reducers/request";
import { GET_AUTHENTICATION_PROFILE } from "../actions/authentication";

const TestComp = () => {
	return <div className="test"></div>;
};

describe("Authenticate", () => {
	let state, store;
	beforeEach(() => {
		state = Immutable.fromJS({
			requests: {},
			authentication: {
				name: "foo@bar.com",
			},
			settings: {
				defaultScope: "aDefaultScope",
			},
		});
		store = state => ({
			subscribe: () => {},
			getState: () => state,
			dispatch: () => {},
		});
	});

	it("shows the wrapped component if authenticated and default scope is known", () =>
		expect(
			<Provider store={store(state)}>
				<Authenticate>
					<TestComp />
				</Authenticate>
			</Provider>,
			"when mounted",
			"to exhaustively satisfy",
			<TestComp />,
		));

	it("shows a load indicator component if authentication is ongoing", () => {
		state = state.setIn(["requests", GET_AUTHENTICATION_PROFILE], true);
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

	it("shows a load indicator component if default scope is unknown", () => {
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

	it("shows an error screen if not logged in", () => {
		state = state.deleteIn(["authentication", "name"]).setIn(["requests", LOGOUT], true);
		return expect(
			<Provider store={store(state)}>
				<Authenticate>
					<TestComp />
				</Authenticate>
			</Provider>,
			"when mounted",
			"to exhaustively satisfy",
			<Wrapper>
				<h1>Not logged in</h1>
			</Wrapper>,
		);
	});

	it("shows an error screen if an error occured", () => {
		state = state.deleteIn(["authentication", "name"]).setIn(
			["requests", ERROR],
			Immutable.fromJS({
				type: "TEST_ACTION",
				payload: { status: 404, message: "404 - NotFound" },
			}),
		);
		return expect(
			<Provider store={store(state)}>
				<Authenticate>
					<TestComp />
				</Authenticate>
			</Provider>,
			"when mounted",
			"to exhaustively satisfy",
			<Wrapper>
				<h1>404 - NotFound</h1>
				{"Last failing action: "}
				<pre>
					{"{\n" +
						'  "type": "TEST_ACTION",\n' +
						'  "payload": {\n' +
						'    "status": 404,\n' +
						'    "message": "404 - NotFound"\n' +
						"  }\n" +
						"}"}
				</pre>
			</Wrapper>,
		);
	});

	it("shows an error screen if an error without payload occured", () => {
		state = state.deleteIn(["authentication", "name"]).setIn(
			["requests", ERROR],
			Immutable.fromJS({
				type: "TEST_ACTION",
			}),
		);
		return expect(
			<Provider store={store(state)}>
				<Authenticate>
					<TestComp />
				</Authenticate>
			</Provider>,
			"when mounted",
			"to exhaustively satisfy",
			<Wrapper>
				<h1>An error occurred</h1>
				Last failing action: <pre>{'{\n  "type": "TEST_ACTION"\n}'}</pre>
			</Wrapper>,
		);
	});
});
