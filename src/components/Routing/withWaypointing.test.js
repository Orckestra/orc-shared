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
		jsdom.reconfigure({ url: "http://localhost/foo/bar" });
	});

	it("wraps a component to tell its route info to Redux on mount", () =>
		expect(withWaypointing, "called with", [Test])
			.then(EnhancedView =>
				expect(
					<Provider store={store}>
						<BrowserRouter>
							<EnhancedView location={{ pathname: "/foo/bar" }} match={{}} />
						</BrowserRouter>
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

	it("does not fire action if pathname is already the same", () => {
		jsdom.reconfigure({ url: "http://localhost/feep/meep" });
		return expect(withWaypointing, "called with", [Test])
			.then(EnhancedView =>
				expect(
					<Provider store={store}>
						<BrowserRouter>
							<EnhancedView location={{ pathname: "/feep/meep" }} match={{}} />
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
