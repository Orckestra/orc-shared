import React from "react";
import { IntlProvider, FormattedDate } from "react-intl";
import sinon from "sinon";
import MockDate from "mockdate";
import { parseISO } from "date-fns-2";
import Kalendaryo from "kalendaryo";
import {
	PositionedWrapper,
	DateInputField,
	LiteralInput,
	DatePartInput,
	getDateUpdater,
	CrudeDateInput,
	CalendarIcon,
	CalendarButton,
	CalendarDropdown,
	CalendarBox,
	DateTable,
	Day,
	DayCell,
	CalendarHeader,
	MonthName,
	LastArrow,
	NextArrow,
} from "./Date";

describe("DateInput", () => {
	let update, reset;
	beforeEach(() => {
		update = sinon.spy().named("update");
		reset = sinon.spy().named("reset");
	});

	it("renders a three-part date input", () =>
		expect(
			<CrudeDateInput
				update={update}
				reset={reset}
				value="2019-04-15"
				otherProp
			/>,
			"to render as",
			<PositionedWrapper>
				<DateInputField update={update} value="2019-04-15" otherProp />
				<Kalendaryo
					startSelectedDateAt={parseISO("2019-04-15")}
					startCurrentDateAt={parseISO("2019-04-15")}
					render={CalendarDropdown}
					onSelectedChange={expect.it("called with", [parseISO("2019-04-12")])}
				/>
				<CalendarButton>
					<CalendarIcon />
				</CalendarButton>
			</PositionedWrapper>,
		).then(() => {
			expect(update, "to have a call satisfying", { args: ["2019-04-12"] });
			expect(reset, "was called");
		}));

	it("renders a date input with a default value", () =>
		expect(
			<IntlProvider locale="en-US">
				<CrudeDateInput update={update} reset={reset} otherProp />
			</IntlProvider>,
			"when deeply rendered",
			"to contain",
			<DateInputField value="1970-01-01" />,
		));

	it("renders a required date input", () =>
		expect(
			<CrudeDateInput
				update={update}
				reset={reset}
				value=""
				required
				otherProp
			/>,
			"to render as",
			<PositionedWrapper invalid>
				<DateInputField otherProp />
				<CalendarButton>
					<CalendarIcon />
				</CalendarButton>
			</PositionedWrapper>,
		));
});

describe("DateInputField", () => {
	it("sets up a date field set according to locale (en-US)", () =>
		expect(
			<IntlProvider locale="en-US">
				<DateInputField update={() => {}} value={"2014-05-24"} />
			</IntlProvider>,
			"to deeply render as",
			<DateInputField>
				<DatePartInput part="month" value="05" />
				<LiteralInput value="/" />
				<DatePartInput part="day" value="24" />
				<LiteralInput value="/" />
				<DatePartInput part="year" value="2014" />
				<LiteralInput value="" />
			</DateInputField>,
		));

	it("handles empty value", () =>
		expect(
			<IntlProvider locale="en-US">
				<DateInputField update={() => {}} value="" />
			</IntlProvider>,
			"to deeply render as",
			<DateInputField>
				<DatePartInput part="month" value="01" />
				<LiteralInput value="/" />
				<DatePartInput part="day" value="01" />
				<LiteralInput value="/" />
				<DatePartInput part="year" value="1970" />
				<LiteralInput value="" />
			</DateInputField>,
		));
});

describe("getDateUpdater", () => {
	let update;
	beforeEach(() => {
		update = sinon.spy().named("update");
	});

	it("creates a change handler which updates the day of a date", () =>
		expect(
			getDateUpdater,
			"when called with",
			[update, "day", "2014-05-24"],
			"when called with",
			[{ target: { value: "18" } }],
		).then(() =>
			expect(update, "to have calls satisfying", [{ args: ["2014-05-18"] }]),
		));

	it("creates a change handler which updates the month of a date", () =>
		expect(
			getDateUpdater,
			"when called with",
			[update, "month", "2014-05-24"],
			"when called with",
			[{ target: { value: "11" } }],
		).then(() =>
			expect(update, "to have calls satisfying", [{ args: ["2014-11-24"] }]),
		));

	it("creates a change handler which updates the year of a date", () =>
		expect(
			getDateUpdater,
			"when called with",
			[update, "year", "2014-05-24"],
			"when called with",
			[{ target: { value: "1988" } }],
		).then(() =>
			expect(update, "to have calls satisfying", [{ args: ["1988-05-24"] }]),
		));

	it("handles short day values", () =>
		expect(
			getDateUpdater,
			"when called with",
			[update, "day", "2014-05-24"],
			"when called with",
			[{ target: { value: "8" } }],
		).then(() =>
			expect(update, "to have calls satisfying", [{ args: ["2014-05-08"] }]),
		));

	it("handles short month values", () =>
		expect(
			getDateUpdater,
			"when called with",
			[update, "month", "2014-05-24"],
			"when called with",
			[{ target: { value: "3" } }],
		).then(() =>
			expect(update, "to have calls satisfying", [{ args: ["2014-03-24"] }]),
		));

	it("handles short year values", () =>
		expect(
			getDateUpdater,
			"when called with",
			[update, "year", "2014-05-24"],
			"when called with",
			[{ target: { value: "19" } }],
		).then(() =>
			expect(update, "to have calls satisfying", [{ args: ["0019-05-24"] }]),
		));

	it("handles long day values", () =>
		expect(
			getDateUpdater,
			"when called with",
			[update, "day", "2014-05-24"],
			"when called with",
			[{ target: { value: "122" } }],
		).then(() =>
			expect(update, "to have calls satisfying", [{ args: ["2014-05-22"] }]),
		));

	it("handles long month values", () =>
		expect(
			getDateUpdater,
			"when called with",
			[update, "month", "2014-05-24"],
			"when called with",
			[{ target: { value: "112" } }],
		).then(() =>
			expect(update, "to have calls satisfying", [{ args: ["2014-12-24"] }]),
		));

	it("handles long year values", () =>
		expect(
			getDateUpdater,
			"when called with",
			[update, "year", "2014-05-24"],
			"when called with",
			[{ target: { value: "19882" } }],
		).then(() =>
			expect(update, "to have calls satisfying", [{ args: ["9882-05-24"] }]),
		));
});

describe("CalendarDropdown", () => {
	beforeEach(() => {
		MockDate.set(parseISO("2019-04-08"));
	});
	afterEach(() => {
		MockDate.reset();
	});

	it("renders a calendar browser", () =>
		expect(
			<CalendarDropdown
				date={parseISO("2019-04-10")}
				selectedDate={parseISO("2019-04-15")}
				getFormattedDate={date => date.toDateString()}
				getWeeksInMonth={() => [
					[
						{ label: "1", dateValue: parseISO("2019-04-01") },
						{ label: "2", dateValue: parseISO("2019-04-02") },
						{ label: "3", dateValue: parseISO("2019-04-03") },
						{ label: "4", dateValue: parseISO("2019-04-04") },
						{ label: "5", dateValue: parseISO("2019-04-05") },
						{ label: "6", dateValue: parseISO("2019-04-06") },
						{ label: "7", dateValue: parseISO("2019-04-07") },
					],
					[
						{ label: "8", dateValue: parseISO("2019-04-08") },
						{ label: "9", dateValue: parseISO("2019-04-09") },
						{ label: "10", dateValue: parseISO("2019-04-10") },
						{ label: "11", dateValue: parseISO("2019-04-11") },
						{ label: "12", dateValue: parseISO("2019-04-12") },
						{ label: "13", dateValue: parseISO("2019-04-13") },
						{ label: "14", dateValue: parseISO("2019-04-14") },
					],
					[
						{ label: "15", dateValue: parseISO("2019-04-15") },
						{ label: "16", dateValue: parseISO("2019-04-16") },
						{ label: "17", dateValue: parseISO("2019-04-17") },
						{ label: "18", dateValue: parseISO("2019-04-18") },
						{ label: "19", dateValue: parseISO("2019-04-19") },
						{ label: "20", dateValue: parseISO("2019-04-20") },
						{ label: "21", dateValue: parseISO("2019-04-21") },
					],
					[
						{ label: "22", dateValue: parseISO("2019-04-22") },
						{ label: "23", dateValue: parseISO("2019-04-23") },
						{ label: "24", dateValue: parseISO("2019-04-24") },
						{ label: "25", dateValue: parseISO("2019-04-25") },
						{ label: "26", dateValue: parseISO("2019-04-26") },
						{ label: "27", dateValue: parseISO("2019-04-27") },
						{ label: "28", dateValue: parseISO("2019-04-28") },
					],
					[
						{ label: "29", dateValue: parseISO("2019-04-29") },
						{ label: "30", dateValue: parseISO("2019-04-30") },
						{ label: "1", dateValue: parseISO("2019-05-01") },
						{ label: "2", dateValue: parseISO("2019-05-02") },
						{ label: "3", dateValue: parseISO("2019-05-03") },
						{ label: "4", dateValue: parseISO("2019-05-04") },
						{ label: "5", dateValue: parseISO("2019-05-05") },
					],
				]}
			/>,
			"when rendered",
		).then(render =>
			expect(
				render,
				"to have rendered",
				<CalendarBox>
					<CalendarHeader>
						<LastArrow />
						<MonthName>
							<FormattedDate value={parseISO("2019-04-10")} month="long" />
						</MonthName>
						<NextArrow />
					</CalendarHeader>
					<DateTable>
						<thead>
							<tr>
								<th>
									<FormattedDate
										value={parseISO("2019-04-01")}
										weekday="short"
									/>
								</th>
								<th>
									<FormattedDate
										value={parseISO("2019-04-02")}
										weekday="short"
									/>
								</th>
								<th>
									<FormattedDate
										value={parseISO("2019-04-03")}
										weekday="short"
									/>
								</th>
								<th>
									<FormattedDate
										value={parseISO("2019-04-04")}
										weekday="short"
									/>
								</th>
								<th>
									<FormattedDate
										value={parseISO("2019-04-05")}
										weekday="short"
									/>
								</th>
								<th>
									<FormattedDate
										value={parseISO("2019-04-06")}
										weekday="short"
									/>
								</th>
								<th>
									<FormattedDate
										value={parseISO("2019-04-07")}
										weekday="short"
									/>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<Day thisDate={parseISO("2019-04-01")} />
								<Day thisDate={parseISO("2019-04-02")} />
								<Day thisDate={parseISO("2019-04-03")} />
								<Day thisDate={parseISO("2019-04-04")} />
								<Day thisDate={parseISO("2019-04-05")} />
								<Day thisDate={parseISO("2019-04-06")} />
								<Day thisDate={parseISO("2019-04-07")} />
							</tr>
							<tr>
								<Day thisDate={parseISO("2019-04-08")} />
								<Day thisDate={parseISO("2019-04-09")} />
								<Day thisDate={parseISO("2019-04-10")} />
								<Day thisDate={parseISO("2019-04-11")} />
								<Day thisDate={parseISO("2019-04-12")} />
								<Day thisDate={parseISO("2019-04-13")} />
								<Day thisDate={parseISO("2019-04-14")} />
							</tr>
							<tr>
								<Day thisDate={parseISO("2019-04-15")} />
								<Day thisDate={parseISO("2019-04-16")} />
								<Day thisDate={parseISO("2019-04-17")} />
								<Day thisDate={parseISO("2019-04-18")} />
								<Day thisDate={parseISO("2019-04-19")} />
								<Day thisDate={parseISO("2019-04-20")} />
								<Day thisDate={parseISO("2019-04-21")} />
							</tr>
							<tr>
								<Day thisDate={parseISO("2019-04-22")} />
								<Day thisDate={parseISO("2019-04-23")} />
								<Day thisDate={parseISO("2019-04-24")} />
								<Day thisDate={parseISO("2019-04-25")} />
								<Day thisDate={parseISO("2019-04-26")} />
								<Day thisDate={parseISO("2019-04-27")} />
								<Day thisDate={parseISO("2019-04-28")} />
							</tr>
							<tr>
								<Day thisDate={parseISO("2019-04-29")} />
								<Day thisDate={parseISO("2019-04-30")} />
								<Day thisDate={parseISO("2019-05-01")} />
								<Day thisDate={parseISO("2019-05-02")} />
								<Day thisDate={parseISO("2019-05-03")} />
								<Day thisDate={parseISO("2019-05-04")} />
								<Day thisDate={parseISO("2019-05-05")} />
							</tr>
						</tbody>
					</DateTable>
				</CalendarBox>,
			)
				.and(
					"queried for",
					<Day thisDate={parseISO("2019-04-08")} />,
					"to render as",
					<DayCell today>8</DayCell>,
				)
				.and(
					"queried for",
					<Day thisDate={parseISO("2019-04-10")} />,
					"to render as",
					<DayCell active>10</DayCell>,
				)
				.and(
					"queried for",
					<Day thisDate={parseISO("2019-04-15")} />,
					"to render as",
					<DayCell selected>15</DayCell>,
				)
				.and(
					"queried for",
					<Day thisDate={parseISO("2019-05-02")} />,
					"to render as",
					<DayCell outsideMonth>2</DayCell>,
				),
		));

	it("can select a new date", () => {
		const pick = sinon.spy().named("pickDate");
		return expect(
			<CalendarDropdown
				date={parseISO("2019-04-10")}
				selectedDate={parseISO("2019-04-15")}
				getFormattedDate={date => date.toDateString()}
				pickDate={pick}
				getWeeksInMonth={() => [
					[
						{ label: "8", dateValue: parseISO("2019-04-08") },
						{ label: "9", dateValue: parseISO("2019-04-09") },
						{ label: "10", dateValue: parseISO("2019-04-10") },
						{ label: "11", dateValue: parseISO("2019-04-11") },
						{ label: "12", dateValue: parseISO("2019-04-12") },
						{ label: "13", dateValue: parseISO("2019-04-13") },
						{ label: "14", dateValue: parseISO("2019-04-14") },
					],
					[
						{ label: "15", dateValue: parseISO("2019-04-15") },
						{ label: "16", dateValue: parseISO("2019-04-16") },
						{ label: "17", dateValue: parseISO("2019-04-17") },
						{ label: "18", dateValue: parseISO("2019-04-18") },
						{ label: "19", dateValue: parseISO("2019-04-19") },
						{ label: "20", dateValue: parseISO("2019-04-20") },
						{ label: "21", dateValue: parseISO("2019-04-21") },
					],
				]}
			/>,
			"when rendered",
			"queried for",
			<Day thisDate={parseISO("2019-04-12")} />,
			"when rendered",
			"with event",
			"click",
			"on",
			<DayCell />,
		).then(() =>
			expect(pick, "to have calls satisfying", [
				{ args: [parseISO("2019-04-12")] },
			]),
		);
	});

	it("can switch to last month", () => {
		const last = sinon.spy().named("lastMonth");
		return expect(
			<CalendarDropdown
				date={parseISO("2019-04-10")}
				selectedDate={parseISO("2019-04-15")}
				getFormattedDate={date => date.toDateString()}
				setDatePrevMonth={last}
				getWeeksInMonth={() => [
					[
						{ label: "8", dateValue: parseISO("2019-04-08") },
						{ label: "9", dateValue: parseISO("2019-04-09") },
						{ label: "10", dateValue: parseISO("2019-04-10") },
						{ label: "11", dateValue: parseISO("2019-04-11") },
						{ label: "12", dateValue: parseISO("2019-04-12") },
						{ label: "13", dateValue: parseISO("2019-04-13") },
						{ label: "14", dateValue: parseISO("2019-04-14") },
					],
					[
						{ label: "15", dateValue: parseISO("2019-04-15") },
						{ label: "16", dateValue: parseISO("2019-04-16") },
						{ label: "17", dateValue: parseISO("2019-04-17") },
						{ label: "18", dateValue: parseISO("2019-04-18") },
						{ label: "19", dateValue: parseISO("2019-04-19") },
						{ label: "20", dateValue: parseISO("2019-04-20") },
						{ label: "21", dateValue: parseISO("2019-04-21") },
					],
				]}
			/>,
			"when rendered",
			"with event",
			"click",
			"on",
			<LastArrow />,
		).then(() => expect(last, "was called once"));
	});

	it("can switch to next month", () => {
		const next = sinon.spy().named("nextMonth");
		return expect(
			<CalendarDropdown
				date={parseISO("2019-04-10")}
				selectedDate={parseISO("2019-04-15")}
				getFormattedDate={date => date.toDateString()}
				setDateNextMonth={next}
				getWeeksInMonth={() => [
					[
						{ label: "8", dateValue: parseISO("2019-04-08") },
						{ label: "9", dateValue: parseISO("2019-04-09") },
						{ label: "10", dateValue: parseISO("2019-04-10") },
						{ label: "11", dateValue: parseISO("2019-04-11") },
						{ label: "12", dateValue: parseISO("2019-04-12") },
						{ label: "13", dateValue: parseISO("2019-04-13") },
						{ label: "14", dateValue: parseISO("2019-04-14") },
					],
					[
						{ label: "15", dateValue: parseISO("2019-04-15") },
						{ label: "16", dateValue: parseISO("2019-04-16") },
						{ label: "17", dateValue: parseISO("2019-04-17") },
						{ label: "18", dateValue: parseISO("2019-04-18") },
						{ label: "19", dateValue: parseISO("2019-04-19") },
						{ label: "20", dateValue: parseISO("2019-04-20") },
						{ label: "21", dateValue: parseISO("2019-04-21") },
					],
				]}
			/>,
			"when rendered",
			"with event",
			"click",
			"on",
			<NextArrow />,
		).then(() => expect(next, "was called once"));
	});
});
