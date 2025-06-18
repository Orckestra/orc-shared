import React from "react";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import Fieldset from "./Fieldset";
import { extractMessages } from "../../utils/testUtils";
import sharedMessages from "../../sharedMessages";

const messages = extractMessages(sharedMessages);

describe("Fieldset", () => {
	it("works", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en" messages={messages}>
					<Fieldset label={{ id: "fieldset.label", defaultMessage: "A field set" }}>
						<div id="child" />
					</Fieldset>
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<fieldset>
				<legend>A field set</legend>
				<div id="child" />
			</fieldset>,
		));
});
