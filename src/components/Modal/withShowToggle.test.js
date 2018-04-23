import React from "react";
import withShowToggle from "./withShowToggle";

const TestComp = ({ toggle, show }) => (
	<div onClick={toggle}>{show ? 1 : 0}</div>
);

describe("withShowToggle", () => {
	it("provides toggle and show props, handling state", () =>
		expect(withShowToggle, "when called with", [TestComp]).then(Comp =>
			expect(<Comp />, "when deeply rendered").then(element =>
				expect(
					element,
					"to contain",
					<div onClick={expect.it("to be a function")}>0</div>,
				)
					.and("with event click", "to contain", <div>1</div>)
					.and("with event click", "to contain", <div>0</div>),
			),
		));
});
