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
			"when mounted",
			"to satisfy",
			<iframe title="relogin" src={window.location.origin} onLoad={clear} />,
		));

	it("does not render if not needed", () =>
		expect(
			<div>
				<Relogin loggedOut={false} />
			</div>,
			"when mounted",
			"to satisfy",
			<div />,
		));
});

describe("withLoggedInStatus", () => {
	const TestComp = ({ clear }) => <div onClick={clear} />;
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
					"when mounted",
					"with event",
					"click",
				),
			)
			.then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{ args: [{ type: "__LOGIN_SUCCESS" }] },
				]),
			));
});
