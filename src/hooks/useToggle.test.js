import React from "react";
import { mount, simulate } from "unexpected-reaction";
import useToggle from "./useToggle";

const TestComp = ({ id, init }) => {
	const [flag, toggle, reset] = useToggle(init);
	return (
		<div id={id} onClick={toggle} onKeyDown={reset}>
			{flag ? 1 : 0}
		</div>
	);
};

describe("useToggle", () => {
	it("provides a flag", () =>
		expect(<TestComp />, "when mounted", "to satisfy", <div>0</div>));

	it("can initialize the flag", () =>
		expect(<TestComp init="1" />, "when mounted", "to satisfy", <div>1</div>));

	it("provides a toggle function", () => {
		const element = mount(<TestComp />);
		expect(element, "to satisfy", <div>0</div>);
		simulate(element, "click");
		expect(element, "to satisfy", <div>1</div>);
		simulate(element, "click");
		expect(element, "to satisfy", <div>0</div>);
	});

	it("provides a reset function", () => {
		const element = mount(<TestComp />);
		expect(element, "to satisfy", <div>0</div>);
		simulate(element, "click");
		expect(element, "to satisfy", <div>1</div>);
		simulate(element, "keyDown");
		expect(element, "to satisfy", <div>0</div>);
		simulate(element, "keyDown");
		expect(element, "to satisfy", <div>0</div>);
	});

	it("keeps different elements separate", () => {
		const element = mount(
			<div>
				<TestComp id="a" />
				<TestComp id="b" />
			</div>,
		);
		expect(
			element,
			"to satisfy",
			<div>
				<div id="a">0</div>
				<div id="b">0</div>
			</div>,
		);
		simulate(element, { type: "click", target: "#a" });
		expect(
			element,
			"to satisfy",
			<div>
				<div id="a">1</div>
				<div id="b">0</div>
			</div>,
		);
		simulate(element, { type: "click", target: "#b" });
		expect(
			element,
			"to satisfy",
			<div>
				<div id="a">1</div>
				<div id="b">1</div>
			</div>,
		);
		simulate(element, { type: "click", target: "#a" });
		expect(
			element,
			"to satisfy",
			<div>
				<div id="a">0</div>
				<div id="b">1</div>
			</div>,
		);
	});
});
