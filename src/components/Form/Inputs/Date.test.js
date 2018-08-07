import React from "react";
import { ButtonWrapper } from "./FieldButtons";
import { FormInput } from "./Text";
import { DateInput, CalendarIcon, CalendarButton } from "./Date";

describe("DateInput", () => {
	it("renders a basic date input, preliminary", () =>
		expect(
			<DateInput update={() => {}} otherProp />,
			"to render as",
			<ButtonWrapper>
				<FormInput
					type="date"
					onChange={expect.it("to be a function")}
					otherProp
				/>
				<CalendarButton>
					<CalendarIcon />
				</CalendarButton>
			</ButtonWrapper>,
		));
});
