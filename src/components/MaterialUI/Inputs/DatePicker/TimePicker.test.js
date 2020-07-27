import React from "react";
import TimePicker from "./TimePicker";
import { IntlProvider } from "react-intl";
import { Ignore } from "unexpected-reaction";
import { mount } from "enzyme";

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
					<TimePicker onChange={() => {}} value={"05:00:00"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("5", "00", "AM"),
		));

	it("sets up a time now when no value", () => {
		const testDate = new Date(2018, 11, 24, 10, 33, 30, 0);
		const _Date = Date;
		global.Date = jest.fn(() => testDate);
		global.Date.UTC = _Date.UTC;
		global.Date.parse = _Date.parse;
		global.Date.now = _Date.now;

		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker onChange={() => {}} value={""} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("10", "30", "AM"),
		);
	});

	it("sets up a time 5pm", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker onChange={() => {}} value={"17:00:00"} />
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
					<TimePicker onChange={() => {}} value={"00:00"} />
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
					<TimePicker onChange={() => {}} value={"12:00 pm"} />
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
					<TimePicker onChange={() => {}} value={"4:16 pm"} />
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
					<TimePicker onChange={() => {}} value={"4:31 pm"} />
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
					<TimePicker onChange={() => {}} value={"4:31 pm"} showTimeZone={true} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("4", "30", "PM", true),
		));

	it("should call onChange prop", () => {
		const onChangeMock = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: "10" },
		};
		const component = mount(<TimePicker onChange={onChangeMock} />);

		const select = component.find("select");
		expect(select.length, "to equal", 3);

		select.at(0).simulate("change", event);
		select.at(1).simulate("change", event);
		select.at(2).simulate("change", event);
		expect(onChangeMock.mock.calls.length, "to equal", 3);
	});
});
