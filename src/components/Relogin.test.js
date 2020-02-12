import React from "react";
import { Provider } from "react-redux";
import Immutable from "immutable";
import sinon from "sinon";
import { LOGOUT } from "../reducers/request";
import Relogin from "./Relogin";

describe("Relogin", () => {
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

	it("is an iframe pointing to the origin", () =>
		expect(
			<Provider store={store}>
				<Relogin loggedOut />
			</Provider>,
			"when mounted",
			"to satisfy",
			<iframe title="relogin" src={window.location.origin} />,
		));

	it("does not render if not needed", () => {
		state = state.setIn(["requests", LOGOUT], false);
		return expect(
			<Provider store={store}>
				<div>
					<Relogin loggedOut={false} />
				</div>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div />,
		);
	});

	it("Sets logout status", () =>
		expect(
			<Provider store={store}>
				<Relogin />
			</Provider>,
			"when mounted",
			"with event",
			{ type: "load" },
		).then(() =>
			expect(store.dispatch, "to have calls satisfying", [
				{ args: [{ type: "__LOGIN_SUCCESS" }] },
			]),
		));
});
