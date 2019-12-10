import React from "react";
import { PropStruct, firstItemComparator } from "./testUtils";

const TestComp = () => <div />;
class TestComp2 extends React.Component {
	render() {
		return <TestComp />;
	}
}

describe("PropStruct", () => {
	it("handles symbols", () =>
		expect(
			<PropStruct symbol={Symbol("foo")} />,
			"when mounted",
			"to satisfy",
			<dl>
				<dt>symbol:</dt>
				<dd>symbol Symbol(foo)</dd>
			</dl>,
		));

	it("handles React DOM elements", () =>
		expect(
			<PropStruct elem={<div />} />,
			"when mounted",
			"to satisfy",
			<dl>
				<dt>elem:</dt>
				<dd>React &lt;div&gt;</dd>
			</dl>,
		));

	it("handles React function component elements", () =>
		expect(
			<PropStruct elem={<TestComp />} />,
			"when mounted",
			"to satisfy",
			<dl>
				<dt>elem:</dt>
				<dd>React &lt;TestComp&gt;</dd>
			</dl>,
		));

	it("handles React class component elements", () =>
		expect(
			<PropStruct elem={<TestComp2 />} />,
			"when mounted",
			"to satisfy",
			<dl>
				<dt>elem:</dt>
				<dd>React &lt;TestComp2&gt;</dd>
			</dl>,
		));

	describe("comparator", () => {
		it("compares the first element of arrays, a > b", () =>
			expect(
				firstItemComparator,
				"called with",
				[
					[1, 0],
					[0, 1],
				],
				"to equal",
				1,
			));

		it("compares the first element of arrays, a < b", () =>
			expect(
				firstItemComparator,
				"called with",
				[
					[0, 1],
					[1, 0],
				],
				"to equal",
				-1,
			));

		it("compares the first element of arrays, a = b", () =>
			expect(
				firstItemComparator,
				"called with",
				[
					[1, 0],
					[1, 1],
				],
				"to equal",
				0,
			));
	});
});
