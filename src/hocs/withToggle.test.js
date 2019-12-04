import React from "react";
import { mount, simulate } from "react-dom-testing";
import withToggle from "./withToggle";

const TestComp = ({ toggle, toggledOn, reset }) => (
	<div
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
			const element = mount(<Comp toggledOnInit={true} />);

			return expect(element, "to satisfy", <TestComp toggledOn={true} />).then(
				() =>
					expect(
						element,
						"to satisfy",
						<div onClick={expect.it("to be a function")}>1</div>,
					)
						.and("with event", "keyDown", "to satisfy", <div>0</div>)
						.and("with event", "keyDown", "to satisfy", <div>0</div>),
			);
		}));
});
