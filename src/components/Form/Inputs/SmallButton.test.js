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
			"to render as",
			<RoundButton id="testId" otherProp onClick={update}>
				<ButtonIcon id="test-icon" />
				<Tooltip htmlFor="testId" message="Alternative" />
			</RoundButton>,
		));
});
