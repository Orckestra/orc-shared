import React from "react";
import styled from "styled-components";
import { getClassName, PropStruct, firstItemComparator } from "./testUtils";

const TestComp = ({ children, id = "tc1", ...props }) => (
	<div id={id} {...props}>
		{children}
	</div>
);
class TestComp2 extends React.Component {
	render() {
		return <TestComp id="tc2" />;
	}
}
const TestStyled = styled.div`
	color: red;
`;

describe("getClassName", () => {
	it("finds the first class name of the root element given to it", () =>
		expect(getClassName(<TestComp className="foo bar" />), "to equal", "foo"));

	it("can find later-index class names of the root element given to it", () =>
		expect(
			getClassName(<TestComp className="foo bar" />, 1),
			"to equal",
			"bar",
		));

	it("works with svg elements", () =>
		expect(getClassName(<svg className="foo bar" />), "to equal", "foo"));

	it("works with styled components", () =>
		expect(getClassName(<TestStyled />), "to match", /__TestStyled-/));

	it("throws an error if no class found", () =>
		expect(
			() => getClassName(<div />),
			"to throw",
			"Class name not found in <div />",
		));

	it("throws an error if no class found", () =>
		expect(
			() => getClassName(<TestComp />),
			"to throw",
			"Class name not found in <TestComp />",
		));
});

describe("PropStruct", () => {
	it("leaves out null or undefined props", () =>
		expect(
			<PropStruct nil={null} undef={undefined} />,
			"when mounted",
			"to satisfy",
			<dl></dl>,
		));

	it("handles simple primitive types", () =>
		expect(
			<PropStruct str="foo" num={1} bool={true} />,
			"when mounted",
			"to satisfy",
			<dl>
				<dt>bool:</dt>
				<dd>boolean true</dd>
				<dt>num:</dt>
				<dd>number 1</dd>
				<dt>str:</dt>
				<dd>string "foo"</dd>
			</dl>,
		));

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

	it('handles prop "children" specially', () =>
		expect(
			<PropStruct foo="bar">
				<TestComp />
				<TestComp2 />
			</PropStruct>,
			"when mounted",
			"to satisfy",
			<dl>
				<dt>children:</dt>
				<dd>
					<div id="tc1" />
					<div id="tc2" />
				</dd>
				<dt>foo:</dt>
				<dd>string "bar"</dd>
			</dl>,
		));

	it("handles object props", () =>
		expect(
			<PropStruct obj={{ foo: true, bar: "false" }} />,
			"when mounted",
			"to satisfy",
			<dl>
				<dt>obj:</dt>
				<dd>
					<dl>
						<dt>bar:</dt>
						<dd>string "false"</dd>
						<dt>foo:</dt>
						<dd>boolean true</dd>
					</dl>
				</dd>
			</dl>,
		));

	it("handles function props (if poorly)", () =>
		expect(
			<PropStruct func={() => {}} />,
			"when mounted",
			"to satisfy",
			<dl>
				<dt>func:</dt>
				<dd>Function</dd>
			</dl>,
		));

	it("can ignore props", () =>
		expect(
			<PropStruct alpha="yes" beta="__ignore" gamma="no" />,
			"when mounted",
			"to satisfy",
			"<dl>" +
				"<dt>alpha:</dt>" +
				'<dd>string "yes"</dd>' +
				"<!-- ignore -->" +
				"<!-- ignore -->" +
				"<dt>gamma:</dt>" +
				'<dd>string "no"</dd>' +
				"</dl>",
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
