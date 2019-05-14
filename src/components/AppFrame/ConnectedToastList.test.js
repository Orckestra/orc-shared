import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Immutable from "immutable";
import sinon from "sinon";
import ToastList from "../ToastList";
import { shiftToast } from "../../actions/toasts";
import ConnectedToastList, {
	TOAST_TIMEOUT,
	withTimedDismissal,
} from "./ConnectedToastList";

const timeout = TOAST_TIMEOUT * 1000;
const TestComp = () => <div />;

describe("ConnectedToastList", () => {
	let state, store, clock;
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
			subscribe: () => {},
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
			"to deeply render as",
			<ToastList
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
			"when deeply rendered",
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
			"when deeply rendered",
		)
			.then(() => expect(store.dispatch, "was not called"))
			.then(() => clock.tick(timeout))
			.then(() => expect(store.dispatch, "was not called"));
	});

	it("handles switching the dismissal on and of as necessary", () => {
		const EnhComp = withTimedDismissal(TestComp);

		const clear = sinon.spy().named("clearToast");

		const appRoot = document.createElement("div");
		appRoot.id = "app";
		document.body.appendChild(appRoot);

		let render = ReactDOM.render(
			<EnhComp clearFirstToast={clear} toasts={[]} />,
			appRoot,
		);
		expect(render, "to contain", <TestComp />);
		expect(clear, "was not called");
		clock.tick(timeout);
		expect(clear, "was not called");

		render = ReactDOM.render(
			<EnhComp
				clearFirstToast={clear}
				toasts={[
					{ type: "confirm", message: "A toast" },
					{ type: "warn", message: "A warning" },
				]}
			/>,
			appRoot,
		);
		expect(render, "to contain", <TestComp />);
		expect(clear, "was not called");
		clock.tick(timeout);
		expect(clear, "was called once");
		clock.tick(timeout);
		expect(clear, "was called twice");

		render = ReactDOM.render(
			<EnhComp clearFirstToast={clear} toasts={[]} />,
			appRoot,
		);
		expect(render, "to contain", <TestComp />);
		expect(clear, "was called twice");
		clock.tick(timeout);
		expect(clear, "was called twice");

		try {
			ReactDOM.unmountComponentAtNode(appRoot);
			ReactDOM.unmountComponentAtNode(document.getElementById("toast"));
		} catch (_) {}
		document.body.removeChild(appRoot);
	});
});
