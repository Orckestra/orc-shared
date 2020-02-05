import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Immutable from "immutable";
import sinon from "sinon";
import { PropStruct } from "../../utils/testUtils";
import { shiftToast } from "../../actions/toasts";
import ConnectedToastList, { TOAST_TIMEOUT } from "./ConnectedToastList";

jest.mock("../ToastList", () => ({
	__esModule: true,
	default: require("../../utils/testUtils").PropStruct,
}));

const timeout = TOAST_TIMEOUT * 1000;

describe("ConnectedToastList", () => {
	let state, store, clock, storesub;
	beforeEach(() => {
		state = Immutable.fromJS({
			toasts: {
				queue: [
					{ type: "confirm", message: "A toast" },
					{ type: "warn", message: "A warning" },
				],
			},
		});
		store = {
			subscribe: cb => {
				// Mock subscription
				storesub = cb;
				return () => {
					storesub = undefined;
				};
			},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		};
		clock = sinon.useFakeTimers();
	});
	afterEach(() => {
		clock.restore();
	});

	it("provides toasts to a ToastList", () =>
		expect(
			<Provider store={store}>
				<ConnectedToastList />
			</Provider>,
			"when mounted",
			"to satisfy",
			<PropStruct
				toasts={[
					{ type: "confirm", message: "A toast" },
					{ type: "warn", message: "A warning" },
				]}
			/>,
		));

	it("dismisses toasts one at a time with an interval", () =>
		expect(
			<Provider store={store}>
				<ConnectedToastList />
			</Provider>,
			"when mounted",
			"to be a",
			"DOMElement",
		)
			.then(() => expect(store.dispatch, "was not called"))
			.then(() => clock.tick(timeout))
			.then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{ args: [shiftToast()] },
				]),
			)
			.then(() => clock.tick(timeout))
			.then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{ args: [shiftToast()] },
					{ args: [shiftToast()] },
				]),
			));

	it("does not remove toasts if there are none", () => {
		state = state.setIn(["toasts", "queue"], Immutable.List());
		return expect(
			<Provider store={store}>
				<ConnectedToastList />
			</Provider>,
			"when mounted",
			"to be a",
			"DOMElement",
		)
			.then(() => expect(store.dispatch, "was not called"))
			.then(() => clock.tick(timeout))
			.then(() => expect(store.dispatch, "was not called"));
	});

	it("handles switching the dismissal on and off as necessary", () => {
		const appRoot = document.createElement("div");
		appRoot.id = "app";
		document.body.appendChild(appRoot);

		state = state.setIn(["toasts", "queue"], Immutable.List());

		ReactDOM.render(
			<Provider store={store}>
				<ConnectedToastList />
			</Provider>,
			appRoot,
		);
		expect(
			appRoot,
			"to satisfy",
			<div>
				<PropStruct toasts={[]} />
			</div>,
		);
		expect(store.dispatch, "was not called");
		clock.tick(timeout);
		expect(store.dispatch, "was not called");

		state = state.setIn(
			["toasts", "queue"],
			Immutable.fromJS([
				{ type: "confirm", message: "A toast" },
				{ type: "warn", message: "A warning" },
			]),
		);
		storesub();

		ReactDOM.render(
			<Provider store={store}>
				<ConnectedToastList />
			</Provider>,
			appRoot,
		);
		expect(
			appRoot,
			"to satisfy",
			<div>
				<PropStruct
					toasts={[
						{ type: "confirm", message: "A toast" },
						{ type: "warn", message: "A warning" },
					]}
				/>
			</div>,
		);
		expect(store.dispatch, "was not called");
		clock.tick(timeout);
		expect(store.dispatch, "was called once");
		clock.tick(timeout);
		expect(store.dispatch, "was called twice");

		state = state.setIn(["toasts", "queue"], Immutable.List());
		storesub();

		ReactDOM.render(
			<Provider store={store}>
				<ConnectedToastList />
			</Provider>,
			appRoot,
		);
		expect(
			appRoot,
			"to satisfy",
			<div>
				<PropStruct toasts={[]} />
			</div>,
		);
		expect(store.dispatch, "was called twice");
		clock.tick(timeout);
		expect(store.dispatch, "was called twice");

		try {
			ReactDOM.unmountComponentAtNode(appRoot);
			ReactDOM.unmountComponentAtNode(document.getElementById("toast"));
		} catch (_) {}
		document.body.removeChild(appRoot);
	});
});
