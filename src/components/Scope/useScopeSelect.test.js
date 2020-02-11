import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Immutable from "immutable";
import sinon from "sinon";
import useScopeSelect from "./useScopeSelect";

describe("useScopeSelect", () => {
	const TestComp = ({ id, closeSelector }) => {
		const [onClick, active] = useScopeSelect(id, closeSelector);
		return <div data-active={active} onClick={onClick} />;
	};

	let history, state, store, closer;
	beforeEach(() => {
		history = createMemoryHistory();
		sinon.spy(history, "push");
		state = Immutable.fromJS({
			navigation: {
				route: {
					match: {
						path: "/:scope/Bar",
						params: { scope: "Foo" },
					},
				},
			},
			router: {},
		});
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: () => {},
		};
		closer = sinon.spy().named("closer");
	});

	it("it provides a click handler to the enhanced component", () =>
		expect(
			<Provider store={store}>
				<Router history={history}>
					<TestComp id="Feep" closeSelector={closer} />
				</Router>
			</Provider>,
			"when mounted",
			"with event",
			"click",
		).then(() =>
			expect([history.push, closer], "to have calls satisfying", [
				{
					spy: history.push,
					args: ["/Feep/Bar"],
				},
				{
					spy: closer,
				},
			]),
		));
});
