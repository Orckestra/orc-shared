import React from "react";
import TimePicker from "./TimePicker";
import { IntlProvider } from "react-intl";
import { Ignore } from "unexpected-reaction";

const buildExpectedTime = (hours, mins, ampm, showTimeZone) => {
	return (
		<div>
			<div>
				<span>
					<select value={hours} onChange={() => {}}>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
						<option value="11">11</option>
						<option value="12">12</option>
					</select>{" "}
					:
					<select value={mins} onChange={() => {}}>
						<option value="00">00</option>
						<option value="15">15</option>
						<option value="30">30</option>
						<option value="45">45</option>
					</select>
					<select value={ampm} onChange={() => {}}>
						<option value="AM">AM</option>
						<option value="PM">PM</option>
					</select>
				</span>
				{showTimeZone && <br />}
				{showTimeZone && <Ignore />}
			</div>
		</div>
	);
};

describe("Time Component", () => {
	it("sets up a time 5am", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker update={() => {}} value={"05:00:00"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("5", "00", "AM"),
		));

	it("sets up a time 5pm", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker update={() => {}} value={"17:00:00"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("5", "00", "PM"),
		));

	it("sets up a time 12am", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker update={() => {}} value={"00:00"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("12", "00", "AM"),
		));

	it("sets up a time 12pm", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker update={() => {}} value={"12:00 pm"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("12", "00", "PM"),
		));

	it("sets up a time 4:16pm", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker update={() => {}} value={"4:16 pm"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("4", "15", "PM"),
		));

	it("sets up a time 4:31pm", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker update={() => {}} value={"4:31 pm"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("4", "30", "PM"),
		));

	it("shows timezone if requested", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker update={() => {}} value={"4:31 pm"} showTimeZone={true} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("4", "30", "PM", true),
		));
});
