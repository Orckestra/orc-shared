import React from "react";
import { IntlProvider } from "react-intl";
import DatePicker from "./DatePicker";
import { Ignore } from "unexpected-reaction";
import { mount } from "enzyme";
import sinon from "sinon";
import Grid from "@material-ui/core/Grid";
import Icon from "../../Icon";

describe("DatePicker", () => {
	let updater;
	beforeEach(() => {
		updater = sinon.spy().named("updater");
	});

	it("sets up a date to locale (en-US)", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<DatePicker onChange={updater} value={"2020/06/30"} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en-US">
				<div>
					<label>
						<Grid>
							<div className="react-datepicker-wrapper">
								<div className="react-datepicker__input-container">
									<input value="06/30/2020" onChange={() => {}} />
								</div>
							</div>
						</Grid>
						<Grid>
							<Icon id="calendar-date" />
						</Grid>
					</label>
				</div>
			</IntlProvider>,
		));

	it("sets up a default date to locale (en-US)", () =>
		expect(
			<IntlProvider locale="en-US">
				<div>
					<DatePicker onChange={updater} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en-US">
				<div>
					<label>
						<Grid>
							<div className="react-datepicker-wrapper">
								<div className="react-datepicker__input-container">
									<input value="01/01/1970" onChange={() => {}} />
								</div>
							</div>
						</Grid>
						<Grid>
							<Icon id="calendar-date" />
						</Grid>
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
					<DatePicker useTime={true} onChange={updater} value={date} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en-US">
				<div>
					<label>
						<Grid>
							<div className="react-datepicker-wrapper">
								<div className="react-datepicker__input-container">
									<input value={expectedDate} onChange={() => {}} />
								</div>
							</div>
						</Grid>
						<Grid>
							<Icon id="calendar-date" />
						</Grid>
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
					<DatePicker useTime={true} onChange={updater} value={date} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en-US">
				<div>
					<label>
						<Grid>
							<div className="react-datepicker-wrapper">
								<div className="react-datepicker__input-container">
									<input value={expectedDate} onChange={() => {}} />
								</div>
							</div>
						</Grid>
						<Grid>
							<Icon id="calendar-date" />
						</Grid>
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
					<DatePicker useTime={true} onChange={updater} value={date} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en-US">
				<div>
					<label>
						<Grid>
							<div className="react-datepicker-wrapper">
								<div className="react-datepicker__input-container">
									<input value={expectedDate} onChange={() => {}} />
								</div>
							</div>
						</Grid>
						<Grid>
							<Icon id="calendar-date" />
						</Grid>
					</label>
				</div>
			</IntlProvider>,
		);
	});

	it("sets up only time to locale with time 12am (en-US)", () => {
		const date = new Date("2020-06-30T00:00:00");
		const expectedTime = "12:00 AM";
		expect(
			<IntlProvider locale="en-US">
				<div>
					<DatePicker useTime={true} useDate={false} onChange={updater} value={date} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en-US">
				<div>
					<label>
						<Grid>
							<div className="react-datepicker-wrapper">
								<div className="react-datepicker__input-container">
									<input value={expectedTime} onChange={() => {}} />
								</div>
							</div>
						</Grid>
						<Grid>
							<Icon id="calendar-date" />
						</Grid>
					</label>
				</div>
			</IntlProvider>,
		);
	});

	it("sets up a date to locale with time 12am when read only (en-US)", () => {
		const date = new Date("2020-06-30T00:00:00");
		const expectedDate = "06/30/2020 12:00 AM";
		expect(
			<IntlProvider locale="en-US">
				<div>
					<DatePicker useTime={true} readOnly={true} onChange={updater} value={date} />
				</div>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en-US">
				<div>
					<label>
						<Grid>
							<div className="react-datepicker-wrapper">
								<div className="react-datepicker__input-container">
									<input value={expectedDate} onChange={() => {}} />
								</div>
							</div>
						</Grid>
					</label>
				</div>
			</IntlProvider>,
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
