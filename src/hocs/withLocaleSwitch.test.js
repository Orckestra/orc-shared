import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import sinon from "sinon";
import withLocaleSwitch from "./withLocaleSwitch";
import { changeLocale } from "../actions/locale";

const TestComp = ({ onClick }) => <button onClick={onClick} />;

describe("withLocaleSwitch", () => {
	let store;
	beforeEach(() => {
		store = {
			subscribe: () => {},
			getState: () => {},
			dispatch: sinon.spy().named("dispatch"),
		};
	});

	it("adds an onClick handler that will dispatch a locale change based on locale prop", () =>
		expect(withLocaleSwitch, "when called with", [TestComp]).then(Comp =>
			expect(
				<Provider store={store}>
					<MemoryRouter>
						<Comp locale="en" />
					</MemoryRouter>
				</Provider>,
				"when mounted",
				"with event",
				{ type: "click" },
			).then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{ args: [changeLocale("en")] },
				]),
			),
		));
});
