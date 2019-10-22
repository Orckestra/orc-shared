import React from "react";
import { FormButton, PositionedButton } from "./Button";

describe("FormButton", () => {
	let update;
	beforeEach(() => {
		update = () => {};
	});

	it("renders a button showing an icon", () =>
		expect(
			<FormButton id="testId" update={update} icon="test-icon" otherProp />,
			"to render with all children as",
			<PositionedButton
				id="testId"
				otherProp
				onClick={update}
				icon="test-icon"
			/>,
		));

	it("renders a button showing a text", () =>
		expect(
			<FormButton
				id="testId"
				update={update}
				buttonText="Push this"
				otherProp
			/>,
			"to render with all children as",
			<PositionedButton
				id="testId"
				otherProp
				onClick={update}
				label="Push this"
			/>,
		));

	it("renders a button showing both an icon and a text", () =>
		expect(
			<FormButton
				id="testId"
				update={update}
				icon="test-icon"
				buttonText="Push this"
				otherProp
			/>,
			"to render with all children as",
			<PositionedButton
				id="testId"
				otherProp
				onClick={update}
				icon="test-icon"
				label="Push this"
			/>,
		));
});
