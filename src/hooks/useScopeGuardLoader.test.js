import React, { useState } from "react";
import { mount, act } from "unexpected-reaction";
import { Provider, useSelector } from "react-redux";
import Immutable from "immutable";
import sinon from "sinon";
import { spyOnConsole } from "../utils/testUtils";
import useScopeGuardLoader from "./useScopeGuardLoader";

const TestComp = ({ loader, cutout }) => {
	useScopeGuardLoader(loader, cutout);
	const [tick, setTick] = useState(0);
	const live = useSelector(state => state.get("live"));
	return (
		<div id="test" onClick={() => setTick(tick + 1)} data-live={live}>
			{tick}
		</div>
	);
};

describe("useScopeGuardLoader", () => {
	spyOnConsole(["warn"]);

	let loader, state, store, appNode;
	beforeEach(() => {
		state = Immutable.fromJS({
			cutout: "yes",
			live: 0,
			requests: {
				logout: false,
			},
			scopeRouteState: {
				scopeChangeInProgress: false,
			},
		});
		const subs = [];
		store = {
			updateState: () => {
				subs.forEach((sub, i) => {
					sub();
				});
			},
			subscribe: sub => {
				subs.push(sub);
				return () => {};
			},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		};
		loader = { type: "TEST_ACTION" };
		appNode = document.createElement("div");
		document.body.appendChild(appNode);
	});
	afterEach(() => {
		document.body.removeChild(appNode);
	});

	it("dispatches the loader action on mount if cutout returns falsy", () =>
		expect(
			<Provider store={store}>
				<TestComp loader={loader} cutout={state => state.get("live")} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>0</div>,
		).then(() => expect(store.dispatch, "to have calls satisfying", [{ args: [loader] }])));

	it("does not dispatch the loader action on mount because scope change is in progress", () => {
		state = state.setIn(["scopeRouteState", "scopeChangeInProgress"], true);

		return expect(
			<Provider store={store}>
				<TestComp loader={loader} cutout={state => state.get("live")} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>0</div>,
		).then(() => expect(store.dispatch, "not to have calls satisfying", [{ args: [loader] }]));
	});

	it("does not dispatch loader if cutout returns truthy", () =>
		expect(
			<Provider store={store}>
				<TestComp loader={loader} cutout={state => state.get("cutout")} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>0</div>,
		).then(() => expect(store.dispatch, "was not called")));

	it("does not dispatch loader if logged out", () => {
		state = state.setIn(["requests", "logout"], true);

		expect(
			<Provider store={store}>
				<TestComp loader={loader} cutout={state => state.get("cutout")} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>0</div>,
		).then(() => expect(store.dispatch, "was not called"));
	});

	it("does not dispatch loader if no cutout selector given, warns", () =>
		expect(
			<Provider store={store}>
				<TestComp loader={loader} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>0</div>,
		)
			.then(() => expect(store.dispatch, "was not called"))
			.then(() =>
				expect(console.warn, "not to have calls satisfying", [
					{
						args: ["useLoader hook called without cutout selector, loader will never be dispatched."],
					},
				]),
			));

	it("dispatches multiple loader actions", () => {
		const loaderSeries = [{ type: "TEST_ACTION1" }, { type: "TEST_ACTION2" }, { type: "TEST_ACTION3" }];
		return expect(
			<Provider store={store}>
				<TestComp loader={loaderSeries} cutout={state => state.get("live")} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>0</div>,
		).then(() =>
			expect(store.dispatch, "to have calls satisfying", [
				{ args: [loaderSeries[0]] },
				{ args: [loaderSeries[1]] },
				{ args: [loaderSeries[2]] },
			]),
		);
	});

	it("only dispatches once if cutout does not change", () =>
		expect(
			<Provider store={store}>
				<TestComp loader={loader} cutout={state => state.get("live")} />
			</Provider>,
			"when mounted",
			"with event",
			"click",
			"with event",
			"click",
			"with event",
			"click",
			"with event",
			"click",
			"to satisfy",
			<div>4</div>,
		).then(() => expect(store.dispatch, "to have calls satisfying", [{ args: [loader] }])));

	it("fires loader if cutout is falsy, but not again if it becomes truthy", () => {
		const selector = state => state.get("live");
		mount(
			<Provider store={store}>
				<TestComp loader={loader} cutout={selector} />
			</Provider>,
		);
		expect(store.dispatch, "to have calls satisfying", [{}]);
		act(() => {
			state = state.set("live", 1);
			store.updateState();
		});
		expect(store.dispatch, "was called once");
	});

	it("fires loader if cutout was truthy, becomes falsy", () => {
		const selector = state => state.get("live");
		state = state.set("live", 1);
		mount(
			<Provider store={store}>
				<TestComp loader={loader} cutout={selector} />
			</Provider>,
		);
		expect(store.dispatch, "was not called");
		act(() => {
			state = state.set("live", 0);
			store.updateState();
		});
		expect(store.dispatch, "was called");
	});
});
