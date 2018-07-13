import React from "react";
import withScrollBox, { Scrollbox } from "./withScrollBox";

const TestComp = ({ children }) => <div>{children}</div>;
TestComp.displayName = "TestComp";

describe("withScrollBox", () => {
	it("renders a scroll box with measured height", () =>
		expect(withScrollBox, "when called with", [TestComp]).then(EnhComp =>
			expect(
				<EnhComp other="prop">This is inside the box</EnhComp>,
				"when deeply rendered",
				"to have rendered",
				<Scrollbox>
					<TestComp
						other="prop"
						height={expect.it("to be undefined") /* jsdom can't do sizes*/}
						width={expect.it("to be undefined") /* jsdom can't do sizes*/}
					>
						This is inside the box
					</TestComp>
				</Scrollbox>,
			),
		));
});
