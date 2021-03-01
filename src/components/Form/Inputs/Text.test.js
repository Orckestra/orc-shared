import React from "react";
import { IntlProvider } from "react-intl";
import sinon from "sinon";
import { FormInput, getEventUpdater, TextInput, EmailInput } from "./Text";

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
				<FormInput type="text" onChange={getEventUpdater(update)} otherProp />
			</IntlProvider>,
		));
});

describe("EmailInput", () => {
	let update;
	beforeEach(() => {
		update = sinon.spy().named("update");
	});

	it("renders a text input with change handler", () =>
		expect(
			<IntlProvider locale="en">
				<EmailInput update={update} otherProp />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en">
				<FormInput type="email" onChange={getEventUpdater(update)} otherProp />
			</IntlProvider>,
		));
});

describe("getEventUpdater", () => {
	let update;
	beforeEach(() => {
		update = sinon.spy().named("update");
	});

	it("creates a handler for an event and calls update with the value of the target", () =>
		expect(getEventUpdater, "called with", [update], "called with", [{ target: { value: "foo" } }]).then(() =>
			expect(update, "to have calls satisfying", [{ args: ["foo"] }]),
		));

	it("is memoized", () => expect(getEventUpdater, "called with", [update], "to be", getEventUpdater(update)));
});
