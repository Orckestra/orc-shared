import React from "react";
import TimePicker, { HoursSelect, MinsSelect, AMPMSelect, parseTime } from "./TimePicker";
import { Ignore } from "unexpected-reaction";
import { mount } from "enzyme";
import sinon from "sinon";
import sharedMessages from "../../../sharedMessages";
import { extractMessages } from "../../../utils/testUtils";
import { TestWrapper, createMuiTheme } from "../../../utils/testUtils";
import Immutable from "immutable";

const messages = extractMessages(sharedMessages);

const buildExpectedTime = (time, showTimeZone, showAMPM = true) => {
	return (
		<div>
			<div>
				<span>
					<HoursSelect time={time} showAMPM={showAMPM} updateTimeOptions={jest.fn()} />
					<label> : </label>
					<MinsSelect time={time} updateTimeOptions={jest.fn()} />
					<AMPMSelect time={time} showAMPM={showAMPM} updateTimeOptions={jest.fn()} />
				</span>
				{showTimeZone && <Ignore />}
			</div>
		</div>
	);
};

describe("Time Component", () => {
	let updater;
	let originalDate;
	let state, store, stateWithoutCorrectTimezone, storeWithoutCorrectTimezone;
	const timezoneChange = timeZone => {
		jest.spyOn(Intl, "DateTimeFormat").mockImplementation(() => ({
			resolvedOptions: () => ({
				timeZone: timeZone,
			}),
		}));
		global.Intl.DateTimeFormat.supportedLocalesOf = () => ["en-US"];
	};

	beforeEach(() => {
		updater = sinon.spy().named("updater");
		originalDate = global.Date;
		global.Intl = Intl;

		state = Immutable.fromJS({
			locale: {},
			metadata: {
				lookups: {
					customer: {
						index: {
							TimeZone: {
								values: {
									UTC: {
										value: "UTC",
										displayName: {
											"en-US": "(UTC) Coordinated Universal Time",
										},
									},
								},
							},
						},
					},
				},
			},
		});
		store = {
			getState: () => state,
			subscribe: () => {},
			dispatch: () => {},
		};

		stateWithoutCorrectTimezone = Immutable.fromJS({
			locale: {},
			metadata: {
				lookups: {
					customer: {
						index: {
							TimeZone: {
								values: {
									NewTimezone: {
										displayName: {
											"en-US": "NewTimezone",
										},
									},
								},
							},
						},
					},
				},
			},
		});
		storeWithoutCorrectTimezone = {
			getState: () => stateWithoutCorrectTimezone,
			subscribe: () => {},
			dispatch: () => {},
		};
	});

	const theme = createMuiTheme();

	afterEach(() => {
		global.Date = originalDate;
		global.Intl = Intl;
	});

	it("sets up a time 5am", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"05:00"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("5:00 AM"))}
			</TestWrapper>,
		));

	it("sets up a time 5am without AMPM", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"05:00"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("5:00 AM"), false, false)}
			</TestWrapper>,
		));

	it("sets up a time now when no value without AMPM", () => {
		const testDate = new Date(2018, 11, 24, 10, 33, 30, 0);
		const _Date = Date;
		global.Date = jest.fn(() => testDate);
		global.Date.UTC = _Date.UTC;
		global.Date.parse = _Date.parse;
		global.Date.now = _Date.now;

		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={""} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("10:30 AM"), false, false)}
			</TestWrapper>,
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
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={""} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("10:30 AM"))}
			</TestWrapper>,
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
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={""} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("10:30 AM"), false, false)}
			</TestWrapper>,
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
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"xxx"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("10:30 AM"))}
			</TestWrapper>,
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
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"xxx"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("10:30 AM"), false, false)}
			</TestWrapper>,
		);
	});

	it("sets up a time 5pm", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"17:00"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("5:00 PM"))}
			</TestWrapper>,
		));

	it("sets up a time 5pm without AMPM", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"17:00"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("17:00 PM"), false, false)}
			</TestWrapper>,
		));

	it("sets up a time 515pm", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"17:16"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("5:15 PM"))}
			</TestWrapper>,
		));

	it("sets up a time 515pm without AMPM", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"17:16"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("17:00 PM"), false, false)}
			</TestWrapper>,
		));

	it("sets up a time 545pm", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"17:46"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("5:45 PM"))}
			</TestWrapper>,
		));

	it("sets up a time 559pm", () => {
		const component = mount(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker
						showAMPM={true}
						onChange={jest.fn()}
						value="10:59"
						timeOption={{
							minutes: [
								{ value: "00", label: "00" },
								{ value: "15", label: "15" },
								{ value: "30", label: "30" },
								{ value: "45", label: "45" },
								{ value: "59", label: "59" },
							],
						}}
					/>
				</div>
			</TestWrapper>,
		);

		const minSelect = component.find("[data-qa='time-minutes']");

		expect(minSelect.length, "to equal", 1);
		expect(minSelect.at(0).props().selectProps.componentProps.get("value"), "to equal", "59");
	});

	it("sets up a time 545pm without AMPM", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"17:46:00"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("17:45 PM"), false, false)}
			</TestWrapper>,
		));

	it("sets up a time 12am", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"00:00"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("12:00 AM"))}
			</TestWrapper>,
		));

	it("sets up a time 12am without AMPM", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"00:00"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("0:00 AM"), false, false)}
			</TestWrapper>,
		));

	it("sets up a time 12pm", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"12:00 pm"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("12:00 PM"))}
			</TestWrapper>,
		));

	it("sets up a time 12pm without AMPM", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"12:00 pm"} requestedTimeZone={"UTC"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("12:00 PM"), false, false)}
			</TestWrapper>,
		));

	it("sets up a time 4:16pm", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"4:16 pm"} requestedTimeZone={"UTC"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("4:15 PM"))}
			</TestWrapper>,
		));

	it("sets up a time 4:16pm without AMPM", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"4:16 pm"} requestedTimeZone={"UTC"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("16:15 PM"), false, false)}
			</TestWrapper>,
		));

	it("sets up a time 4:31pm", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"4:31 pm"} requestedTimeZone={"UTC"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("4:30 PM"))}
			</TestWrapper>,
		));

	it("sets up a time 4:31pm without AMPM", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"4:31 pm"} requestedTimeZone={"UTC"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("16:30 PM"), false, false)}
			</TestWrapper>,
		));

	it("sets up a time 4:20pm", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"4:20 pm"} requestedTimeZone={"UTC"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("4:15 PM"))}
			</TestWrapper>,
		));

	it("sets up a time 4:20pm without AMPM", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"4:20 pm"} requestedTimeZone={"UTC"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("16:15 PM"), false, false)}
			</TestWrapper>,
		));

	it("sets up a time 4:50pm", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={updater} value={"4:50 pm"} requestedTimeZone={"UTC"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("4:45 PM"))}
			</TestWrapper>,
		));

	it("sets up a time 4:50pm without AMPM", () =>
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"4:50 pm"} requestedTimeZone={"UTC"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("16:45 PM"), false, false)}
			</TestWrapper>,
		));

	it("shows timezone if requested", () => {
		timezoneChange("UTC");
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker
						showAMPM={true}
						onChange={updater}
						value={"4:31 pm"}
						showTimeZone={true}
						requestedTimeZone={"UTC"}
					/>
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("4:30 PM"), true)}
			</TestWrapper>,
		);
	});

	it("shows timezone if requested without AMPM", () => {
		timezoneChange("UTC");
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker
						showAMPM={false}
						onChange={updater}
						value={"4:31 pm"}
						showTimeZone={true}
						requestedTimeZone={"UTC"}
					/>
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("16:30 PM"), true, false)}
			</TestWrapper>,
		);
	});
	it("shows local timezone if requested without AMPM", () => {
		timezoneChange("UTC");
		expect(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"4:31 pm"} showTimeZone={true} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				{buildExpectedTime(parseTime("16:30 PM"), true, false)}
			</TestWrapper>,
		);
	});

	it("shows local timezone if requested without AMPM", () => {
		timezoneChange("America/Santiago");
		expect(
			<TestWrapper
				provider={{ store: storeWithoutCorrectTimezone }}
				stylesProvider
				muiThemeProvider={{ theme }}
				intlProvider={{ messages }}
			>
				<div>
					<TimePicker showAMPM={false} onChange={updater} value={"4:31 pm"} showTimeZone={true} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper
				provider={{ store: storeWithoutCorrectTimezone }}
				stylesProvider
				muiThemeProvider={{ theme }}
				intlProvider={{ messages }}
			>
				{buildExpectedTime(parseTime("16:30 PM"), true, false)}
			</TestWrapper>,
		);
	});

	it("should render with browser AMPM", () => {
		const component = mount(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker value="00:00" />
				</div>
			</TestWrapper>,
		);

		const select = component.find("select");
		expect(select.length, "to equal", 3);
	});

	it("should update time with 12am", () => {
		const onChangeMock = jest.fn();
		const event = {
			preventDefault() {},
			target: { value: "12" },
		};
		const component = mount(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={onChangeMock} value="00:00" />
				</div>
			</TestWrapper>,
		);

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
		const component = mount(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={onChangeMock} value="22:00" />
				</div>
			</TestWrapper>,
		);

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
		const component = mount(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={false} onChange={onChangeMock} value="22:00" />
				</div>
			</TestWrapper>,
		);

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
		const component = mount(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={onChangeMock} value="22:00" />
				</div>
			</TestWrapper>,
		);

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
		const component = mount(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={onChangeMock} value="22:00" />
				</div>
			</TestWrapper>,
		);

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
		const component = mount(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={onChangeMock} value="10:00" />
				</div>
			</TestWrapper>,
		);

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
		const component = mount(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} />
				</div>
			</TestWrapper>,
		);

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
		const component = mount(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={onChangeMock} />
				</div>
			</TestWrapper>,
		);

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
		const component = mount(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={onChangeMock} />
				</div>
			</TestWrapper>,
		);

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
		const component = mount(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }} intlProvider={{ messages }}>
				<div>
					<TimePicker showAMPM={true} onChange={onChangeMock} />
				</div>
			</TestWrapper>,
		);

		const select = component.find("select");
		expect(select.length, "to equal", 3);

		select.at(0).simulate("change", event);
		select.at(1).simulate("change", event);
		select.at(2).simulate("change", eventAMPM);
		expect(onChangeMock.mock.calls.length, "to equal", 3);
	});
});
