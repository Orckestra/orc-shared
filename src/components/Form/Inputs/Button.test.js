import React from "react";
import Text from "../../Text";
import { FormButton, PositionedButton, ButtonIcon } from "./Button";

describe("FormButton", () => {
	let update;
	beforeEach(() => {
		update = () => {};
	});

	it("renders a button showing an icon", () =>
		expect(
			<FormButton id="testId" update={update} icon="test-icon" otherProp />,
			"to render with all children as",
			<PositionedButton id="testId" otherProp onClick={update}>
				<ButtonIcon id="test-icon" />
			</PositionedButton>,
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
			<PositionedButton id="testId" otherProp onClick={update}>
				<Text message="Push this" />
			</PositionedButton>,
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
			<PositionedButton id="testId" otherProp onClick={update}>
				<ButtonIcon id="test-icon" />
				<Text message="Push this" />
			</PositionedButton>,
		));
});
