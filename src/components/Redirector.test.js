import React from "react";
import sinon from "sinon";
import { replace } from "redux-little-router";
import Redirector from "./Redirector";

describe("Redirector", () => {
	let store;
	beforeEach(() => {
		store = {
			subscribe: () => {},
			getState: () => ({}),
			dispatch: sinon.spy().named("dispatch"),
		};
	});

	it("dispatches a replace action immediately upon mount", () =>
		expect(
			<Redirector store={store} href="/path/to/redirect" />,
			"when deeply rendered",
		).then(() =>
			expect(store.dispatch, "to have calls satisfying", [
				{
					args: [replace("/path/to/redirect")],
				},
			]),
		));
});
