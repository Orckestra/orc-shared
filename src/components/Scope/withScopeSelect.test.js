import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import sinon from "sinon";
import withScopeSelect from "./withScopeSelect";

const TestComp = ({ onClick }) => <div onClick={onClick} />;

describe("withScopeSelect", () => {
	let state, store, closer;
	beforeEach(() => {
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
			dispatch: sinon.spy().named("dispatch"),
		};
		closer = sinon.spy().named("closer");
	});

	it("it provides a click handler to the enhanced component", () =>
		expect(withScopeSelect, "when called with", [TestComp]).then(Comp =>
			expect(
				<Provider store={store}>
					<MemoryRouter>
						<Comp id="Feep" closeSelector={closer} />
					</MemoryRouter>
				</Provider>,
				"when deeply rendered",
				"with event",
				"click",
				"on",
				<div />,
				"to contain",
				<TestComp onClick={expect.it("to be a function")} />,
			).then(() =>
				expect([store.dispatch, closer], "to have calls satisfying", [
					{
						spy: store.dispatch,
						args: [
							{
								type: "@@router/CALL_HISTORY_METHOD",
								payload: { method: "push", args: ["/Feep/Bar"] },
							},
						],
					},
					{
						spy: closer,
					},
				]),
			),
		));
});
