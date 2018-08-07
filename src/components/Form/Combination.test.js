import React from "react";
import Field from "./Field";
import Combination, { CombiningRow } from "./Combination";

describe("Combination", () => {
	it("renders a combining box around a list of fields", () =>
		expect(
			<Combination label="A combination" proportions={[30, 70]}>
				<div id="child1" />
				<div id="child2" />
			</Combination>,
			"to render as",
			<Field label="A combination">
				<CombiningRow proportions={[30, 70]}>
					<div id="child1" />
					<div id="child2" />
				</CombiningRow>
			</Field>,
		));

	it("handles missing props", () =>
		expect(
			<Combination>
				<div id="child1" />
				<div id="child2" />
			</Combination>,
			"to render as",
			<Field label={undefined}>
				<CombiningRow proportions={[]}>
					<div id="child1" />
					<div id="child2" />
				</CombiningRow>
			</Field>,
		));
});

describe("CombiningRow", () => {
	it("sets flex rules on its children to control their proportions", () =>
		expect(
			<CombiningRow proportions={[50, undefined, "70px"]} />,
			"to render style rules",
		).then(styles =>
			expect(styles, "to match", /:nth-child\(1\) \{[^{]*flex: 0 1 50%;/)
				.and("not to match", /:nth-child\(2\)/)
				.and("to match", /:nth-child\(3\) \{[^{]*flex: 0 0 70px;/),
		));
});
