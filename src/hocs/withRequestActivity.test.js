import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import withRequestActivity from "./withRequestActivity";

const TestComp = props => (
	<div>
		{"{\n  " +
			Object.entries(props)
				.map(
					([prop, value]) =>
						prop +
						": " +
						(typeof value === "function" ? "function" : typeof value === "string" ? '"' + value + '"' : value),
				)
				.join(",\n  ") +
			"\n}"}
	</div>
);

describe("withRequestActivity", () => {
	let state, store;
	beforeEach(() => {
		state = Immutable.fromJS({
			requests: {
				actives: {
					ONGOING: true,
				},
			},
		});
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
	});

	it("sets an active flag if the named request is in progress", () =>
		expect(withRequestActivity, "when called with", ["ONGOING"], "when called with", [TestComp]).then(EnhComp =>
			expect(
				<Provider store={store}>
					<MemoryRouter>
						<EnhComp />
					</MemoryRouter>
				</Provider>,
				"when mounted",
				"to have text",
				expect.it("to contain", "active: true"),
			),
		));

	it("does not set active flag if the named request is not in progress", () =>
		expect(withRequestActivity, "when called with", ["INACTIVE"], "when called with", [TestComp]).then(EnhComp =>
			expect(
				<Provider store={store}>
					<MemoryRouter>
						<EnhComp />
					</MemoryRouter>
				</Provider>,
				"when mounted",
				"to have text",
				expect.it("to contain", "active: false"),
			),
		));
});
