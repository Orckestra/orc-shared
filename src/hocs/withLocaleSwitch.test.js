import React from "react";
import sinon from "sinon";
import withLocaleSwitch from "./withLocaleSwitch";
import { changeLocale } from "../actions/locale";

const TestComp = () => <div />;

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
				<Comp locale="en" store={store} />,
				"to render as",
				<TestComp onClick={expect.it("when called with", ["en"])} />,
			).then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{ args: [changeLocale("en")] },
				]),
			),
		));
});
