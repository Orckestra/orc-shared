import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import sinon from "sinon";
import usePreviousModified from "./usePreviousModified";
import { useState } from "react";

const TestComp = ({ initCount, value, predicate }) => {
	const [count, setCount] = useState(initCount);
	const modified = usePreviousModified(count, predicate);

	return <div onClick={() => setCount(value)}>{modified.toString()}</div>;
};

describe("usePreviousModified", () => {
	let store, state;
	beforeEach(() => {
		state = Immutable.fromJS({});
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		};
	});

	it("display value as modified with default predicate", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<TestComp initCount={0} value={1} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"with event",
			"click",
			"to satisfy",
			<div>true</div>,
		));

	it("display value as not modified default predicate", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<TestComp initCount={10} value={10} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"with event",
			"click",
			"to satisfy",
			<div>false</div>,
		));

	it("display value as modified with custom predicate", () => {
		const predicate = (p, c) => c >= 15;

		expect(
			<Provider store={store}>
				<MemoryRouter>
					<TestComp initCount={10} value={15} predicate={predicate} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"with event",
			"click",
			"to satisfy",
			<div>true</div>,
		);
	});

	it("display value as not modified with custom predicate", () => {
		const predicate = (p, c) => c >= 15;

		expect(
			<Provider store={store}>
				<MemoryRouter>
					<TestComp initCount={10} value={14} predicate={predicate} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"with event",
			"click",
			"to satisfy",
			<div>false</div>,
		);
	});
});
