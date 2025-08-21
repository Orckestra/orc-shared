import React from "react";
import Anchor from "./Anchor";

describe("Anchor", () => {
	it("renders a closed menu anchor", () => {
		expect(
			<Anchor menuLabel="A Label" />,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to contain", "color: rgba(0, 0, 0, 0.38);"),
		);
	});

	it("renders an open menu anchor", () =>
		expect(
			<Anchor open menuLabel="A Label" />,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to contain", "color: #7986cb;"),
		));
});
