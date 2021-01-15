import React from "react";
import TimePicker from "./TimePicker";
import { IntlProvider } from "react-intl";
import { Ignore } from "unexpected-reaction";
import { mount } from "enzyme";
import sinon from "sinon";

const BuildHours = ({ hours, showAMPM }) => {
	if (showAMPM) {
		return (
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
			</select>
		);
	}

	return (
		<select value={hours} onChange={() => {}}>
			<option value="0">0</option>
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
			<option value="13">13</option>
			<option value="14">14</option>
			<option value="15">15</option>
			<option value="16">16</option>
			<option value="17">17</option>
			<option value="18">18</option>
			<option value="19">19</option>
			<option value="20">20</option>
			<option value="21">21</option>
			<option value="22">22</option>
			<option value="23">23</option>
		</select>
	);
};

const buildExpectedTime = (hours, mins, ampm, showTimeZone, showAMPM = true) => {
	return (
		<div>
			<div>
				<span>
					<BuildHours hours={hours} showAMPM={showAMPM} />
					<label> : </label>
					<select value={mins} onChange={() => {}}>
						<option value="00">00</option>
						<option value="15">15</option>
						<option value="30">30</option>
						<option value="45">45</option>
					</select>
					{showAMPM && (
						<select value={ampm} onChange={() => {}}>
							<option value="AM">AM</option>
							<option value="PM">PM</option>
						</select>
					)}
				</span>
				{showTimeZone && <br />}
				{showTimeZone && <Ignore />}
			</div>
		</div>
	);
};

describe("Time Component", () => {
	let updater;
	let originalDate;
	beforeEach(() => {
		updater = sinon.spy().named("updater");
		originalDate = global.Date;
	});

	afterEach(() => {
		global.Date = originalDate;
	});

	it("sets up a time 5am", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"05:00"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("5", "00", "AM"),
		));

	it("sets up a time 5am without AMPM", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"05:00"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("5", "00", "AM", false, false),
		));

	it("sets up a time now when no value without AMPM", () => {
		const testDate = new Date(2018, 11, 24, 10, 33, 30, 0);
		const _Date = Date;
		global.Date = jest.fn(() => testDate);
		global.Date.UTC = _Date.UTC;
		global.Date.parse = _Date.parse;
		global.Date.now = _Date.now;

		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={""} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("10", "30", "AM", false, false),
		);
	});

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
					<TimePicker showAMPM={true} onChange={updater} value={""} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("10", "30", "AM"),
		);
	});

	it("sets up a time now when no value without AMPM", () => {
		const testDate = new Date(2018, 11, 24, 10, 33, 30, 0);
		const _Date = Date;
		global.Date = jest.fn(() => testDate);
		global.Date.UTC = _Date.UTC;
		global.Date.parse = _Date.parse;
		global.Date.now = _Date.now;

		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={""} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("10", "30", "AM", false, false),
		);
	});

	it("sets up a time now when we have a bad value", () => {
		const testDate = new Date(2018, 11, 24, 10, 33, 30, 0);
		const _Date = Date;
		global.Date = jest.fn(() => testDate);
		global.Date.UTC = _Date.UTC;
		global.Date.parse = _Date.parse;
		global.Date.now = _Date.now;

		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"xxx"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("10", "30", "AM"),
		);
	});

	it("sets up a time now when we have a bad value withou AMPM", () => {
		const testDate = new Date(2018, 11, 24, 10, 33, 30, 0);
		const _Date = Date;
		global.Date = jest.fn(() => testDate);
		global.Date.UTC = _Date.UTC;
		global.Date.parse = _Date.parse;
		global.Date.now = _Date.now;

		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"xxx"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("10", "30", "AM", false, false),
		);
	});

	it("sets up a time 5pm", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"17:00"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("5", "00", "PM"),
		));

	it("sets up a time 5pm without AMPM", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"17:00"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("17", "00", "PM", false, false),
		));

	it("sets up a time 515pm", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"17:16"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("5", "15", "PM"),
		));

	it("sets up a time 515pm without AMPM", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"17:16"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("17", "00", "PM", false, false),
		));

	it("sets up a time 545pm", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"17:46"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("5", "45", "PM"),
		));

	it("sets up a time 545pm without AMPM", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"17:46:00"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("17", "45", "PM", false, false),
		));

	it("sets up a time 12am", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"00:00"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("12", "00", "AM"),
		));

	it("sets up a time 12am without AMPM", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"00:00"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("0", "00", "AM", false, false),
		));

	it("sets up a time 12pm", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"12:00 pm"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("12", "00", "PM"),
		));

	it("sets up a time 12pm without AMPM", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"12:00 pm"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("12", "00", "PM", false, false),
		));

	it("sets up a time 4:16pm", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"4:16 pm"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("4", "15", "PM"),
		));

	it("sets up a time 4:16pm without AMPM", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"4:16 pm"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("16", "15", "PM", false, false),
		));

	it("sets up a time 4:31pm", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"4:31 pm"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("4", "30", "PM"),
		));

	it("sets up a time 4:31pm without AMPM", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"4:31 pm"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("16", "30", "PM", false, false),
		));

	it("sets up a time 4:20pm", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"4:20 pm"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("4", "15", "PM"),
		));

	it("sets up a time 4:20pm without AMPM", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"4:20 pm"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("16", "15", "PM", false, false),
		));

	it("sets up a time 4:50pm", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"4:50 pm"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("4", "45", "PM"),
		));

	it("sets up a time 4:50pm without AMPM", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"4:50 pm"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("16", "45", "PM", false, false),
		));

	it("shows timezone if requested", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"4:31 pm"} showTimeZone={true} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("4", "30", "PM", true),
		));

	it("shows timezone if requested without AMPM", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"4:31 pm"} showTimeZone={true} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			buildExpectedTime("16", "30", "PM", true, false),
		));

	it("should render with browser AMPM", () => {
		const component = mount(<TimePicker value="00:00" />);

		const select = component.find("select");
		expect(select.length, "to equal", 3);
	});

	it("should update time with 12am", () => {
		const onChangeMock = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: "12" },
		};
		const component = mount(<TimePicker showAMPM={true} onChange={onChangeMock} value="00:00" />);

		const select = component.find("select");
		expect(select.length, "to equal", 3);

		select.at(0).simulate("change", event);
		expect(onChangeMock.mock.calls.length, "to equal", 1);
		expect(onChangeMock.mock.calls[0][0], "to equal", "00:00");
	});

	it("should update time with 12pm", () => {
		const onChangeMock = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: "12" },
		};
		const component = mount(<TimePicker showAMPM={true} onChange={onChangeMock} value="22:00" />);

		const select = component.find("select");
		expect(select.length, "to equal", 3);

		select.at(0).simulate("change", event);
		expect(onChangeMock.mock.calls.length, "to equal", 1);
		expect(onChangeMock.mock.calls[0][0], "to equal", "12:00");
	});

	it("should update time without AMPM", () => {
		const onChangeMock = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: "5" },
		};
		const component = mount(<TimePicker showAMPM={false} onChange={onChangeMock} value="22:00" />);

		const select = component.find("select");
		expect(select.length, "to equal", 2);

		select.at(0).simulate("change", event);
		expect(onChangeMock.mock.calls.length, "to equal", 1);
		expect(onChangeMock.mock.calls[0][0], "to equal", "05:00");
	});

	it("should update when 12", () => {
		const onChangeMock = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: "12" },
		};
		const component = mount(<TimePicker showAMPM={true} onChange={onChangeMock} value="22:00" />);

		const select = component.find("select");
		expect(select.length, "to equal", 3);

		select.at(0).simulate("change", event);
		expect(onChangeMock.mock.calls.length, "to equal", 1);
		expect(onChangeMock.mock.calls[0][0], "to equal", "12:00");
	});

	it("should update in AM when 12", () => {
		const onChangeMock = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: "12" },
		};
		const eventAMPM = {
			preventDefault() {},
			target: { value: "AM" },
		};
		const component = mount(<TimePicker showAMPM={true} onChange={onChangeMock} value="22:00" />);

		const select = component.find("select");
		expect(select.length, "to equal", 3);

		select.at(2).simulate("change", eventAMPM);
		select.at(0).simulate("change", event);
		expect(onChangeMock.mock.calls.length, "to equal", 2);
		expect(onChangeMock.mock.calls[0][0], "to equal", "10:00");
		expect(onChangeMock.mock.calls[1][0], "to equal", "00:00");
	});

	it("should update in PM when hours 12", () => {
		const onChangeMock = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: "12" },
		};
		const eventAMPM = {
			preventDefault() {},
			target: { value: "PM" },
		};
		const component = mount(<TimePicker showAMPM={true} onChange={onChangeMock} value="10:00" />);

		const select = component.find("select");
		expect(select.length, "to equal", 3);

		select.at(2).simulate("change", eventAMPM);
		select.at(0).simulate("change", event);
		expect(onChangeMock.mock.calls.length, "to equal", 2);
		expect(onChangeMock.mock.calls[0][0], "to equal", "22:00");
		expect(onChangeMock.mock.calls[1][0], "to equal", "12:00");
	});

	it("should update when no onchange", () => {
		const event = {
			preventDefault() {},
			target: { value: "01" },
		};
		const component = mount(<TimePicker showAMPM={true} />);

		const select = component.find("select");
		expect(select.length, "to equal", 3);

		select.at(1).simulate("change", event);
	});

	it("should update when mins >= 45", () => {
		const onChangeMock = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: "45" },
		};
		const component = mount(<TimePicker showAMPM={true} onChange={onChangeMock} />);

		const select = component.find("select");
		expect(select.length, "to equal", 3);

		select.at(1).simulate("change", event);
		expect(onChangeMock.mock.calls.length, "to equal", 1);
	});

	it("should update when mins >= 15 and < 30", () => {
		const onChangeMock = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: "15" },
		};
		const component = mount(<TimePicker showAMPM={true} onChange={onChangeMock} />);

		const select = component.find("select");
		expect(select.length, "to equal", 3);

		select.at(1).simulate("change", event);
		expect(onChangeMock.mock.calls.length, "to equal", 1);
	});

	it("should call onChange prop", () => {
		const onChangeMock = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: "10" },
		};
		const eventAMPM = {
			preventDefault() {},
			target: { value: "AM" },
		};
		const component = mount(<TimePicker showAMPM={true} onChange={onChangeMock} />);

		const select = component.find("select");
		expect(select.length, "to equal", 3);

		select.at(0).simulate("change", event);
		select.at(1).simulate("change", event);
		select.at(2).simulate("change", eventAMPM);
		expect(onChangeMock.mock.calls.length, "to equal", 3);
	});
});
