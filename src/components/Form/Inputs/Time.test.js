import React from "react";
import { IntlProvider } from "react-intl";
import { ButtonWrapper } from "./FieldButtons";
import { FormInput } from "./Text";
import { TimeInput, TimeIcon, TimeButton } from "./Time";

describe("TimeInput", () => {
	it("renders a basic time input, preliminary", () =>
		expect(
			<IntlProvider locale="en">
				<TimeInput update={() => {}} otherProp />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<ButtonWrapper>
				<IntlProvider locale="en">
					<FormInput
						type="time"
						onChange={expect.it("to be a function")}
						otherProp
					/>
				</IntlProvider>
				<TimeButton>
					<TimeIcon />
				</TimeButton>
			</ButtonWrapper>,
		));

	it("renders a required time input with invalid value", () =>
		expect(
			<IntlProvider locale="en">
				<TimeInput update={() => {}} otherProp required />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<ButtonWrapper invalid>
				<IntlProvider locale="en">
					<FormInput
						type="time"
						onChange={expect.it("to be a function")}
						otherProp
					/>
				</IntlProvider>
				<TimeButton>
					<TimeIcon />
				</TimeButton>
			</ButtonWrapper>,
		));
});
