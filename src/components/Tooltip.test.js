import React from "react";
import Text from "./Text";
import Tooltip, { TooltipBubble } from "./Tooltip";

describe("Tooltip", () => {
	it("renders a small text message in a popup tip bubble", () =>
		expect(
			<Tooltip message="A tip" />,
			"when mounted",
			"to satisfy",
			<TooltipBubble>
				<Text message="A tip" />
			</TooltipBubble>,
		));
});
