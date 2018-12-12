import React from "react";
import { Provider } from "react-redux";
import Immutable from "immutable";
import withRequestActivity from "./withRequestActivity";

const TestComp = () => <div />;

describe("withRequestActivity", () => {
	let state, store;
	beforeEach(() => {
		state = Immutable.fromJS({
			requests: {
				ONGOING: true,
			},
		});
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
	});

	it("sets an active flag if the named request is in progress", () =>
		expect(
			withRequestActivity,
			"when called with",
			["ONGOING"],
			"when called with",
			[TestComp],
		).then(EnhComp =>
			expect(
				<Provider store={store}>
					<EnhComp />
				</Provider>,
				"to deeply render as",
				<TestComp active />,
			),
		));

	it("does not set active flag if the named request is not in progress", () =>
		expect(
			withRequestActivity,
			"when called with",
			["INACTIVE"],
			"when called with",
			[TestComp],
		).then(EnhComp =>
			expect(
				<Provider store={store}>
					<EnhComp />
				</Provider>,
				"to deeply render as",
				<TestComp active={false} />,
			),
		));
});
