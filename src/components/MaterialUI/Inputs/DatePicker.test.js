import React from "react";
import DatePicker, { createFormat } from "./DatePicker";
import { mount } from "enzyme";
import sinon from "sinon";
import Icon from "../DataDisplay/Icon";
import { TestWrapper, createMuiTheme } from "./../../../utils/testUtils";
import Immutable from "immutable";

describe("DatePicker", () => {
	let updater, state, store;
	beforeEach(() => {
		updater = sinon.spy().named("updater");

		state = Immutable.fromJS({
			locale: {
				locale: "en-CA",
			},
		});

		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
	});

	const theme = createMuiTheme();

	it("sets up a date to locale (en-US)", () =>
		expect(
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<DatePicker onChange={updater} value={"2020/06/30"} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<label>
						<div>
							<div className="react-datepicker-wrapper">
								<div className="react-datepicker__input-container">
									<input value="06/30/2020" onChange={() => {}} />
								</div>
							</div>
						</div>
						<div>
							<Icon id="calendar-date" />
						</div>
					</label>
				</div>
			</TestWrapper>,
		));

	it("sets up a default empty date", () =>
		expect(
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<DatePicker onChange={updater} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<label>
						<div>
							<div className="react-datepicker-wrapper">
								<div className="react-datepicker__input-container">
									<input value="" onChange={() => {}} />
								</div>
							</div>
						</div>
						<div>
							<Icon id="calendar-date" />
						</div>
					</label>
				</div>
			</TestWrapper>,
		));

	it("sets up a date to locale with time 5am (en-US)", () => {
		const date = new Date("2020-06-30T05:00:00");
		const expectedDate = "06/30/2020 5:00 AM";
		expect(
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<DatePicker useTime={true} onChange={updater} value={date} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<label>
						<div>
							<div className="react-datepicker-wrapper">
								<div className="react-datepicker__input-container">
									<input value={expectedDate} onChange={() => {}} />
								</div>
							</div>
						</div>
						<div>
							<Icon id="calendar-date" />
						</div>
					</label>
				</div>
			</TestWrapper>,
		);
	});

	it("sets up a date to locale with time 5pm (en-US)", () => {
		const date = new Date("2020-06-30T17:00:00");
		const expectedDate = "06/30/2020 5:00 PM";
		expect(
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<DatePicker useTime={true} onChange={updater} value={date} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<label>
						<div>
							<div className="react-datepicker-wrapper">
								<div className="react-datepicker__input-container">
									<input value={expectedDate} onChange={() => {}} />
								</div>
							</div>
						</div>
						<div>
							<Icon id="calendar-date" />
						</div>
					</label>
				</div>
			</TestWrapper>,
		);
	});

	it("sets up a date to locale with time 12am (en-US)", () => {
		const date = new Date("2020-06-30T00:00:00");
		const expectedDate = "06/30/2020 12:00 AM";
		expect(
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<DatePicker useTime={true} onChange={updater} value={date} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<label>
						<div>
							<div className="react-datepicker-wrapper">
								<div className="react-datepicker__input-container">
									<input value={expectedDate} onChange={() => {}} />
								</div>
							</div>
						</div>
						<div>
							<Icon id="calendar-date" />
						</div>
					</label>
				</div>
			</TestWrapper>,
		);
	});

	it("should render error", () => {
		const date = new Date("2020-06-30T00:00:00");
		const expectedDate = "06/30/2020 12:00 AM";
		expect(
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<DatePicker useTime={true} onChange={updater} value={date} error="some error" />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<label>
						<div>
							<div className="react-datepicker-wrapper">
								<div className="react-datepicker__input-container">
									<input value={expectedDate} onChange={() => {}} />
								</div>
							</div>
						</div>
						<div>
							<Icon id="calendar-date" />
						</div>
					</label>
					<div>{"some error"}</div>
				</div>
			</TestWrapper>,
		);
	});

	it("sets up only time to locale with time 12am (en-US)", () => {
		const date = new Date("2020-06-30T00:00:00");
		const expectedTime = "12:00 AM";
		expect(
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<DatePicker useTime={true} useDate={false} onChange={updater} value={date} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<label>
						<div>
							<div className="react-datepicker-wrapper">
								<div className="react-datepicker__input-container">
									<input value={expectedTime} onChange={() => {}} />
								</div>
							</div>
						</div>
						<div>
							<Icon id="calendar-date" />
						</div>
					</label>
				</div>
			</TestWrapper>,
		);
	});

	it("sets up only time to locale with time 12am (en-US) and show only time select", () => {
		const date = new Date("2020-06-30T00:00:00");
		const expectedTime = "12:00 AM";
		expect(
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<DatePicker useTime={true} useDate={false} onChange={updater} value={date} showTimeSelectOnly={true} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<label>
						<div>
							<div className="react-datepicker-wrapper">
								<div className="react-datepicker__input-container">
									<input value={expectedTime} onChange={() => {}} />
								</div>
							</div>
						</div>
						<div>
							<Icon id="clock" />
						</div>
					</label>
				</div>
			</TestWrapper>,
		);
	});

	it("sets up a date to locale with time 12am when read only (en-US)", () => {
		const date = new Date("2020-06-30T00:00:00");
		const expectedDate = "06/30/2020 12:00 AM";
		expect(
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<DatePicker useTime={true} readOnly={true} onChange={updater} value={date} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<label>
						<div>
							<div className="react-datepicker-wrapper">
								<div className="react-datepicker__input-container">
									<input value={expectedDate} onChange={() => {}} />
								</div>
							</div>
						</div>
					</label>
				</div>
			</TestWrapper>,
		);
	});

	it("should call onChange prop", () => {
		const onChangeMock = jest.fn();
		const date = new Date("2020-06-30T00:00:00");
		const event = {
			preventDefault() {},
			target: { value: "" },
		};

		const component = (
			<TestWrapper provider={{ store }}>
				<DatePicker onChange={onChangeMock} value={date} />
			</TestWrapper>
		);
		const mountedComponent = mount(component);

		const input = mountedComponent.find("input");
		expect(input.length, "to equal", 1);

		input.at(0).simulate("change", event);
		expect(onChangeMock.mock.calls.length, "to equal", 1);
	});

	it("should update with no onChange prop", () => {
		const event = {
			preventDefault() {},
			target: { value: "" },
		};
		const date = new Date("2020-06-30T00:00:00");

		const component = (
			<TestWrapper provider={{ store }}>
				<DatePicker value={date} />
			</TestWrapper>
		);
		const mountedComponent = mount(component);

		const input = mountedComponent.find("input");
		expect(input.length, "to equal", 1);

		input.at(0).simulate("change", event);
	});
});

describe("createFormat", () => {
	it("Retrieves proper format if locale is in AMPMLocales list for date and time", () => {
		const locale1 = "en-CA";
		const locale2 = "en-US";

		expect(createFormat(true, true, locale1), "to equal", "P p");
		expect(createFormat(true, true, locale2), "to equal", "P p");
	});

	it("Retrieves proper format if locale is in AMPMLocales list for date", () => {
		const locale1 = "en-CA";
		const locale2 = "en-US";

		expect(createFormat(true, false, locale1), "to equal", "P");
		expect(createFormat(true, false, locale2), "to equal", "P");
	});

	it("Retrieves proper format if locale is in AMPMLocales list for time", () => {
		const locale1 = "en-CA";
		const locale2 = "en-US";

		expect(createFormat(false, true, locale1), "to equal", "p");
		expect(createFormat(false, true, locale2), "to equal", "p");
	});

	it("Retrieves proper format if locale is not in AMPMLocales list for date and time", () => {
		expect(createFormat(true, true, "fr-CA"), "to equal", "P HH:mm");
	});

	it("Retrieves proper format if locale is not in AMPMLocales list for date", () => {
		expect(createFormat(true, false, "fr-CA"), "to equal", "P");
	});

	it("Retrieves proper format if locale is not in AMPMLocales list for time", () => {
		expect(createFormat(false, true, "fr-CA"), "to equal", "HH:mm");
	});

	it("Retrieves date and time in 24h system by default", () => {
		expect(createFormat(), "to equal", "P HH:mm");
	});
});
