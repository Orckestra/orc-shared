import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import { IntlProvider } from "react-intl";
import I18n from "./I18n";

jest.mock("translations/en.json", () => ({
	WORD: "Word",
}));

describe("I18n", () => {
	let store, state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				locale: "en",
				supportedLocales: ["en"],
			},
		});
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
	});

	it("renders a react-intl IntlProvider with locale data provided", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<I18n>
						<div />
					</I18n>
				</MemoryRouter>
			</Provider>,
			"to deeply render as",
			<IntlProvider key="en" locale="en" messages={{ WORD: "Word" }}>
				<div />
			</IntlProvider>,
		));
});
