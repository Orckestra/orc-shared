import React from "react";
import { Root, Leaf } from "./Leaf";

describe("Root", () => {
	it("renders a <li>", () => expect(<Root />, "when mounted", "to satisfy", <li />));
});

describe("Leaf", () => {
	it("renders a <li>", () => expect(<Leaf />, "when mounted", "to satisfy", <li />));

	it("renders a dark <li>", () => expect(<Leaf dark />, "when mounted", "to satisfy", <li />));
});
