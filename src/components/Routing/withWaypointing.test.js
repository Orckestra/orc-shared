import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { MemoryRouter, Route } from "react-router-dom";
import sinon from "sinon";
import { setRoute, mapHref } from "../../actions/navigation";
import withWaypointing from "./withWaypointing";

const Test = () => <div />;

describe("withWaypointing", () => {
	let state, store;
	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				route: {
					location: { pathname: "/feep/meep", search: "", hash: "" },
					match: {
						path: "/feep/meep",
						url: "/feep/meep",
						params: {},
						isExact: true,
					},
				},
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
						<MemoryRouter initialEntries={["/foo/bar"]}>
							<Route path="/foo/bar" component={EnhancedView} />
						</MemoryRouter>
					</Provider>,
					"to deeply render as",
					<Test />,
				),
			)
			.then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{
						args: [
							setRoute(
								{ pathname: "/foo/bar", search: "", hash: "" },
								{
									path: "/foo/bar",
									url: "/foo/bar",
									params: {},
									isExact: true,
								},
							),
						],
					},
				]),
			));

	it("does not fire action if pathname is already the same", () =>
		expect(withWaypointing, "called with", [Test])
			.then(EnhancedView =>
				expect(
					<Provider store={store}>
						<MemoryRouter initialEntries={["/feep/meep"]}>
							<Route path="/feep/meep" component={EnhancedView} />
						</MemoryRouter>
					</Provider>,
					"when deeply rendered",
					"to have rendered",
					<Test />,
				),
			)
			.then(() => expect(store.dispatch, "to have calls satisfying", [])));

	it("does not fire action if route match is not exact", () =>
		expect(withWaypointing, "called with", [Test])
			.then(EnhancedView =>
				expect(
					<Provider store={store}>
						<MemoryRouter initialEntries={["/feep/meep/mef"]}>
							<Route path="/feep/meep" component={EnhancedView} />
						</MemoryRouter>
					</Provider>,
					"when deeply rendered",
					"to have rendered",
					<Test />,
				),
			)
			.then(() => expect(store.dispatch, "to have calls satisfying", [])));

	it("maps the href to a root if so directed", () =>
		expect(withWaypointing, "called with", [Test])
			.then(EnhancedView =>
				expect(
					<Provider store={store}>
						<MemoryRouter initialEntries={["/foo/bar"]}>
							<Route
								path="/foo/bar"
								render={props => <EnhancedView {...props} mapFrom="/foo" />}
							/>
						</MemoryRouter>
					</Provider>,
					"to deeply render as",
					<Test />,
				),
			)
			.then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{
						args: [mapHref("/foo", "/foo/bar")],
					},
					{
						args: [
							setRoute(
								{ pathname: "/foo", search: "", hash: "" },
								{
									path: "/foo/bar",
									url: "/foo/bar",
									params: {},
									isExact: true,
								},
							),
						],
					},
				]),
			));
});
