import React from "react";
import { Ignore } from "unexpected-reaction";
import sinon from "sinon";
import { DateInput } from "./Date";
import { TestWrapper, createMuiTheme } from "./../../../utils/testUtils";

describe("DateInput", () => {
	let update;
	beforeEach(() => {
		update = sinon.spy().named("update");
	});

	const theme = createMuiTheme();

	it("renders a three-part date input", () =>
		expect(
			<TestWrapper intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<DateInput update={update} value="2020/06/30" otherProp />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<label>
					<div>
						<div className="react-datepicker-wrapper">
							<div className="react-datepicker__input-container">
								<input value="06/30/2020" onChange={() => {}} />
							</div>
						</div>
					</div>
					<div>
						<Ignore />
					</div>
				</label>
			</TestWrapper>,
		));
});
