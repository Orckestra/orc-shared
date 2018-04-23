import React from "react";
import withToggle from "./withToggle";

const TestComp = ({ toggle, toggledOn }) => (
	<div onClick={toggle}>{toggledOn ? 1 : 0}</div>
);

describe("withToggle", () => {
	it("provides toggle and toggledOn props, handling state", () =>
		expect(withToggle, "when called with", ["toggledOn"], "when called with", [
			TestComp,
		]).then(Comp =>
			expect(<Comp />, "to render as", <TestComp toggledOn={false} />)
				.and("when deeply rendered")
				.then(element =>
					expect(
						element,
						"to contain",
						<div onClick={expect.it("to be a function")}>0</div>,
					)
						.and("with event click", "to contain", <div>1</div>)
						.and("with event click", "to contain", <div>0</div>),
				),
		));

	it("allows initializing the toggled parameter", () =>
		expect(withToggle, "when called with", ["toggledOn"], "when called with", [
			TestComp,
		]).then(Comp =>
			expect(
				<Comp toggledOnInit={true} />,
				"to render as",
				<TestComp toggledOn={true} />,
			),
		));
});
