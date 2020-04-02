import React from "react";
import { Provider } from "react-redux";
import Immutable from "immutable";
import sinon from "sinon";
import { spyOnConsole } from "../utils/testUtils";
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

	describe("On localhost", () => {
		spyOnConsole(["log"]);

		it("uses console instead of iframe", () => {
			return expect(
				<Provider store={store}>
					<div>
						<Relogin />
					</div>
				</Provider>,
				"when mounted",
				"to satisfy",
				<div />,
			)
				.then(() =>
					expect(console.log, "to have calls satisfying", [
						{ args: ["%cYou have been logged out", "font-size: x-large"] },
						{
							args: [
								"Execute this function once logged in again to avoid interruption",
								expect.it("to be a function").and("when called"),
							],
						},
					]),
				)
				.then(() =>
					expect(store.dispatch, "to have calls satisfying", [
						{ args: [{ type: "__LOGIN_SUCCESS" }] },
					]),
				);
		});

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
			).then(() => expect(console.log, "was not called"));
		});
	});

	describe("elsewhere", () => {
		beforeEach(() => {
			delete window.location;
			window.location = {
				hostname: "foo.bar.com",
				origin: "http://foo.bar.com",
			};
		});

		it("is an iframe pointing to the origin", () =>
			expect(
				<Provider store={store}>
					<Relogin loggedOut />
				</Provider>,
				"when mounted",
				"to satisfy",
				<iframe title="relogin" src="http://foo.bar.com" />,
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
});
