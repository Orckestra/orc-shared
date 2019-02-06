import React from "react";
import Immutable from "immutable";
import sinon from "sinon";
import withWaypointing from "./withWaypointing";
import { Provider } from "react-redux";

const Test = () => <div />;

describe("withWaypointing", () => {
	let state, store;
	beforeEach(() => {
		state = Immutable.fromJS({
			router: { location: { pathname: "/feep/meep" } },
			navigation: {
				route: { location: { pathname: "/feep/meep" }, match: {} },
			},
		});
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		};
	});

	it("wraps a component to tell its route info to Redux on mount", () =>
		expect(withWaypointing, "called with", [Test])
			.then(EnhancedView =>
				expect(
					<Provider store={store}>
						<EnhancedView location={{ pathname: "/foo/bar" }} match={{}} />
					</Provider>,
					"when deeply rendered",
					"to have rendered",
					<Test />,
				),
			)
			.then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{
						args: [
							{
								type: "SET_ROUTE",
								payload: { location: { pathname: "/foo/bar" }, match: {} },
							},
						],
					},
				]),
			));

	it("does not fire action if pathname is already the same", () =>
		expect(withWaypointing, "called with", [Test])
			.then(EnhancedView =>
				expect(
					<Provider store={store}>
						<EnhancedView location={{ pathname: "/feep/meep" }} match={{}} />
					</Provider>,
					"when deeply rendered",
					"to have rendered",
					<Test />,
				),
			)
			.then(() => expect(store.dispatch, "to have calls satisfying", [])));
});
