import React from "react";
import withScrollBox from "./withScrollBox";

const TestComp = ({ children }) => <div>{children}</div>;
TestComp.displayName = "TestComp";

describe("withScrollBox", () => {
	it("renders a scroll box with measured height", () =>
		expect(withScrollBox, "when called with", [TestComp]).then(EnhComp =>
			expect(
				<EnhComp other="prop">This is inside the box</EnhComp>,
				"when mounted",
				"to satisfy",
				<div>
					<TestComp
						other="prop"
						height={expect.it("to be undefined") /* jsdom can't do sizes*/}
						width={expect.it("to be undefined") /* jsdom can't do sizes*/}
					>
						This is inside the box
					</TestComp>
				</div>,
			),
		));

	it("forwards the ref to the scroll box div", () => {
		const ref = React.createRef();

		return expect(withScrollBox, "when called with", [TestComp]).then(EnhComp => {
			const element = <EnhComp ref={ref} />;
			return expect(() => expect(element, "when mounted", "to be truthy"), "not to throw").then(() => {
				expect(ref.current, "to be defined");
				expect(ref.current.nodeType, "to equal", 1);
			});
		});
	});
});
