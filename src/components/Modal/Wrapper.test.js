import React from "react";
import Wrapper from "./Wrapper";

describe("Wrapper", () => {
	it("sets transition time according to its timeout", () =>
		expect(
			<Wrapper in timeout={500} />,
			"to render style rules",
			"to contain",
			"transition: opacity 500ms ease-out !important;",
		));
});
