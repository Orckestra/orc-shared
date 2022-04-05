import React from "react";
import { Ignore } from "unexpected-reaction";
import sinon from "sinon";
import { DateInput } from "./Date";
import { TestWrapper, createMuiTheme } from "./../../../utils/testUtils";
import Immutable from "immutable";

describe("DateInput", () => {
	let update, state, store;
	beforeEach(() => {
		update = sinon.spy().named("update");

		state = Immutable.fromJS({
			locale: {
				locale: "en-CA",
			},
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
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
	});

	const theme = createMuiTheme();

	it("renders a three-part date input", () =>
		expect(
			<TestWrapper provider={{ store }} intlProvider stylesProvider muiThemeProvider={{ theme }}>
				<DateInput update={update} value="2020/06/30" otherProp />
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
							<Ignore />
						</div>
					</label>
				</div>
			</TestWrapper>,
		));
});
