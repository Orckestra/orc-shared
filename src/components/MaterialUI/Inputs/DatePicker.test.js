import React from "react";
import DatePicker from "./DatePicker";
import { mount } from "enzyme";
import sinon from "sinon";
import Icon from "../../Icon";
import { TestWrapper, createMuiTheme } from "./../../../utils/testUtils";

describe("DatePicker", () => {
	let updater;
	beforeEach(() => {
		updater = sinon.spy().named("updater");
	});

	const theme = createMuiTheme();

	it("sets up a date to locale (en-US)", () =>
		expect(
			<TestWrapper intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<DatePicker onChange={updater} value={"2020/06/30"} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper intlProvider stylesProvider muiThemeProvider={{ theme }}>
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

	it("sets up a default date to locale (en-US)", () =>
		expect(
			<TestWrapper intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<DatePicker onChange={updater} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<label>
						<div>
							<div className="react-datepicker-wrapper">
								<div className="react-datepicker__input-container">
									<input value="01/01/1970" onChange={() => {}} />
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
			<TestWrapper intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<DatePicker useTime={true} onChange={updater} value={date} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper intlProvider stylesProvider muiThemeProvider={{ theme }}>
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
			<TestWrapper intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<DatePicker useTime={true} onChange={updater} value={date} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper intlProvider stylesProvider muiThemeProvider={{ theme }}>
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
			<TestWrapper intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<DatePicker useTime={true} onChange={updater} value={date} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper intlProvider stylesProvider muiThemeProvider={{ theme }}>
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

	it("sets up only time to locale with time 12am (en-US)", () => {
		const date = new Date("2020-06-30T00:00:00");
		const expectedTime = "12:00 AM";
		expect(
			<TestWrapper intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<DatePicker useTime={true} useDate={false} onChange={updater} value={date} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper intlProvider stylesProvider muiThemeProvider={{ theme }}>
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

	it("sets up a date to locale with time 12am when read only (en-US)", () => {
		const date = new Date("2020-06-30T00:00:00");
		const expectedDate = "06/30/2020 12:00 AM";
		expect(
			<TestWrapper intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<DatePicker useTime={true} readOnly={true} onChange={updater} value={date} />
				</div>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper intlProvider stylesProvider muiThemeProvider={{ theme }}>
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
		const event = {
			preventDefault() {},
			target: { value: "" },
		};
		const component = mount(<DatePicker onChange={onChangeMock} />);

		const input = component.find("input");
		expect(input.length, "to equal", 1);

		input.at(0).simulate("change", event);
		expect(onChangeMock.mock.calls.length, "to equal", 1);
	});

	it("should update with no onChange prop", () => {
		const event = {
			preventDefault() {},
			target: { value: "" },
		};
		const component = mount(<DatePicker />);

		const input = component.find("input");
		expect(input.length, "to equal", 1);

		input.at(0).simulate("change", event);
	});
});
