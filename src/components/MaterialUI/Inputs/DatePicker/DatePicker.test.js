import React from "react";
import { IntlProvider } from "react-intl";
import DatePicker from "./index";
import { Ignore } from "unexpected-reaction";

describe("DatePicker", () => {
	it("sets up a date to locale (en-US)", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<DatePicker update={() => {}} value={"2020/06/30"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en-US">
				<div>
					<label>
						<div className="react-datepicker-wrapper">
							<div className="react-datepicker__input-container">
								<input value="06/30/2020" onChange={() => {}} />
							</div>
						</div>
						<Ignore />
					</label>
				</div>
			</IntlProvider>,
		));

	it("sets up a date to locale with time 5am (en-US)", () => {
		const date = new Date("2020-06-30T05:00:00");
		const expectedDate = "06/30/2020 5:00 AM";
		expect(
			<IntlProvider locale="en-US">
				<div>
					<DatePicker useTime={true} update={() => {}} value={date} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en-US">
				<div>
					<label>
						<div className="react-datepicker-wrapper">
							<div className="react-datepicker__input-container">
								<input value={expectedDate} onChange={() => {}} />
							</div>
						</div>
						<Ignore />
					</label>
				</div>
			</IntlProvider>,
		);
	});

	it("sets up a date to locale with time 5pm (en-US)", () => {
		const date = new Date("2020-06-30T17:00:00");
		const expectedDate = "06/30/2020 5:00 PM";
		expect(
			<IntlProvider locale="en-US">
				<div>
					<DatePicker useTime={true} update={() => {}} value={date} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en-US">
				<div>
					<label>
						<div className="react-datepicker-wrapper">
							<div className="react-datepicker__input-container">
								<input value={expectedDate} onChange={() => {}} />
							</div>
						</div>
						<Ignore />
					</label>
				</div>
			</IntlProvider>,
		);
	});

	it("sets up a date to locale with time 12am (en-US)", () => {
		const date = new Date("2020-06-30T00:00:00");
		const expectedDate = "06/30/2020 12:00 AM";
		expect(
			<IntlProvider locale="en-US">
				<div>
					<DatePicker useTime={true} update={() => {}} value={date} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en-US">
				<div>
					<label>
						<div className="react-datepicker-wrapper">
							<div className="react-datepicker__input-container">
								<input value={expectedDate} onChange={() => {}} />
							</div>
						</div>
						<Ignore />
					</label>
				</div>
			</IntlProvider>,
		);
	});
});
