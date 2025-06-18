import React from "react";
import { IntlProvider } from "react-intl";
import sinon from "sinon";
import InputBase from "../../MaterialUI/Inputs/InputBase";
import { inputEventUpdater, TextInput } from "./Text";
import { extractMessages, generateClassName } from "../../../utils/testUtils";
import sharedMessages from "../../../sharedMessages";
import { StylesProvider } from "@material-ui/core";

const messages = extractMessages(sharedMessages);

describe("TextInput", () => {
	let update;
	beforeEach(() => {
		update = sinon.spy().named("update");
	});

	it("renders a text input with change handler", () =>
		expect(
			<StylesProvider generateClassName={generateClassName}>
				<IntlProvider locale="en" messages={messages}>
					<TextInput update={update} otherProp />
				</IntlProvider>
			</StylesProvider>,
			"when mounted",
			"to satisfy",
			<StylesProvider generateClassName={generateClassName}>
				<IntlProvider locale="en" messages={messages}>
					<InputBase />
				</IntlProvider>
			</StylesProvider>,
		));
});

describe("inputEventUpdater", () => {
	let update;
	beforeEach(() => {
		update = sinon.spy().named("update");
	});

	it("creates a handler for an event and calls update with the value of the target", () =>
		expect(inputEventUpdater, "called with", [update], "called with", ["foo"]).then(() =>
			expect(update, "to have calls satisfying", [{ args: ["foo"] }]),
		));

	it("is memoized", () => expect(inputEventUpdater, "called with", [update], "to be", inputEventUpdater(update)));
});
