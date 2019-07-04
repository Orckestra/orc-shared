import React from "react";
import { Provider } from "react-redux";
import Immutable from "immutable";
import sinon from "sinon";
import { LOGOUT } from "../reducers/request";
import { Relogin, withLoggedInStatus } from "./Relogin";

describe("Relogin", () => {
	let clear;
	beforeEach(() => {
		clear = () => {};
	});

	it("is an iframe pointing to the origin", () =>
		expect(
			<Relogin loggedOut clear={clear} />,
			"to render as",
			<iframe title="relogin" src={window.location.origin} onLoad={clear} />,
		));

	it("does not render if not needed", () =>
		expect(<Relogin loggedOut={false} />, "renders elements", "to be null"));
});

describe("withLoggedInStatus", () => {
	const TestComp = () => <div />;
	let state, store;
	beforeEach(() => {
		state = Immutable.fromJS({
			requests: {
				[LOGOUT]: true,
			},
		});
		store = {
			subscribe: () => {},
			dispatch: sinon.spy().named("dispatch"),
			getState: () => state,
		};
	});

	it("Sets logout status", () =>
		expect(withLoggedInStatus, "called with", [TestComp])
			.then(EnhComp =>
				expect(
					<Provider store={store}>
						<EnhComp />
					</Provider>,
					"to deeply render as",
					<TestComp
						loggedOut
						clear={expect.it("to be a function").and("called")}
					/>,
				),
			)
			.then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{ args: [{ type: "__LOGIN_SUCCESS" }] },
				]),
			));
});
