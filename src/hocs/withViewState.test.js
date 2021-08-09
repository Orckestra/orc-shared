import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import sinon from "sinon";
import { spyOnConsole } from "../utils/testUtils";
import withViewState from "./withViewState";
import { setStateField } from "../actions/view";

const TestComp = ({ field, updateViewState, viewState }) => (
	<input onChange={() => updateViewState(field, "new value")} value={viewState[field]} />
);

describe("withViewState", () => {
	let store, state;
	beforeEach(() => {
		state = Immutable.fromJS({
			view: {
				foo: "not right",
				test: { viewState: "good value", aField: "old value" },
				nameTest: { name: "Alfred" },
				bar: false,
			},
		});
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		};
	});

	spyOnConsole(["warn"]);

	it("gives deprecation warning", () =>
		expect(withViewState, "called with", [TestComp])
			.then(Comp =>
				expect(
					<Provider store={store}>
						<MemoryRouter>
							<Comp name="test" />
						</MemoryRouter>
					</Provider>,
					"when mounted",
					"to satisfy",
					<input />,
				),
			)
			.then(() =>
				expect(console.warn, "to have a call satisfying", {
					args: [expect.it("to contain", "withViewState has been deprecated")],
				}),
			));

	it("adds a value prop to an element based on its name prop", () =>
		expect(withViewState, "when called with", [TestComp]).then(Comp =>
			expect(
				<Provider store={store}>
					<MemoryRouter>
						<Comp name="test" />
					</MemoryRouter>
				</Provider>,
				"when mounted",
				"to satisfy",
				<TestComp field="empty" viewState={{ viewState: "good value" }} />,
			),
		));

	it("handles nonexistent state", () =>
		expect(withViewState, "when called with", [TestComp]).then(Comp =>
			expect(
				<Provider store={store}>
					<MemoryRouter>
						<Comp name="noState" />
					</MemoryRouter>
				</Provider>,
				"when mounted",
				"to satisfy",
				<TestComp name="noState" viewState={{}} />,
			),
		));

	it("adds function that updates the state", () =>
		expect(withViewState, "when called with", [TestComp]).then(Comp =>
			expect(
				<Provider store={store}>
					<MemoryRouter>
						<Comp name="test" field="aField" />
					</MemoryRouter>
				</Provider>,
				"when mounted",
				"with event",
				"change",
			).then(() =>
				expect(store.dispatch, "to have calls satisfying", [{ args: [setStateField("test", "aField", "new value")] }]),
			),
		));
});
