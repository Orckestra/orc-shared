import React from "react";
import { FormattedDate } from "react-intl";
import sinon from "sinon";
import MockDate from "mockdate";
import { parse } from "date-fns";
import Kalendaryo from "kalendaryo";
import { FormInput } from "./Text";
import {
	PositionedWrapper,
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
	it("renders a basic date input, preliminary", () =>
		expect(
			<CrudeDateInput
				update={update}
				reset={reset}
				value="2019-04-15 00:00:00"
				otherProp
			/>,
			"to render as",
			<PositionedWrapper>
				<FormInput
					type="date"
					onChange={expect.it("to be a function")}
					otherProp
				/>
				<Kalendaryo
					startSelectedDateAt={parse("2019-04-15")}
					startCurrentDateAt={parse("2019-04-15")}
					render={CalendarDropdown}
					onSelectedChange={expect.it("called with", [parse("2019-04-12")])}
				/>
				<CalendarButton>
					<CalendarIcon />
				</CalendarButton>
			</PositionedWrapper>,
		).then(() => {
			expect(update, "to have a call satisfying", { args: ["2019-04-12"] });
			expect(reset, "was called");
		}));

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
				<FormInput type="date" otherProp />
				<CalendarButton>
					<CalendarIcon />
				</CalendarButton>
			</PositionedWrapper>,
		));
});

describe("CalendarDropdown", () => {
	beforeEach(() => {
		MockDate.set(parse("2019-04-08"));
	});
	afterEach(() => {
		MockDate.reset();
	});

	it("renders a calendar browser", () =>
		expect(
			<CalendarDropdown
				date={parse("2019-04-10")}
				selectedDate={parse("2019-04-15")}
				getFormattedDate={date => date.toDateString()}
				getWeeksInMonth={() => [
					[
						{ label: "1", dateValue: parse("2019-04-01") },
						{ label: "2", dateValue: parse("2019-04-02") },
						{ label: "3", dateValue: parse("2019-04-03") },
						{ label: "4", dateValue: parse("2019-04-04") },
						{ label: "5", dateValue: parse("2019-04-05") },
						{ label: "6", dateValue: parse("2019-04-06") },
						{ label: "7", dateValue: parse("2019-04-07") },
					],
					[
						{ label: "8", dateValue: parse("2019-04-08") },
						{ label: "9", dateValue: parse("2019-04-09") },
						{ label: "10", dateValue: parse("2019-04-10") },
						{ label: "11", dateValue: parse("2019-04-11") },
						{ label: "12", dateValue: parse("2019-04-12") },
						{ label: "13", dateValue: parse("2019-04-13") },
						{ label: "14", dateValue: parse("2019-04-14") },
					],
					[
						{ label: "15", dateValue: parse("2019-04-15") },
						{ label: "16", dateValue: parse("2019-04-16") },
						{ label: "17", dateValue: parse("2019-04-17") },
						{ label: "18", dateValue: parse("2019-04-18") },
						{ label: "19", dateValue: parse("2019-04-19") },
						{ label: "20", dateValue: parse("2019-04-20") },
						{ label: "21", dateValue: parse("2019-04-21") },
					],
					[
						{ label: "22", dateValue: parse("2019-04-22") },
						{ label: "23", dateValue: parse("2019-04-23") },
						{ label: "24", dateValue: parse("2019-04-24") },
						{ label: "25", dateValue: parse("2019-04-25") },
						{ label: "26", dateValue: parse("2019-04-26") },
						{ label: "27", dateValue: parse("2019-04-27") },
						{ label: "28", dateValue: parse("2019-04-28") },
					],
					[
						{ label: "29", dateValue: parse("2019-04-29") },
						{ label: "30", dateValue: parse("2019-04-30") },
						{ label: "1", dateValue: parse("2019-05-01") },
						{ label: "2", dateValue: parse("2019-05-02") },
						{ label: "3", dateValue: parse("2019-05-03") },
						{ label: "4", dateValue: parse("2019-05-04") },
						{ label: "5", dateValue: parse("2019-05-05") },
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
							<FormattedDate value={parse("2019-04-10")} month="long" />
						</MonthName>
						<NextArrow />
					</CalendarHeader>
					<DateTable>
						<thead>
							<tr>
								<th>
									<FormattedDate value={parse("2019-04-01")} weekday="short" />
								</th>
								<th>
									<FormattedDate value={parse("2019-04-02")} weekday="short" />
								</th>
								<th>
									<FormattedDate value={parse("2019-04-03")} weekday="short" />
								</th>
								<th>
									<FormattedDate value={parse("2019-04-04")} weekday="short" />
								</th>
								<th>
									<FormattedDate value={parse("2019-04-05")} weekday="short" />
								</th>
								<th>
									<FormattedDate value={parse("2019-04-06")} weekday="short" />
								</th>
								<th>
									<FormattedDate value={parse("2019-04-07")} weekday="short" />
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<Day thisDate={parse("2019-04-01")} />
								<Day thisDate={parse("2019-04-02")} />
								<Day thisDate={parse("2019-04-03")} />
								<Day thisDate={parse("2019-04-04")} />
								<Day thisDate={parse("2019-04-05")} />
								<Day thisDate={parse("2019-04-06")} />
								<Day thisDate={parse("2019-04-07")} />
							</tr>
							<tr>
								<Day thisDate={parse("2019-04-08")} />
								<Day thisDate={parse("2019-04-09")} />
								<Day thisDate={parse("2019-04-10")} />
								<Day thisDate={parse("2019-04-11")} />
								<Day thisDate={parse("2019-04-12")} />
								<Day thisDate={parse("2019-04-13")} />
								<Day thisDate={parse("2019-04-14")} />
							</tr>
							<tr>
								<Day thisDate={parse("2019-04-15")} />
								<Day thisDate={parse("2019-04-16")} />
								<Day thisDate={parse("2019-04-17")} />
								<Day thisDate={parse("2019-04-18")} />
								<Day thisDate={parse("2019-04-19")} />
								<Day thisDate={parse("2019-04-20")} />
								<Day thisDate={parse("2019-04-21")} />
							</tr>
							<tr>
								<Day thisDate={parse("2019-04-22")} />
								<Day thisDate={parse("2019-04-23")} />
								<Day thisDate={parse("2019-04-24")} />
								<Day thisDate={parse("2019-04-25")} />
								<Day thisDate={parse("2019-04-26")} />
								<Day thisDate={parse("2019-04-27")} />
								<Day thisDate={parse("2019-04-28")} />
							</tr>
							<tr>
								<Day thisDate={parse("2019-04-29")} />
								<Day thisDate={parse("2019-04-30")} />
								<Day thisDate={parse("2019-05-01")} />
								<Day thisDate={parse("2019-05-02")} />
								<Day thisDate={parse("2019-05-03")} />
								<Day thisDate={parse("2019-05-04")} />
								<Day thisDate={parse("2019-05-05")} />
							</tr>
						</tbody>
					</DateTable>
				</CalendarBox>,
			)
				.and(
					"queried for",
					<Day thisDate={parse("2019-04-08")} />,
					"to render as",
					<DayCell today>8</DayCell>,
				)
				.and(
					"queried for",
					<Day thisDate={parse("2019-04-10")} />,
					"to render as",
					<DayCell active>10</DayCell>,
				)
				.and(
					"queried for",
					<Day thisDate={parse("2019-04-15")} />,
					"to render as",
					<DayCell selected>15</DayCell>,
				)
				.and(
					"queried for",
					<Day thisDate={parse("2019-05-02")} />,
					"to render as",
					<DayCell outsideMonth>2</DayCell>,
				),
		));

	it("can select a new date", () => {
		const pick = sinon.spy().named("pickDate");
		return expect(
			<CalendarDropdown
				date={parse("2019-04-10")}
				selectedDate={parse("2019-04-15")}
				getFormattedDate={date => date.toDateString()}
				pickDate={pick}
				getWeeksInMonth={() => [
					[
						{ label: "8", dateValue: parse("2019-04-08") },
						{ label: "9", dateValue: parse("2019-04-09") },
						{ label: "10", dateValue: parse("2019-04-10") },
						{ label: "11", dateValue: parse("2019-04-11") },
						{ label: "12", dateValue: parse("2019-04-12") },
						{ label: "13", dateValue: parse("2019-04-13") },
						{ label: "14", dateValue: parse("2019-04-14") },
					],
					[
						{ label: "15", dateValue: parse("2019-04-15") },
						{ label: "16", dateValue: parse("2019-04-16") },
						{ label: "17", dateValue: parse("2019-04-17") },
						{ label: "18", dateValue: parse("2019-04-18") },
						{ label: "19", dateValue: parse("2019-04-19") },
						{ label: "20", dateValue: parse("2019-04-20") },
						{ label: "21", dateValue: parse("2019-04-21") },
					],
				]}
			/>,
			"when rendered",
			"queried for",
			<Day thisDate={parse("2019-04-12")} />,
			"when rendered",
			"with event",
			"click",
			"on",
			<DayCell />,
		).then(() =>
			expect(pick, "to have calls satisfying", [
				{ args: [parse("2019-04-12")] },
			]),
		);
	});

	it("can switch to last month", () => {
		const last = sinon.spy().named("lastMonth");
		return expect(
			<CalendarDropdown
				date={parse("2019-04-10")}
				selectedDate={parse("2019-04-15")}
				getFormattedDate={date => date.toDateString()}
				setDatePrevMonth={last}
				getWeeksInMonth={() => [
					[
						{ label: "8", dateValue: parse("2019-04-08") },
						{ label: "9", dateValue: parse("2019-04-09") },
						{ label: "10", dateValue: parse("2019-04-10") },
						{ label: "11", dateValue: parse("2019-04-11") },
						{ label: "12", dateValue: parse("2019-04-12") },
						{ label: "13", dateValue: parse("2019-04-13") },
						{ label: "14", dateValue: parse("2019-04-14") },
					],
					[
						{ label: "15", dateValue: parse("2019-04-15") },
						{ label: "16", dateValue: parse("2019-04-16") },
						{ label: "17", dateValue: parse("2019-04-17") },
						{ label: "18", dateValue: parse("2019-04-18") },
						{ label: "19", dateValue: parse("2019-04-19") },
						{ label: "20", dateValue: parse("2019-04-20") },
						{ label: "21", dateValue: parse("2019-04-21") },
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
				date={parse("2019-04-10")}
				selectedDate={parse("2019-04-15")}
				getFormattedDate={date => date.toDateString()}
				setDateNextMonth={next}
				getWeeksInMonth={() => [
					[
						{ label: "8", dateValue: parse("2019-04-08") },
						{ label: "9", dateValue: parse("2019-04-09") },
						{ label: "10", dateValue: parse("2019-04-10") },
						{ label: "11", dateValue: parse("2019-04-11") },
						{ label: "12", dateValue: parse("2019-04-12") },
						{ label: "13", dateValue: parse("2019-04-13") },
						{ label: "14", dateValue: parse("2019-04-14") },
					],
					[
						{ label: "15", dateValue: parse("2019-04-15") },
						{ label: "16", dateValue: parse("2019-04-16") },
						{ label: "17", dateValue: parse("2019-04-17") },
						{ label: "18", dateValue: parse("2019-04-18") },
						{ label: "19", dateValue: parse("2019-04-19") },
						{ label: "20", dateValue: parse("2019-04-20") },
						{ label: "21", dateValue: parse("2019-04-21") },
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
