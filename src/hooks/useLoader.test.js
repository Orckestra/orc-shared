import React, { useState } from "react";
import { Provider } from "react-redux";
import Immutable from "immutable";
import sinon from "sinon";
import { spyOnConsole } from "../utils/testUtils";
import useLoader from "./useLoader";

const TestComp = ({ loader, cutout }) => {
	useLoader(loader, cutout);
	const [tick, setTick] = useState(0);
	return <div onClick={() => setTick(tick + 1)}>{tick}</div>;
};

describe("useLoader", () => {
	spyOnConsole(["warn"]);

	let loader, state, store;
	beforeEach(() => {
		state = Immutable.fromJS({ cutout: "yes", live: 0 });
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		};
		loader = { type: "TEST_ACTION" };
	});

	it("dispatches the loader action on mount if cutout returns falsy", () =>
		expect(
			<Provider store={store}>
				<TestComp loader={loader} cutout={state => state.get("live")} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>0</div>,
		).then(() =>
			expect(store.dispatch, "to have calls satisfying", [{ args: [loader] }]),
		));

	it("does not dispatch loader if cutout returns truthy", () =>
		expect(
			<Provider store={store}>
				<TestComp loader={loader} cutout={state => state.get("cutout")} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>0</div>,
		).then(() => expect(store.dispatch, "was not called")));

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
				expect(console.warn, "to have calls satisfying", [
					{
						args: [
							"useLoader hook called without cutout selector, loader will never be dispatched.",
						],
					},
				]),
			));

	it("dispatches multiple loader actions", () => {
		const loaderSeries = [
			{ type: "TEST_ACTION1" },
			{ type: "TEST_ACTION2" },
			{ type: "TEST_ACTION3" },
		];
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

	it("Only dispatches once if cutout does not change", () =>
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
		).then(() =>
			expect(store.dispatch, "to have calls satisfying", [{ args: [loader] }]),
		));
});
