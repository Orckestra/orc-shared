import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import sinon from "sinon";
import withWaypointing from "./withWaypointing";

const Test = () => <div />;

describe("withWaypointing", () => {
	let state, store;
	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				route: {
					location: { pathname: "/feep/meep" },
					match: { url: "/feep/meep" },
				},
			},
		});
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		};
		jsdom.reconfigure({ url: "http://localhost/foo/bar" });
	});

	it("wraps a component to tell its route info to Redux on mount", () =>
		expect(withWaypointing, "called with", [Test])
			.then(EnhancedView =>
				expect(
					<Provider store={store}>
						<BrowserRouter>
							<EnhancedView />
						</BrowserRouter>
					</Provider>,
					"to deeply render as",
					<Test />,
				),
			)
			.then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{
						args: [
							{
								type: "SET_ROUTE",
								payload: {
									location: { pathname: "/foo/bar", search: "", hash: "" },
									match: { path: "/", url: "/", params: {}, isExact: false },
								},
							},
						],
					},
				]),
			));

	it("does not fire action if pathname is already the same", () => {
		jsdom.reconfigure({ url: "http://localhost/feep/meep" });
		return expect(withWaypointing, "called with", [Test])
			.then(EnhancedView =>
				expect(
					<Provider store={store}>
						<BrowserRouter>
							<EnhancedView />
						</BrowserRouter>
					</Provider>,
					"when deeply rendered",
					"to have rendered",
					<Test />,
				),
			)
			.then(() => expect(store.dispatch, "to have calls satisfying", []));
	});
});
