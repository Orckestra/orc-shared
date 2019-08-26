import React from "react";
import { FormattedDate } from "react-intl";
import sinon from "sinon";
import MockDate from "mockdate";
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
					startSelectedDateAt={new Date("2019-04-15 00:00:00")}
					startCurrentDateAt={new Date("2019-04-15 00:00:00")}
					render={CalendarDropdown}
					onSelectedChange={expect.it("called with", [
						new Date("2019-04-12 00:00:00"),
					])}
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
		MockDate.set("2019-04-08 00:00:00");
	});
	afterEach(() => {
		MockDate.reset();
	});

	it("renders a calendar browser", () =>
		expect(
			<CalendarDropdown
				date={new Date("2019-04-10 00:00:00")}
				selectedDate={new Date("2019-04-15 00:00:00")}
				getFormattedDate={date => date.toDateString()}
				getWeeksInMonth={() => [
					[
						{ label: "1", dateValue: new Date("2019-04-01 00:00:00") },
						{ label: "2", dateValue: new Date("2019-04-02 00:00:00") },
						{ label: "3", dateValue: new Date("2019-04-03 00:00:00") },
						{ label: "4", dateValue: new Date("2019-04-04 00:00:00") },
						{ label: "5", dateValue: new Date("2019-04-05 00:00:00") },
						{ label: "6", dateValue: new Date("2019-04-06 00:00:00") },
						{ label: "7", dateValue: new Date("2019-04-07 00:00:00") },
					],
					[
						{ label: "8", dateValue: new Date("2019-04-08 00:00:00") },
						{ label: "9", dateValue: new Date("2019-04-09 00:00:00") },
						{ label: "10", dateValue: new Date("2019-04-10 00:00:00") },
						{ label: "11", dateValue: new Date("2019-04-11 00:00:00") },
						{ label: "12", dateValue: new Date("2019-04-12 00:00:00") },
						{ label: "13", dateValue: new Date("2019-04-13 00:00:00") },
						{ label: "14", dateValue: new Date("2019-04-14 00:00:00") },
					],
					[
						{ label: "15", dateValue: new Date("2019-04-15 00:00:00") },
						{ label: "16", dateValue: new Date("2019-04-16 00:00:00") },
						{ label: "17", dateValue: new Date("2019-04-17 00:00:00") },
						{ label: "18", dateValue: new Date("2019-04-18 00:00:00") },
						{ label: "19", dateValue: new Date("2019-04-19 00:00:00") },
						{ label: "20", dateValue: new Date("2019-04-20 00:00:00") },
						{ label: "21", dateValue: new Date("2019-04-21 00:00:00") },
					],
					[
						{ label: "22", dateValue: new Date("2019-04-22 00:00:00") },
						{ label: "23", dateValue: new Date("2019-04-23 00:00:00") },
						{ label: "24", dateValue: new Date("2019-04-24 00:00:00") },
						{ label: "25", dateValue: new Date("2019-04-25 00:00:00") },
						{ label: "26", dateValue: new Date("2019-04-26 00:00:00") },
						{ label: "27", dateValue: new Date("2019-04-27 00:00:00") },
						{ label: "28", dateValue: new Date("2019-04-28 00:00:00") },
					],
					[
						{ label: "29", dateValue: new Date("2019-04-29 00:00:00") },
						{ label: "30", dateValue: new Date("2019-04-30 00:00:00") },
						{ label: "1", dateValue: new Date("2019-05-01 00:00:00") },
						{ label: "2", dateValue: new Date("2019-05-02 00:00:00") },
						{ label: "3", dateValue: new Date("2019-05-03 00:00:00") },
						{ label: "4", dateValue: new Date("2019-05-04 00:00:00") },
						{ label: "5", dateValue: new Date("2019-05-05 00:00:00") },
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
							<FormattedDate
								value={new Date("2019-04-10 00:00:00")}
								month="long"
							/>
						</MonthName>
						<NextArrow />
					</CalendarHeader>
					<DateTable>
						<thead>
							<tr>
								<th>
									<FormattedDate
										value={new Date("2019-04-01 00:00:00")}
										weekday="short"
									/>
								</th>
								<th>
									<FormattedDate
										value={new Date("2019-04-02 00:00:00")}
										weekday="short"
									/>
								</th>
								<th>
									<FormattedDate
										value={new Date("2019-04-03 00:00:00")}
										weekday="short"
									/>
								</th>
								<th>
									<FormattedDate
										value={new Date("2019-04-04 00:00:00")}
										weekday="short"
									/>
								</th>
								<th>
									<FormattedDate
										value={new Date("2019-04-05 00:00:00")}
										weekday="short"
									/>
								</th>
								<th>
									<FormattedDate
										value={new Date("2019-04-06 00:00:00")}
										weekday="short"
									/>
								</th>
								<th>
									<FormattedDate
										value={new Date("2019-04-07 00:00:00")}
										weekday="short"
									/>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<Day thisDate={new Date("2019-04-01 00:00:00")} />
								<Day thisDate={new Date("2019-04-02 00:00:00")} />
								<Day thisDate={new Date("2019-04-03 00:00:00")} />
								<Day thisDate={new Date("2019-04-04 00:00:00")} />
								<Day thisDate={new Date("2019-04-05 00:00:00")} />
								<Day thisDate={new Date("2019-04-06 00:00:00")} />
								<Day thisDate={new Date("2019-04-07 00:00:00")} />
							</tr>
							<tr>
								<Day thisDate={new Date("2019-04-08 00:00:00")} />
								<Day thisDate={new Date("2019-04-09 00:00:00")} />
								<Day thisDate={new Date("2019-04-10 00:00:00")} />
								<Day thisDate={new Date("2019-04-11 00:00:00")} />
								<Day thisDate={new Date("2019-04-12 00:00:00")} />
								<Day thisDate={new Date("2019-04-13 00:00:00")} />
								<Day thisDate={new Date("2019-04-14 00:00:00")} />
							</tr>
							<tr>
								<Day thisDate={new Date("2019-04-15 00:00:00")} />
								<Day thisDate={new Date("2019-04-16 00:00:00")} />
								<Day thisDate={new Date("2019-04-17 00:00:00")} />
								<Day thisDate={new Date("2019-04-18 00:00:00")} />
								<Day thisDate={new Date("2019-04-19 00:00:00")} />
								<Day thisDate={new Date("2019-04-20 00:00:00")} />
								<Day thisDate={new Date("2019-04-21 00:00:00")} />
							</tr>
							<tr>
								<Day thisDate={new Date("2019-04-22 00:00:00")} />
								<Day thisDate={new Date("2019-04-23 00:00:00")} />
								<Day thisDate={new Date("2019-04-24 00:00:00")} />
								<Day thisDate={new Date("2019-04-25 00:00:00")} />
								<Day thisDate={new Date("2019-04-26 00:00:00")} />
								<Day thisDate={new Date("2019-04-27 00:00:00")} />
								<Day thisDate={new Date("2019-04-28 00:00:00")} />
							</tr>
							<tr>
								<Day thisDate={new Date("2019-04-29 00:00:00")} />
								<Day thisDate={new Date("2019-04-30 00:00:00")} />
								<Day thisDate={new Date("2019-05-01 00:00:00")} />
								<Day thisDate={new Date("2019-05-02 00:00:00")} />
								<Day thisDate={new Date("2019-05-03 00:00:00")} />
								<Day thisDate={new Date("2019-05-04 00:00:00")} />
								<Day thisDate={new Date("2019-05-05 00:00:00")} />
							</tr>
						</tbody>
					</DateTable>
				</CalendarBox>,
			)
				.and(
					"queried for",
					<Day thisDate={new Date("2019-04-08 00:00:00")} />,
					"to render as",
					<DayCell today>8</DayCell>,
				)
				.and(
					"queried for",
					<Day thisDate={new Date("2019-04-10 00:00:00")} />,
					"to render as",
					<DayCell active>10</DayCell>,
				)
				.and(
					"queried for",
					<Day thisDate={new Date("2019-04-15 00:00:00")} />,
					"to render as",
					<DayCell selected>15</DayCell>,
				)
				.and(
					"queried for",
					<Day thisDate={new Date("2019-05-02 00:00:00")} />,
					"to render as",
					<DayCell outsideMonth>2</DayCell>,
				),
		));

	it("can select a new date", () => {
		const pick = sinon.spy().named("pickDate");
		return expect(
			<CalendarDropdown
				date={new Date("2019-04-10 00:00:00")}
				selectedDate={new Date("2019-04-15 00:00:00")}
				getFormattedDate={date => date.toDateString()}
				pickDate={pick}
				getWeeksInMonth={() => [
					[
						{ label: "8", dateValue: new Date("2019-04-08 00:00:00") },
						{ label: "9", dateValue: new Date("2019-04-09 00:00:00") },
						{ label: "10", dateValue: new Date("2019-04-10 00:00:00") },
						{ label: "11", dateValue: new Date("2019-04-11 00:00:00") },
						{ label: "12", dateValue: new Date("2019-04-12 00:00:00") },
						{ label: "13", dateValue: new Date("2019-04-13 00:00:00") },
						{ label: "14", dateValue: new Date("2019-04-14 00:00:00") },
					],
					[
						{ label: "15", dateValue: new Date("2019-04-15 00:00:00") },
						{ label: "16", dateValue: new Date("2019-04-16 00:00:00") },
						{ label: "17", dateValue: new Date("2019-04-17 00:00:00") },
						{ label: "18", dateValue: new Date("2019-04-18 00:00:00") },
						{ label: "19", dateValue: new Date("2019-04-19 00:00:00") },
						{ label: "20", dateValue: new Date("2019-04-20 00:00:00") },
						{ label: "21", dateValue: new Date("2019-04-21 00:00:00") },
					],
				]}
			/>,
			"when rendered",
			"queried for",
			<Day thisDate={new Date("2019-04-12 00:00:00")} />,
			"when rendered",
			"with event",
			"click",
			"on",
			<DayCell />,
		).then(() =>
			expect(pick, "to have calls satisfying", [
				{ args: [new Date("2019-04-12 00:00:00")] },
			]),
		);
	});

	it("can switch to last month", () => {
		const last = sinon.spy().named("lastMonth");
		return expect(
			<CalendarDropdown
				date={new Date("2019-04-10 00:00:00")}
				selectedDate={new Date("2019-04-15 00:00:00")}
				getFormattedDate={date => date.toDateString()}
				setDatePrevMonth={last}
				getWeeksInMonth={() => [
					[
						{ label: "8", dateValue: new Date("2019-04-08 00:00:00") },
						{ label: "9", dateValue: new Date("2019-04-09 00:00:00") },
						{ label: "10", dateValue: new Date("2019-04-10 00:00:00") },
						{ label: "11", dateValue: new Date("2019-04-11 00:00:00") },
						{ label: "12", dateValue: new Date("2019-04-12 00:00:00") },
						{ label: "13", dateValue: new Date("2019-04-13 00:00:00") },
						{ label: "14", dateValue: new Date("2019-04-14 00:00:00") },
					],
					[
						{ label: "15", dateValue: new Date("2019-04-15 00:00:00") },
						{ label: "16", dateValue: new Date("2019-04-16 00:00:00") },
						{ label: "17", dateValue: new Date("2019-04-17 00:00:00") },
						{ label: "18", dateValue: new Date("2019-04-18 00:00:00") },
						{ label: "19", dateValue: new Date("2019-04-19 00:00:00") },
						{ label: "20", dateValue: new Date("2019-04-20 00:00:00") },
						{ label: "21", dateValue: new Date("2019-04-21 00:00:00") },
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
				date={new Date("2019-04-10 00:00:00")}
				selectedDate={new Date("2019-04-15 00:00:00")}
				getFormattedDate={date => date.toDateString()}
				setDateNextMonth={next}
				getWeeksInMonth={() => [
					[
						{ label: "8", dateValue: new Date("2019-04-08 00:00:00") },
						{ label: "9", dateValue: new Date("2019-04-09 00:00:00") },
						{ label: "10", dateValue: new Date("2019-04-10 00:00:00") },
						{ label: "11", dateValue: new Date("2019-04-11 00:00:00") },
						{ label: "12", dateValue: new Date("2019-04-12 00:00:00") },
						{ label: "13", dateValue: new Date("2019-04-13 00:00:00") },
						{ label: "14", dateValue: new Date("2019-04-14 00:00:00") },
					],
					[
						{ label: "15", dateValue: new Date("2019-04-15 00:00:00") },
						{ label: "16", dateValue: new Date("2019-04-16 00:00:00") },
						{ label: "17", dateValue: new Date("2019-04-17 00:00:00") },
						{ label: "18", dateValue: new Date("2019-04-18 00:00:00") },
						{ label: "19", dateValue: new Date("2019-04-19 00:00:00") },
						{ label: "20", dateValue: new Date("2019-04-20 00:00:00") },
						{ label: "21", dateValue: new Date("2019-04-21 00:00:00") },
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
