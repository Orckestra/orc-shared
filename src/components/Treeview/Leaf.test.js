import React from "react";
import { Root, Leaf } from "./Leaf";

describe("Root", () => {
	it("renders a <li>", () =>
		expect(<Root />, "when mounted", "to satisfy", <li />));
});

describe("Leaf", () => {
	it("renders a <Root>", () =>
		expect(<Leaf />, "when mounted", "to satisfy", <Root />));

	it("sets styling for a branch structure", () =>
		expect(
			<Leaf
				theme={{
					treeSettings: {
						branchIndent: 10,
						branchLength: 12,
						branchHeight: 14,
					},
				}}
			/>,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to match", /:last-child::after {[^}]*left: -13px;[^}]*}/),
		));
});
