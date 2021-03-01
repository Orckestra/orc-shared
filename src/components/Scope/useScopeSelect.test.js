import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Immutable from "immutable";
import sinon from "sinon";
import useScopeSelect from "./useScopeSelect";

describe("useScopeSelect", () => {
	const TestComp = ({ id }) => {
		const [navigate, active] = useScopeSelect(id);
		return <div data-active={active} onClick={navigate} />;
	};

	let history, state, store;
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
	});

	it("it provides a click handler to the enhanced component", () =>
		expect(
			<Provider store={store}>
				<Router history={history}>
					<TestComp id="Feep" />
				</Router>
			</Provider>,
			"when mounted",
			"with event",
			"click",
		).then(() => expect(history.push, "to have a call satisfying", { args: ["/Feep/Bar"] })));
});
