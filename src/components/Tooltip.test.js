import React from "react";
import { Provider } from "react-redux";
import Tooltip, { TooltipBubble } from "./Tooltip";

describe("Tooltip", () => {
	it("renders a small text message in a popup tip bubble", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Tooltip message="A tip" />
			</Provider>,
			"when mounted",
			"to satisfy",
			<TooltipBubble>A tip</TooltipBubble>,
		));
});
