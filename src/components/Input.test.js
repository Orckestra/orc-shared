import React from "react";
import { IntlProvider } from "react-intl";
import Input, { InputComponent } from "./Input";

describe("Input", () => {
	it("renders a styled input field with a plain text placeholder", () =>
		expect(
			<IntlProvider locale="en">
				<Input placeholder="A placeholder" />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<InputComponent placeholder="A placeholder" />,
		));

	it("renders a styled input field with a translated placeholder", () =>
		expect(
			<IntlProvider locale="en">
				<Input
					placeholder={{ id: "placeholder", defaultMessage: "A placeholder" }}
				/>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<InputComponent placeholder="A placeholder" />,
		));
});
