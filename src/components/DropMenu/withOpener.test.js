import React from "react";
import withOpener from "./withOpener";

const TestComp = ({ toggle, open }) => (
	<div onClick={toggle}>{open ? 1 : 0}</div>
);

describe("withOpener", () => {
	it("provides toggle and open props, handling state", () =>
		expect(withOpener, "when called with", [TestComp]).then(Comp =>
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
