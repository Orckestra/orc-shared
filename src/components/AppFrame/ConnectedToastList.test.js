import React from "react";
import ReactDOM from "react-dom";
import { compose } from "recompose";
import { Provider } from "react-redux";
import Immutable from "immutable";
import sinon from "sinon";
import { PropStruct } from "../../utils/testUtils";
import { shiftToast } from "../../actions/toasts";
import ConnectedToastList, {
	TOAST_TIMEOUT,
	withToastData,
	withTimedDismissal,
} from "./ConnectedToastList";

const timeout = TOAST_TIMEOUT * 1000;
const TestComp = props => (
	<div>
		<PropStruct {...props} />
	</div>
);

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
		expect(withToastData, "called with", [TestComp]).then(EnhComp =>
			expect(
				<Provider store={store}>
					<EnhComp />
				</Provider>,
				"when mounted",
				"to satisfy",
				<TestComp
					toasts={[
						{ type: "confirm", message: "A toast" },
						{ type: "warn", message: "A warning" },
					]}
					clearFirstToast={() => {}}
				/>,
			),
		));

	it("dismisses toasts one at a time with an interval", () => {
		const EnhComp = compose(withToastData, withTimedDismissal)(TestComp);
		return expect(
			<Provider store={store}>
				<EnhComp />
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
			);
	});

	it("does not remove toasts if there are none", () => {
		const EnhComp = compose(withToastData, withTimedDismissal)(TestComp);
		state = state.setIn(["toasts", "queue"], Immutable.List());
		return expect(
			<Provider store={store}>
				<EnhComp />
			</Provider>,
			"when mounted",
			"to be a",
			"DOMElement",
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

		ReactDOM.render(<EnhComp clearFirstToast={clear} toasts={[]} />, appRoot);
		expect(
			appRoot,
			"to contain",
			<TestComp clearFirstToast={clear} toasts={[]} />,
		);
		expect(clear, "was not called");
		clock.tick(timeout);
		expect(clear, "was not called");

		ReactDOM.render(
			<EnhComp
				clearFirstToast={clear}
				toasts={[
					{ type: "confirm", message: "A toast" },
					{ type: "warn", message: "A warning" },
				]}
			/>,
			appRoot,
		);
		expect(
			appRoot,
			"to contain",
			<TestComp
				clearFirstToast={clear}
				toasts={[
					{ type: "confirm", message: "A toast" },
					{ type: "warn", message: "A warning" },
				]}
			/>,
		);
		expect(clear, "was not called");
		clock.tick(timeout);
		expect(clear, "was called once");
		clock.tick(timeout);
		expect(clear, "was called twice");

		ReactDOM.render(<EnhComp clearFirstToast={clear} toasts={[]} />, appRoot);
		expect(
			appRoot,
			"to contain",
			<TestComp clearFirstToast={clear} toasts={[]} />,
		);
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
