import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import withAuthentication, { Loader, Wrapper } from "./withAuthentication";
import { ERROR, LOGOUT } from "../reducers/request";
import { GET_AUTHENTICATION_PROFILE } from "../actions/authentication";

const TestComp = () => {
	return <div className="test"></div>;
};

describe("withAuthentication", () => {
	let state, store, AuthedComp;
	beforeEach(() => {
		state = Immutable.fromJS({
			requests: {},
			authentication: {
				name: "foo@bar.com",
			},
		});
		store = state => ({
			subscribe: () => {},
			getState: () => state,
			dispatch: () => {},
		});
		AuthedComp = withAuthentication(TestComp);
	});

	it("shows the wrapped component if authenticated", () =>
		expect(
			<Provider store={store(state)}>
				<AuthedComp />
			</Provider>,
			"when mounted",
			"to exhaustively satisfy",
			<TestComp />,
		));

	it("shows a load indicator component if authentication is ongoing", () => {
		state = state.setIn(["requests", GET_AUTHENTICATION_PROFILE], true);
		return expect(
			<Provider store={store(state)}>
				<AuthedComp />
			</Provider>,
			"when mounted",
			"to exhaustively satisfy",
			<Loader />,
		);
	});

	it("shows an error screen if not logged in", () => {
		state = state
			.deleteIn(["authentication", "name"])
			.setIn(["requests", LOGOUT], true);
		return expect(
			<Provider store={store(state)}>
				<AuthedComp />
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
				<AuthedComp />
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
				<AuthedComp />
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
