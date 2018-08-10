import React from "react";
import Text from "../../Text";
import { SmallButton, RoundButton, ButtonIcon, Tooltip } from "./SmallButton";

describe("SmallButton", () => {
	let update;
	beforeEach(() => {
		update = () => {};
	});

	it("renders a small button showing an icon", () =>
		expect(
			<SmallButton
				update={update}
				icon="test-icon"
				altText="Alternative"
				otherProp
			/>,
			"to render as",
			<RoundButton otherProp onClick={update}>
				<ButtonIcon id="test-icon" />
				<Tooltip>
					<Text message="Alternative" />
				</Tooltip>
			</RoundButton>,
		));
});
