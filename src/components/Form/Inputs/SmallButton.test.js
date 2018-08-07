import React from "react";
import SmallButton, { RoundButton, ButtonIcon } from "./SmallButton";

describe("SmallButton", () => {
	let update;
	beforeEach(() => {
		update = () => {};
	});

	it("renders a small button showing an icon", () =>
		expect(
			<SmallButton update={update} icon="test-icon" otherProp />,
			"to render as",
			<RoundButton primary otherProp onClick={update}>
				<ButtonIcon id="test-icon" />
			</RoundButton>,
		));
});
