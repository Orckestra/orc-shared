import React from "react";
import Immutable from "immutable";
import sinon from "sinon";
import withViewState from "./withViewState";
import { setStateField } from "../actions/view";

const TestComp = props => <input {...props} />;

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
				<Comp name="test" store={store} />,
				"to render as",
				<TestComp viewState={{ viewState: "good value" }} />,
			),
		));

	it("handles nonexistent state", () =>
		expect(withViewState, "when called with", [TestComp]).then(Comp =>
			expect(
				<Comp name="noState" store={store} />,
				"to render as",
				<TestComp name="noState" viewState={{}} />,
			),
		));

	it("adds function that updates the state", () =>
		expect(withViewState, "when called with", [TestComp]).then(Comp =>
			expect(
				<Comp name="test" store={store} />,
				"to render as",
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
