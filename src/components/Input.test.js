import React from "react";
import { IntlProvider } from "react-intl";
import Input from "./Input";

describe("Input", () => {
	it("renders a styled input field with a plain text placeholder", () =>
		expect(
			<IntlProvider locale="en">
				<Input placeholder="A placeholder" />
			</IntlProvider>,
			"to deeply render as",
			<input placeholder="A placeholder" />,
		));

	it("renders a styled input field with a translated placeholder", () =>
		expect(
			<IntlProvider locale="en">
				<Input
					placeholder={{ id: "placeholder", defaultMessage: "A placeholder" }}
				/>
			</IntlProvider>,
			"to deeply render as",
			<input placeholder="A placeholder" />,
		));
});
