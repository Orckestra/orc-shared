import React from "react";
import { IntlProvider } from "react-intl";
import sinon from "sinon";
import { DateInputField, LiteralInput, PartInput, getDateUpdater } from "./Date";

describe("DateInputField", () => {
	it("sets up a date field set according to locale (en-US)", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<DateInputField update={() => {}} value={"2014-05-24"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en-US">
				<div>
					<PartInput part="month" value="05" onChange={() => {}} />
					<LiteralInput value="/" onChange={() => {}} />
					<PartInput part="day" value="24" onChange={() => {}} />
					<LiteralInput value="/" onChange={() => {}} />
					<PartInput part="year" value="2014" onChange={() => {}} />
					<LiteralInput value="" onChange={() => {}} />
				</div>
			</IntlProvider>,
		));

	it("handles empty value", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<DateInputField update={() => {}} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en-US">
				<div>
					<PartInput part="month" value="01" onChange={() => {}} />
					<LiteralInput value="/" onChange={() => {}} />
					<PartInput part="day" value="01" onChange={() => {}} />
					<LiteralInput value="/" onChange={() => {}} />
					<PartInput part="year" value="1970" onChange={() => {}} />
					<LiteralInput value="" onChange={() => {}} />
				</div>
			</IntlProvider>,
		));
});

describe("getDateUpdater", () => {
	let update;
	beforeEach(() => {
		update = sinon.spy().named("update");
	});

	it("creates a change handler which updates the day of a date", () =>
		expect(getDateUpdater, "when called with", [update, "day", "2014-05-24"], "when called with", [
			{ target: { value: "18" } },
		]).then(() => expect(update, "to have calls satisfying", [{ args: ["2014-05-18"] }])));

	it("creates a change handler which updates the month of a date", () =>
		expect(getDateUpdater, "when called with", [update, "month", "2014-05-24"], "when called with", [
			{ target: { value: "11" } },
		]).then(() => expect(update, "to have calls satisfying", [{ args: ["2014-11-24"] }])));

	it("creates a change handler which updates the year of a date", () =>
		expect(getDateUpdater, "when called with", [update, "year", "2014-05-24"], "when called with", [
			{ target: { value: "1988" } },
		]).then(() => expect(update, "to have calls satisfying", [{ args: ["1988-05-24"] }])));

	it("handles short day values", () =>
		expect(getDateUpdater, "when called with", [update, "day", "2014-05-24"], "when called with", [
			{ target: { value: "8" } },
		]).then(() => expect(update, "to have calls satisfying", [{ args: ["2014-05-08"] }])));

	it("handles short month values", () =>
		expect(getDateUpdater, "when called with", [update, "month", "2014-05-24"], "when called with", [
			{ target: { value: "3" } },
		]).then(() => expect(update, "to have calls satisfying", [{ args: ["2014-03-24"] }])));

	it("handles short year values", () =>
		expect(getDateUpdater, "when called with", [update, "year", "2014-05-24"], "when called with", [
			{ target: { value: "19" } },
		]).then(() => expect(update, "to have calls satisfying", [{ args: ["0019-05-24"] }])));

	it("handles long day values", () =>
		expect(getDateUpdater, "when called with", [update, "day", "2014-05-24"], "when called with", [
			{ target: { value: "122" } },
		]).then(() => expect(update, "to have calls satisfying", [{ args: ["2014-05-22"] }])));

	it("handles long month values", () =>
		expect(getDateUpdater, "when called with", [update, "month", "2014-05-24"], "when called with", [
			{ target: { value: "112" } },
		]).then(() => expect(update, "to have calls satisfying", [{ args: ["2014-12-24"] }])));

	it("handles long year values", () =>
		expect(getDateUpdater, "when called with", [update, "year", "2014-05-24"], "when called with", [
			{ target: { value: "19882" } },
		]).then(() => expect(update, "to have calls satisfying", [{ args: ["9882-05-24"] }])));
});
