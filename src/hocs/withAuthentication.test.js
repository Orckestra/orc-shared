import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import withAuthentication, {
	Loader,
	Wrapper,
	Error,
} from "./withAuthentication";
import { ERROR, LOGOUT } from "../reducers/request";
import { GET_AUTHENTICATION_PROFILE } from "../actions/authentication";

const TestComp = () => <div />;

describe("withAuthentication", () => {
	let state, store;
	beforeEach(() => {
		state = Immutable.fromJS({
			requests: {},
			authentication: {
				name: "foo@bar.com",
			},
		});
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: () => {},
		};
	});

	it("shows the wrapped component if authenticated", () =>
		expect(withAuthentication, "called with", [TestComp])
			.then(EnhComp =>
				expect(
					<Provider store={store}>
						<EnhComp />
					</Provider>,
					"when deeply rendered",
				),
			)
			.then(render =>
				expect(render, "to contain", <TestComp />)
					.and("not to contain", <Loader />)
					.and("not to contain", <Error />),
			));

	it("shows a load indicator component if authentication is ongoing", () => {
		state = state.setIn(["requests", GET_AUTHENTICATION_PROFILE], true);
		return expect(withAuthentication, "called with", [TestComp])
			.then(EnhComp =>
				expect(
					<Provider store={store}>
						<EnhComp />
					</Provider>,
					"when deeply rendered",
				),
			)
			.then(render =>
				expect(render, "not to contain", <TestComp />)
					.and("to contain", <Loader />)
					.and("not to contain", <Error />),
			);
	});

	it("shows an error screen if not logged in", () => {
		state = state
			.deleteIn(["authentication", "name"])
			.setIn(["requests", LOGOUT], true);
		return expect(withAuthentication, "called with", [TestComp])
			.then(EnhComp =>
				expect(
					<Provider store={store}>
						<EnhComp />
					</Provider>,
					"when deeply rendered",
				),
			)
			.then(render =>
				expect(render, "not to contain", <TestComp />)
					.and("not to contain", <Loader />)
					.and(
						"to contain",
						<Error>
							<Wrapper>
								<h1>Not logged in</h1>
							</Wrapper>
						</Error>,
					),
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
		return expect(withAuthentication, "called with", [TestComp])
			.then(EnhComp =>
				expect(
					<Provider store={store}>
						<EnhComp />
					</Provider>,
					"when deeply rendered",
				),
			)
			.then(render =>
				expect(render, "not to contain", <TestComp />)
					.and("not to contain", <Loader />)
					.and(
						"to contain",
						<Error>
							<Wrapper>
								<h1>404 - NotFound</h1>
								Last failing action:{" "}
								<pre>
									{"{\n" +
										'  "type": "TEST_ACTION",\n' +
										'  "payload": {\n' +
										'    "status": 404,\n' +
										'    "message": "404 - NotFound"\n' +
										"  }\n" +
										"}"}
								</pre>
							</Wrapper>
						</Error>,
					),
			);
	});

	it("shows an error screen if an error without payload occured", () => {
		state = state.deleteIn(["authentication", "name"]).setIn(
			["requests", ERROR],
			Immutable.fromJS({
				type: "TEST_ACTION",
			}),
		);
		return expect(withAuthentication, "called with", [TestComp])
			.then(EnhComp =>
				expect(
					<Provider store={store}>
						<EnhComp />
					</Provider>,
					"when deeply rendered",
				),
			)
			.then(render =>
				expect(render, "not to contain", <TestComp />)
					.and("not to contain", <Loader />)
					.and(
						"to contain",
						<Error>
							<Wrapper>
								<h1>An error occurred</h1>
								Last failing action:{" "}
								<pre>{'{\n  "type": "TEST_ACTION"\n}'}</pre>
							</Wrapper>
						</Error>,
					),
			);
	});
});
