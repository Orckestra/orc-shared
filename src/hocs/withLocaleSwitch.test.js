import React from "react";
import { Provider } from "react-redux";
import sinon from "sinon";
import withLocaleSwitch from "./withLocaleSwitch";
import { changeLocale } from "../actions/locale";

const TestComp = props => <button {...props} />;

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
					<Comp locale="en" />
				</Provider>,
				"when deeply rendered",
				"with event",
				"click",
				"on",
				<button />,
			).then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{ args: [changeLocale("en")] },
				]),
			),
		));
});
