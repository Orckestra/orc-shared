import React from "react";
import { Root, Leaf } from "./Leaf";

describe("Root", () => {
	it("renders a <li>", () => expect(<Root />, "when mounted", "to satisfy", <li />));
});

describe("Leaf", () => {
	it("renders a <li>", () => expect(<Leaf />, "when mounted", "to satisfy", <li />));

	it("sets styling for a branch structure", () =>
		expect(
			<Leaf />,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to match", /:last-child::after {[^}]*left: -16px;[^}]*}/),
		));
});
