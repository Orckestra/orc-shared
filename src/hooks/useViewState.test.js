import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import sinon from "sinon";
import useViewState from "./useViewState";
import { setStateField } from "../actions/view";

const TestComp = ({ name }) => {
	const [viewState, updateViewState] = useViewState(name);
	return (
		<div>
			{Object.entries(viewState).map(([field, value]) => (
				<input
					key={field}
					id={field}
					onChange={e => updateViewState(field, e.target.value)}
					value={viewState[field]}
				/>
			))}
		</div>
	);
};

describe("useViewState", () => {
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

	it("adds a value prop to an element based on its name prop", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<TestComp name="test" />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>
				<input id="viewState" value="good value" onChange={() => {}} />
				<input id="aField" value="old value" onChange={() => {}} />
			</div>,
		));

	it("handles nonexistent state", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<TestComp name="noState" />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div></div>,
		));

	it("adds function that updates the state", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<TestComp name="nameTest" />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "change", value: "Benjamin", target: "#name" },
		).then(() =>
			expect(store.dispatch, "to have calls satisfying", [
				{ args: [setStateField("nameTest", "name", "Benjamin")] },
			]),
		));
});
