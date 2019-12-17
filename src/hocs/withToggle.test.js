import React from "react";
import { mount, simulate } from "react-dom-testing";
import withToggle from "./withToggle";

const TestComp = ({ id, toggle, toggledOn, reset }) => (
	<div
		id={id}
		onClick={e => {
			toggle();
		}}
		onKeyDown={e => {
			reset();
		}}
	>
		{toggledOn ? 1 : 0}
	</div>
);

describe("withToggle", () => {
	it("provides toggle and toggledOn props, handling state", () =>
		expect(withToggle, "when called with", ["toggledOn"], "when called with", [
			TestComp,
		]).then(Comp => {
			const element = mount(<Comp />);
			expect(element, "to satisfy", <TestComp toggledOn={false} />);
			expect(
				element,
				"to satisfy",
				<div onClick={expect.it("to be a function")}>0</div>,
			);
			simulate(element, "click");
			expect(element, "to satisfy", <div>1</div>);
			simulate(element, "click");
			expect(element, "to satisfy", <div>0</div>);
		}));

	it("handles multiple components of the same type", () =>
		expect(withToggle, "when called with", ["toggledOn"], "when called with", [
			TestComp,
		]).then(Comp => {
			const element = mount(
				<div>
					<Comp id="c1" />
					<Comp id="c2" />
				</div>,
			);
			expect(element, "to contain", <TestComp id="c1" toggledOn={false} />);
			expect(element, "to contain", <TestComp id="c2" toggledOn={false} />);
			simulate(element, { type: "click", target: "#c1" });
			expect(
				element,
				"to satisfy",
				<div>
					<div>1</div>
					<div>0</div>
				</div>,
			);
			simulate(element, { type: "click", target: "#c2" });
			expect(
				element,
				"to satisfy",
				<div>
					<div>1</div>
					<div>1</div>
				</div>,
			);
			simulate(element, { type: "click", target: "#c1" });
			expect(
				element,
				"to satisfy",
				<div>
					<div>0</div>
					<div>1</div>
				</div>,
			);
			simulate(element, { type: "click", target: "#c2" });
			expect(
				element,
				"to satisfy",
				<div>
					<div>0</div>
					<div>0</div>
				</div>,
			);
		}));

	it("allows initializing the toggled parameter", () =>
		expect(withToggle, "when called with", ["toggledOn"], "when called with", [
			TestComp,
		]).then(Comp =>
			expect(
				<Comp toggledOnInit={true} />,
				"when mounted",
				"to satisfy",
				<TestComp toggledOn={true} />,
			),
		));

	it("can be reset by calling that function", () =>
		expect(withToggle, "when called with", ["toggledOn"], "when called with", [
			TestComp,
		]).then(Comp => {
			const element = mount(<Comp />);
			simulate(element, "click");
			expect(element, "to satisfy", <div>1</div>);
			simulate(element, "keyDown");
			expect(element, "to satisfy", <div>0</div>);
			simulate(element, "keyDown");
			expect(element, "to satisfy", <div>0</div>);
		}));
});
