import React from "react";
import { getClassSelector, getStyledClassSelector } from "../utils/testUtils";
import ColumnWrapper from "./ColumnWrapper";

describe("ColumnWrapper", () => {
	it("sets flex and flex direction", () =>
		expect(
			<ColumnWrapper />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "flex: 0 1 100%;")
				.and("to contain", "flex-direction: column;"),
		));
});
