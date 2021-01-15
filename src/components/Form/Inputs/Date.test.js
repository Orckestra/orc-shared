import React from "react";
import { IntlProvider } from "react-intl";
import { Ignore } from "unexpected-reaction";
import sinon from "sinon";
import { DateInput } from "./Date";

describe("DateInput", () => {
	let update;
	beforeEach(() => {
		update = sinon.spy().named("update");
	});

	it("renders a three-part date input", () =>
		expect(
			<IntlProvider locale="en">
				<DateInput update={update} value="2020/06/30" otherProp />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider locale="en-US">
				<label>
					<div className="react-datepicker-wrapper">
						<div className="react-datepicker__input-container">
							<input value="06/30/2020" onChange={() => {}} />
						</div>
					</div>
					<Ignore />
				</label>
			</IntlProvider>,
		));
});
