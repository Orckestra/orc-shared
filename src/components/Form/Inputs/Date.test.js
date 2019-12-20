import React from "react";
import { IntlProvider } from "react-intl";
import { Ignore } from "unexpected-reaction";
import { mount } from "react-dom-testing";
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
			<IntlProvider locale="en">
				<CrudeDateInput
					update={update}
					reset={reset}
					value="2019-04-15"
					otherProp
				/>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en">
				<PositionedWrapper>
					<DateInputField update={update} value="2019-04-15" otherProp />
					<Kalendaryo
						startSelectedDateAt={parseISO("2019-04-15")}
						startCurrentDateAt={parseISO("2019-04-15")}
						render={CalendarDropdown}
					/>
					<CalendarButton>
						<CalendarIcon />
					</CalendarButton>
				</PositionedWrapper>
			</IntlProvider>,
		));

	it("renders a date input with a default value", () =>
		expect(
			<IntlProvider locale="en-US">
				<CrudeDateInput update={update} reset={reset} otherProp />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en">
				<PositionedWrapper>
					<DateInputField value="1970-01-01" />
					<Ignore />
					<Ignore />
				</PositionedWrapper>
			</IntlProvider>,
		));

	it("renders a required date input", () =>
		expect(
			<IntlProvider locale="en">
				<CrudeDateInput
					update={update}
					reset={reset}
					value=""
					required
					otherProp
				/>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<PositionedWrapper invalid>
				<IntlProvider locale="en">
					<DateInputField otherProp />
				</IntlProvider>
				<Ignore />
				<CalendarButton>
					<CalendarIcon />
				</CalendarButton>
			</PositionedWrapper>,
		));
});

describe("DateInputField", () => {
	it("sets up a date field set according to locale (en-US)", () =>
		expect(
			mount(
				<IntlProvider locale="en-US">
					<DateInputField update={() => {}} value={"2014-05-24"} />
				</IntlProvider>,
			).childNodes,
			"to satisfy",
			[
				<IntlProvider locale="en-US">
					<DatePartInput part="month" value="05" onChange={() => {}} />
				</IntlProvider>,
				<IntlProvider locale="en-US">
					<LiteralInput value="/" onChange={() => {}} />
				</IntlProvider>,
				<IntlProvider locale="en-US">
					<DatePartInput part="day" value="24" onChange={() => {}} />
				</IntlProvider>,
				<IntlProvider locale="en-US">
					<LiteralInput value="/" onChange={() => {}} />
				</IntlProvider>,
				<IntlProvider locale="en-US">
					<DatePartInput part="year" value="2014" onChange={() => {}} />
				</IntlProvider>,
				<IntlProvider locale="en-US">
					<LiteralInput value="" onChange={() => {}} />
				</IntlProvider>,
			],
		));

	it("handles empty value", () =>
		expect(
			mount(
				<IntlProvider locale="en-US">
					<DateInputField update={() => {}} />
				</IntlProvider>,
			).childNodes,
			"to satisfy",
			[
				<IntlProvider locale="en-US">
					<DatePartInput part="month" value="01" onChange={() => {}} />
				</IntlProvider>,
				<IntlProvider locale="en-US">
					<LiteralInput value="/" onChange={() => {}} />
				</IntlProvider>,
				<IntlProvider locale="en-US">
					<DatePartInput part="day" value="01" onChange={() => {}} />
				</IntlProvider>,
				<IntlProvider locale="en-US">
					<LiteralInput value="/" onChange={() => {}} />
				</IntlProvider>,
				<IntlProvider locale="en-US">
					<DatePartInput part="year" value="1970" onChange={() => {}} />
				</IntlProvider>,
				<IntlProvider locale="en-US">
					<LiteralInput value="" onChange={() => {}} />
				</IntlProvider>,
			],
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
			<IntlProvider locale="en-US">
				<CalendarDropdown
					date={parseISO("2019-04-10")}
					selectedDate={parseISO("2019-04-15")}
					getFormattedDate={(date = new Date()) => date.toDateString()}
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
				/>
			</IntlProvider>,
			"when mounted",
			expect.it(
				"to satisfy",
				<CalendarBox>
					<CalendarHeader>
						<LastArrow />
						<MonthName>April 2019</MonthName>
						<NextArrow />
					</CalendarHeader>
					<DateTable>
						<thead>
							<tr>
								<th>Mon</th>
								<th>Tue</th>
								<th>Wed</th>
								<th>Thu</th>
								<th>Fri</th>
								<th>Sat</th>
								<th>Sun</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<DayCell>1</DayCell>
								<DayCell>2</DayCell>
								<DayCell>3</DayCell>
								<DayCell>4</DayCell>
								<DayCell>5</DayCell>
								<DayCell>6</DayCell>
								<DayCell>7</DayCell>
							</tr>
							<tr>
								<DayCell today>8</DayCell>
								<DayCell>9</DayCell>
								<DayCell active>10</DayCell>
								<DayCell>11</DayCell>
								<DayCell>12</DayCell>
								<DayCell>13</DayCell>
								<DayCell>14</DayCell>
							</tr>
							<tr>
								<DayCell selected>15</DayCell>
								<DayCell>16</DayCell>
								<DayCell>17</DayCell>
								<DayCell>18</DayCell>
								<DayCell>19</DayCell>
								<DayCell>20</DayCell>
								<DayCell>21</DayCell>
							</tr>
							<tr>
								<DayCell>22</DayCell>
								<DayCell>23</DayCell>
								<DayCell>24</DayCell>
								<DayCell>25</DayCell>
								<DayCell>26</DayCell>
								<DayCell>27</DayCell>
								<DayCell>28</DayCell>
							</tr>
							<tr>
								<DayCell>29</DayCell>
								<DayCell>30</DayCell>
								<DayCell outsideMonth>1</DayCell>
								<DayCell outsideMonth>2</DayCell>
								<DayCell outsideMonth>3</DayCell>
								<DayCell outsideMonth>4</DayCell>
								<DayCell outsideMonth>5</DayCell>
							</tr>
						</tbody>
					</DateTable>
				</CalendarBox>,
			),
		));

	it("can select a new date", () => {
		const pick = sinon.spy().named("pickDate");
		return expect(
			<IntlProvider locale="en-US">
				<CalendarDropdown
					date={parseISO("2019-04-10")}
					selectedDate={parseISO("2019-04-15")}
					getFormattedDate={(date = new Date()) => date.toDateString()}
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
				/>
			</IntlProvider>,
			"when mounted",
			"with event",
			{
				type: "click",
				target: `[data-test-id="${parseISO("2019-04-12").toDateString()}"]`,
			},
		).then(() =>
			expect(pick, "to have calls satisfying", [
				{ args: [parseISO("2019-04-12")] },
			]),
		);
	});

	it("can switch to last month", () => {
		const last = sinon.spy().named("lastMonth");
		return expect(
			<IntlProvider locale="en-US">
				<CalendarDropdown
					date={parseISO("2019-04-10")}
					selectedDate={parseISO("2019-04-15")}
					getFormattedDate={(date = new Date()) => date.toDateString()}
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
				/>
			</IntlProvider>,
			"when mounted",
			"with event",
			{ type: "click", target: '[data-test-id="calendar_lastArrow"]' },
		).then(() => expect(last, "was called once"));
	});

	it("can switch to next month", () => {
		const next = sinon.spy().named("nextMonth");
		return expect(
			<IntlProvider locale="en-US">
				<CalendarDropdown
					date={parseISO("2019-04-10")}
					selectedDate={parseISO("2019-04-15")}
					getFormattedDate={(date = new Date()) => date.toDateString()}
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
				/>
			</IntlProvider>,
			"when mounted",
			"with event",
			{ type: "click", target: '[data-test-id="calendar_nextArrow"]' },
		).then(() => expect(next, "was called once"));
	});
});
