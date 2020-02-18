import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";
import { mount, act } from "react-dom-testing";
import sinon from "sinon";
import { PropStruct } from "../../utils/testUtils";
import { setRoute, mapHref } from "../../actions/navigation";
import withWaypointing from "./withWaypointing";

describe("withWaypointing", () => {
	let history, state, store, updateState;
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
		const subs = [];
		updateState = () => {
			subs.forEach(sub => {
				sub();
			});
		};
		store = {
			subscribe: sub => {
				subs.push(sub);
				return () => {};
			},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		};
		history = createMemoryHistory({ initialEntries: ["/feep/meep"] });
	});

	it("wraps a component to tell its route info to Redux on mount", () =>
		expect(withWaypointing, "called with", [PropStruct])
			.then(EnhancedView => {
				history.replace("/foo/bar");
				return expect(
					<Provider store={store}>
						<Router history={history}>
							<Route path="/foo/bar" component={EnhancedView} />
						</Router>
					</Provider>,
					"when mounted",
					"to satisfy",
					<PropStruct
						history="__ignore"
						location="__ignore"
						match="__ignore"
					/>,
				);
			})
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
			.then(EnhancedView => {
				return expect(
					<Provider store={store}>
						<Router history={history}>
							<Route path="/feep/:some" component={EnhancedView} />
						</Router>
					</Provider>,
					"when mounted",
					"to satisfy",
					<PropStruct
						history="__ignore"
						location="__ignore"
						match="__ignore"
					/>,
				);
			})
			.then(() => expect(store.dispatch, "to have calls satisfying", [])));

	it("does fire action if path parameters different", () =>
		expect(withWaypointing, "called with", [PropStruct])
			.then(EnhancedView => {
				history.replace("/feep/moof");
				return expect(
					<Provider store={store}>
						<Router history={history}>
							<Route path="/feep/:some" component={EnhancedView} />
						</Router>
					</Provider>,
					"when mounted",
					"to satisfy",
					<PropStruct
						history="__ignore"
						location="__ignore"
						match="__ignore"
					/>,
				);
			})
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
			.then(EnhancedView => {
				history.replace("/feep/meep/mef");
				return expect(
					<Provider store={store}>
						<Router history={history}>
							<Route path="/feep/meep" component={EnhancedView} />
						</Router>
					</Provider>,
					"when mounted",
					"to satisfy",
					<PropStruct
						history="__ignore"
						location="__ignore"
						match="__ignore"
					/>,
				);
			})
			.then(() => expect(store.dispatch, "to have calls satisfying", [])));

	it("maps the href to a root if so directed", () =>
		expect(withWaypointing, "called with", [PropStruct])
			.then(EnhancedView => {
				history.replace("/foo/bar");
				return expect(
					<Provider store={store}>
						<Router history={history}>
							<Route
								path="/foo/bar"
								render={props => <EnhancedView {...props} mapFrom="/foo" />}
							/>
						</Router>
					</Provider>,
					"when mounted",
					"to satisfy",
					<PropStruct
						history="__ignore"
						location="__ignore"
						match="__ignore"
						mapFrom="/foo"
					/>,
				);
			})
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
		return expect(withWaypointing, "called with", [PropStruct]).then(
			EnhancedView => {
				mount(
					<Provider store={store}>
						<Router history={history}>
							<Route path="/feep/:some" component={EnhancedView} />
						</Router>
					</Provider>,
				);
				expect(store.dispatch, "was not called");
				state = state
					.setIn(["navigation", "route", "location", "pathname"], "/feep/murl")
					.setIn(["navigation", "route", "match", "url"], "/feep/murl");
				act(() => updateState());
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

	it("fires action when location has changed", () => {
		const node = document.createElement("div");
		return expect(withWaypointing, "called with", [PropStruct]).then(
			EnhancedView => {
				mount(
					<Provider store={store}>
						<Router history={history}>
							<Route path="/feep/:some" component={EnhancedView} />
						</Router>
					</Provider>,
					node,
				);
				expect(store.dispatch, "was not called");
				act(() => history.push("/feep/murl"));
				expect(store.dispatch, "to have calls satisfying", [
					{
						args: [
							{
								type: "SET_ROUTE",
								payload: {
									location: {
										pathname: "/feep/murl",
									},
									match: {
										path: "/feep/:some",
										url: "/feep/murl",
										isExact: true,
										params: { some: "murl" },
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
