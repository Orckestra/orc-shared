import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import withAuthentication, { Loader, Error } from "./withAuthentication";
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

	it("shows a load indicator component if authentication is ongoing", () => {
		state = state.deleteIn(["authentication", "name"]);
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
					.and("to contain", <Error />),
			);
	});
});
