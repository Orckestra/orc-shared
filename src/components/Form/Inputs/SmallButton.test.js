import React from "react";
import Tooltip from "../../Tooltip";
import { SmallButton, RoundButton, ButtonIcon } from "./SmallButton";

describe("SmallButton", () => {
	let update;
	beforeEach(() => {
		update = () => {};
	});

	it("renders a small button showing an icon", () =>
		expect(
			<SmallButton
				id="testId"
				update={update}
				icon="test-icon"
				altText="Alternative"
				otherProp
			/>,
			"when mounted",
			"to satisfy",
			<RoundButton id="testId" otherProp onClick={update}>
				<ButtonIcon id="test-icon" />
				<Tooltip message="Alternative" />
			</RoundButton>,
		));

	it("adds an ugly default alt text if none given, shaming the dev", () =>
		expect(
			<SmallButton id="testId" icon="test-icon" />,
			"when mounted",
			"to satisfy",
			<RoundButton id="testId">
				<ButtonIcon id="test-icon" />
				<Tooltip message="[altText]" />
			</RoundButton>,
		));
});
