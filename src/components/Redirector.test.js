import React from "react";
import { Provider } from "react-redux";
import sinon from "sinon";
import { replace } from "redux-little-router";
import Redirector from "./Redirector";

describe("Redirector", () => {
	let store, clock;
	beforeEach(() => {
		store = {
			subscribe: () => {},
			getState: () => ({}),
			dispatch: sinon.spy().named("dispatch"),
		};
		clock = sinon.useFakeTimers();
	});
	afterEach(() => {
		clock.restore();
	});

	it("dispatches a replace action immediately upon mount", () =>
		expect(
			<Provider store={store}>
				<Redirector href="/path/to/redirect" />
			</Provider>,
			"when deeply rendered",
		)
			.then(() => {
				clock.tick(1);
			})
			.then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{
						args: [replace("/path/to/redirect")],
					},
				]),
			));
});
