import React from "react";
import { IntlProvider } from "react-intl";
import { mount } from "unexpected-reaction";
import { spyOnConsole } from "../utils/testUtils";
import Input, { InputComponent } from "./Input";

describe("Input", () => {
	spyOnConsole(["error"]);

	it("renders a styled input field with a plain text placeholder", () =>
		expect(
			<Input placeholder="A placeholder" />,
			"when mounted",
			"to satisfy",
			<InputComponent placeholder="A placeholder" />,
		));

	it("renders a styled input field with a translated placeholder", () =>
		expect(
			<IntlProvider locale="en">
				<Input placeholder={{ id: "placeholder", defaultMessage: "A placeholder" }} />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<InputComponent placeholder="A placeholder" />,
		));

	it("fails on attempt to translate intl message outside an IntlProvider", () =>
		expect(
			() =>
				mount(
					<Input placeholder={{ id: "placeholder", defaultMessage: "A placeholder" }} />,
				),
			"to throw",
			"Attempting to translate message placeholder outside of Intl context",
		));
});
