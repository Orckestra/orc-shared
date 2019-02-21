import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import sinon from "sinon";
import withViewState from "./withViewState";
import { setStateField } from "../actions/view";

const TestComp = () => <input />;

describe("withViewState", () => {
	let store, state;
	beforeEach(() => {
		state = Immutable.fromJS({
			view: {
				foo: "not right",
				test: { viewState: "good value" },
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

	it("adds a value prop to an element based on its name prop", () =>
		expect(withViewState, "when called with", [TestComp]).then(Comp =>
			expect(
				<Provider store={store}>
					<MemoryRouter>
						<Comp name="test" />
					</MemoryRouter>
				</Provider>,
				"to deeply render as",
				<TestComp viewState={{ viewState: "good value" }} />,
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
				"to deeply render as",
				<TestComp name="noState" viewState={{}} />,
			),
		));

	it("adds function that updates the state", () =>
		expect(withViewState, "when called with", [TestComp]).then(Comp =>
			expect(
				<Provider store={store}>
					<MemoryRouter>
						<Comp name="test" />
					</MemoryRouter>
				</Provider>,
				"when deeply rendered",
				"queried for",
				<TestComp
					updateViewState={expect.it("when called with", [
						"aField",
						"new value",
					])}
				/>,
			).then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{ args: [setStateField("test", "aField", "new value")] },
				]),
			),
		));
});
