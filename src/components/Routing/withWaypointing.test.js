import React from "react";
import ReactDOM from "react-dom";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { MemoryRouter, Route } from "react-router-dom";
import sinon from "sinon";
import { PropStruct } from "../../utils/testUtils";
import { setRoute, mapHref } from "../../actions/navigation";
import withWaypointing from "./withWaypointing";

describe("withWaypointing", () => {
	let state, store, updateState;
	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				route: {
					location: { pathname: "/feep/meep", search: "", hash: "" },
					match: {
						path: "/feep/:some",
						url: "/feep/meep",
						params: { some: "meep" },
						isExact: true,
					},
				},
			},
		});
		updateState = () => {};
		store = {
			subscribe: sub => {
				updateState = sub;
			},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		};
	});

	it("wraps a component to tell its route info to Redux on mount", () =>
		expect(withWaypointing, "called with", [PropStruct])
			.then(EnhancedView =>
				expect(
					<Provider store={store}>
						<MemoryRouter initialEntries={["/foo/bar"]}>
							<Route path="/foo/bar" component={EnhancedView} />
						</MemoryRouter>
					</Provider>,
					"when mounted",
					"to satisfy",
					<PropStruct
						history="__ignore"
						location="__ignore"
						match="__ignore"
						routeIsAligned="__ignore"
						setRoute="__ignore"
					/>,
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
		expect(withWaypointing, "called with", [PropStruct])
			.then(EnhancedView =>
				expect(
					<Provider store={store}>
						<MemoryRouter initialEntries={["/feep/meep"]}>
							<Route path="/feep/:some" component={EnhancedView} />
						</MemoryRouter>
					</Provider>,
					"when mounted",
					"to satisfy",
					<PropStruct
						history="__ignore"
						location="__ignore"
						match="__ignore"
						routeIsAligned="__ignore"
						setRoute="__ignore"
					/>,
				),
			)
			.then(() => expect(store.dispatch, "to have calls satisfying", [])));

	it("does fire action if path parameters different", () =>
		expect(withWaypointing, "called with", [PropStruct])
			.then(EnhancedView =>
				expect(
					<Provider store={store}>
						<MemoryRouter initialEntries={["/feep/moof"]}>
							<Route path="/feep/:some" component={EnhancedView} />
						</MemoryRouter>
					</Provider>,
					"when mounted",
					"to satisfy",
					<PropStruct
						history="__ignore"
						location="__ignore"
						match="__ignore"
						routeIsAligned="__ignore"
						setRoute="__ignore"
					/>,
				),
			)
			.then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{
						args: [
							setRoute(
								{ pathname: "/feep/moof", search: "", hash: "" },
								{
									path: "/feep/:some",
									url: "/feep/moof",
									params: { some: "moof" },
									isExact: true,
								},
							),
						],
					},
				]),
			));

	it("does not fire action if route match is not exact", () =>
		expect(withWaypointing, "called with", [PropStruct])
			.then(EnhancedView =>
				expect(
					<Provider store={store}>
						<MemoryRouter initialEntries={["/feep/meep/mef"]}>
							<Route path="/feep/meep" component={EnhancedView} />
						</MemoryRouter>
					</Provider>,
					"when mounted",
					"to satisfy",
					<PropStruct
						history="__ignore"
						location="__ignore"
						match="__ignore"
						routeIsAligned="__ignore"
						setRoute="__ignore"
					/>,
				),
			)
			.then(() => expect(store.dispatch, "to have calls satisfying", [])));

	it("maps the href to a root if so directed", () =>
		expect(withWaypointing, "called with", [PropStruct])
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
					"when mounted",
					"to satisfy",
					<PropStruct
						history="__ignore"
						location="__ignore"
						match="__ignore"
						routeIsAligned="__ignore"
						setRoute="__ignore"
						mapFrom="/foo"
					/>,
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

	it("fires action on updates where route becomes misaligned", () => {
		const node = document.createElement("div");
		return expect(withWaypointing, "called with", [PropStruct]).then(
			EnhancedView => {
				ReactDOM.render(
					<Provider store={store}>
						<MemoryRouter initialEntries={["/feep/meep"]}>
							<Route path="/feep/:some" component={EnhancedView} />
						</MemoryRouter>
					</Provider>,
					node,
				);
				expect(store.dispatch, "was not called");
				state = state
					.setIn(["navigation", "route", "location", "pathname"], "/feep/murl")
					.setIn(["navigation", "route", "match", "url"], "/feep/murl");
				updateState();
				expect(store.dispatch, "to have calls satisfying", [
					{
						args: [
							{
								type: "SET_ROUTE",
								payload: {
									location: {
										pathname: "/feep/meep",
									},
									match: {
										path: "/feep/:some",
										url: "/feep/meep",
										isExact: true,
										params: { some: "meep" },
									},
								},
							},
						],
					},
				]);
			},
		);
	});
});
