import React from "react";
import { IntlProvider } from "react-intl";
import sinon from "sinon";
import { FormInput, inputEventUpdater, TextInput } from "./Text";

describe("TextInput", () => {
	let update;
	beforeEach(() => {
		update = sinon.spy().named("update");
	});

	it("renders a text input with change handler", () =>
		expect(
			<IntlProvider locale="en">
				<TextInput update={update} otherProp />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en">
				<FormInput type="text" onChange={inputEventUpdater(update)} otherProp />
			</IntlProvider>,
		));
});

describe("inputEventUpdater", () => {
	let update;
	beforeEach(() => {
		update = sinon.spy().named("update");
	});

	it("creates a handler for an event and calls update with the value of the target", () =>
		expect(inputEventUpdater, "called with", [update], "called with", [{ target: { value: "foo" } }]).then(() =>
			expect(update, "to have calls satisfying", [{ args: ["foo"] }]),
		));

	it("is memoized", () => expect(inputEventUpdater, "called with", [update], "to be", inputEventUpdater(update)));
});
