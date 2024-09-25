import React from "react";
import styled from "styled-components";
import { defineMessages } from "react-intl";
import {
	getElmClasses,
	getClassName,
	getStyledClassSelector,
	getClassSelector,
	PropStruct,
	firstItemComparator,
	spyOnConsole,
	ignoreConsoleError,
	createMuiTheme,
	generateClassName,
	extractMessages,
} from "./testUtils";

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

describe("class name helpers", () => {
	const TestStyled = styled.div`
		color: red;
	`;
	const DerivedTestStyled = styled(TestStyled)`
		color: blue;
	`;

	spyOnConsole(["error"]);

	describe("getElmClasses", () => {
		it("finds all class names of an element", () =>
			expect(getElmClasses, "when called with", [<TestComp className="foo bar" />], "to equal", ["foo", "bar"]));

		it("works with svg elements", () =>
			expect(getElmClasses, "when called with", [<svg className="foo bar" />], "to equal", ["foo", "bar"]));

		it("works with styled components", () =>
			expect(
				getElmClasses,
				"when called with",
				[<TestStyled />],
				"to have an item satisfying",
				"to match",
				/__TestStyled-/,
			));

		it("throws an error if no class found on DOM element", () =>
			expect(
				() => expect(getElmClasses, "when called with", [<div />]),
				"to throw",
				"Class name not found in <div />",
			));

		it("throws an error if no class found on component", () =>
			expect(
				() => expect(getElmClasses, "when called with", [<TestComp />]),
				"to throw",
				"Class name not found in <TestComp />",
			));

		it("throws an error if no class found on SVG element", () =>
			expect(
				() => expect(getElmClasses, "when called with", [<svg />]),
				"to throw",
				"Class name not found in <svg />",
			));

		it("can use a custom container element type", () => {
			expect(getElmClasses, "when called with", [<td className="foo bar" />, "tr"], "to equal", ["foo", "bar"]);
			expect(console.error, "was not called");
		});
	});

	describe("getClassName", () => {
		it("finds the first class name of the root element given to it", () =>
			expect(getClassName, "when called with", [<TestComp className="foo bar" />], "to equal", "foo"));

		it("can find later-index class names of the root element given to it", () =>
			expect(getClassName, "when called with", [<TestComp className="foo bar" />, 1], "to equal", "bar"));

		it("returns empty string if index out of bounds", () =>
			expect(getClassName, "when called with", [<TestComp className="foo bar" />, 3], "to equal", ""));

		it("works with svg elements", () =>
			expect(getClassName, "when called with", [<svg className="foo bar" />], "to equal", "foo"));

		it("works with styled components", () =>
			expect(getClassName, "when called with", [<TestStyled />], "to match", /__TestStyled-/));

		it("can use a custom container element type", () => {
			expect(getClassName(<td className="foo bar" />, 0, "tr"), "to equal", "foo");
			expect(console.error, "was not called");
		});
	});

	describe("getClassSelector", () => {
		it("makes a CSS class selector from the element passed", () =>
			expect(getClassSelector, "when called with", [<TestComp className="foo bar" />], "to equal", ".foo"));

		it("can find later-index class names of the root element given to it", () =>
			expect(getClassSelector, "when called with", [<TestComp className="foo bar" />, 1], "to equal", ".bar"));

		it("returns empty string if index out of bounds", () =>
			expect(getClassSelector, "when called with", [<TestComp className="foo bar" />, 3], "to equal", ""));

		it("works with svg elements", () =>
			expect(getClassSelector, "when called with", [<svg className="foo bar" />], "to equal", ".foo"));

		it("works with styled components", () =>
			expect(getClassSelector, "when called with", [<TestStyled />], "to match", /^\.\S*__TestStyled-/));

		it("can make a selector targeting all classes", () =>
			expect(getClassSelector, "when called with", [<TestComp className="foo bar" />, -1], "to equal", ".foo.bar"));

		it("can use a custom container element type", () => {
			expect(getClassSelector(<td className="foo bar" />, 0, "tr"), "to equal", ".foo");
			expect(console.error, "was not called");
		});
	});

	describe("getStyledClassSelector", () => {
		it("creates a selector for a styled component", () =>
			expect(
				getStyledClassSelector,
				"when called with",
				[<TestStyled />],
				"to match",
				/.*__TestStyled-sc-[0-9a-zA-Z]{6}-[0-9]/,
			));

		it("can use the component function without rendering", () =>
			expect(
				getStyledClassSelector,
				"when called with",
				[TestStyled],
				"to match",
				/.*__TestStyled-sc-[0-9a-zA-Z]{6}-[0-9]/,
			));

		it("finds the most specific class name", () =>
			expect(
				getStyledClassSelector,
				"when called with",
				[<DerivedTestStyled />],
				"to match",
				/.*__DerivedTestStyled-sc-[0-9a-zA-Z]{6}-[0-9]/,
			));

		it("throws an error if not given a non-styled component", () =>
			expect(
				() => expect(getStyledClassSelector, "when called with", [<TestComp />]),
				"to throw",
				"<TestComp /> is not a styled component",
			));

		it("throws an error if not given a DOM primitive", () =>
			expect(
				() => expect(getStyledClassSelector, "when called with", [<div />]),
				"to throw",
				"<div /> is not a styled component",
			));
	});
});

describe("PropStruct", () => {
	it("leaves out null or undefined props", () =>
		expect(<PropStruct nil={null} undef={undefined} />, "when mounted", "to satisfy", <dl></dl>));

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
				<dd>string &quot;foo&quot;</dd>
			</dl>,
		));

	it("maintains id attributes for DOM", () =>
		expect(
			<PropStruct id="testProps" />,
			"when mounted",
			"to satisfy",
			<dl id="testProps">
				<dt>id:</dt>
				<dd>string &quot;testProps&quot;</dd>
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
				<dd>string &quot;bar&quot;</dd>
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
						<dd>string &quot;false&quot;</dd>
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

describe("ignoreConsoleError", () => {
	spyOnConsole(["error"]);
	it("ignores console error", () => {
		const setConsoleError = () => {
			ignoreConsoleError(() => {
				console.error("Error");
			});
		};

		setConsoleError();

		expect(console.error, "was not called");
	});
});

describe("createMuiTheme", () => {
	it("Creates mui theme", () => {
		const theme = createMuiTheme();

		expect(theme != null, "to be true");
	});
});

describe("generateClassName", () => {
	it("Generates proper class name", () => {
		const styleSheet = {
			options: {
				classNamePrefix: "prefix",
			},
		};

		const rule = {
			key: "key",
		};

		const generatedClassname = generateClassName(rule, styleSheet);

		expect(generatedClassname, "to equal", "prefix-key");
	});
});

describe("extractMessages", () => {
	const testMessagesA = defineMessages({
		test1: "test1",
		test2: "test2",
	});

	const testMessagesB = defineMessages({
		test3: "test3",
		test4: "test4",
	});

	it("extracts messages out from one defineMessages", () => {
		expect(extractMessages(testMessagesA), "to equal", {
			"utils.testUtils.test1": "test1",
			"utils.testUtils.test2": "test2",
		});
	});

	it("extracts messages out from two defineMessages", () => {
		expect(extractMessages(testMessagesA, testMessagesB), "to equal", {
			"utils.testUtils.test1": "test1",
			"utils.testUtils.test2": "test2",
			"utils.testUtils.test3": "test3",
			"utils.testUtils.test4": "test4",
		});
	});
});
