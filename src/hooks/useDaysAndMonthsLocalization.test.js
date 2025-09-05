import React from "react";
import Immutable from "immutable";
import { extractMessages, TestWrapper } from "../utils/testUtils";
import sharedMessages from "../sharedMessages";
import useDaysAndMonthsLocalization from "./useDaysAndMonthsLocalization";

const messages = extractMessages(sharedMessages);

describe("useDaysAndMonthsLocalization", () => {
	let store, state;

	beforeEach(() => {
		state = Immutable.fromJS({});

		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
	});

	it("returns weekdays and months correctly", () => {
		const TestComp = () => {
			const daysAndMonths = useDaysAndMonthsLocalization();

			return (
				<div>
					{daysAndMonths.weekdays.map(x => (
						<div key={x}>{x}</div>
					))}
					{daysAndMonths.weekdaysShort.map(x => (
						<div key={x}>{x}</div>
					))}
					{daysAndMonths.weekdaysMin.map(x => (
						<div key={x}>{x}</div>
					))}
					{daysAndMonths.months.map(x => (
						<div key={x}>{x}</div>
					))}
					{daysAndMonths.monthsShort.map(x => (
						<div key={x}>{x}</div>
					))}
				</div>
			);
		};

		const component = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }}>
				<TestComp />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }}>
				<div>
					<div>Sunday</div>
					<div>Monday</div>
					<div>Tuesday</div>
					<div>Wednesday</div>
					<div>Thursday</div>
					<div>Friday</div>
					<div>Saturday</div>
					<div>Sun</div>
					<div>Mon</div>
					<div>Tue</div>
					<div>Wed</div>
					<div>Thu</div>
					<div>Fri</div>
					<div>Sat</div>
					<div>Su</div>
					<div>Mo</div>
					<div>Tu</div>
					<div>We</div>
					<div>Th</div>
					<div>Fr</div>
					<div>Sa</div>
					<div>January</div>
					<div>February</div>
					<div>March</div>
					<div>April</div>
					<div>May</div>
					<div>June</div>
					<div>July</div>
					<div>August</div>
					<div>September</div>
					<div>October</div>
					<div>November</div>
					<div>December</div>
					<div>Jan</div>
					<div>Feb</div>
					<div>Mar</div>
					<div>Apr</div>
					<div>May</div>
					<div>Jun</div>
					<div>Jul</div>
					<div>Aug</div>
					<div>Sep</div>
					<div>Oct</div>
					<div>Nov</div>
					<div>Dec</div>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});
});
