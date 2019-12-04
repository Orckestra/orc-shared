import React from "react";
import getEnhancedComponent from "./getEnhancedComponent";

const TestComp1 = ({ one = false, two = false }) => (
	<div id={"1" + one * 1 + two * 1} />
);
const TestComp2 = ({ one = false, two = false }) => (
	<div id={"2" + one * 1 + two * 1} />
);

const testHOC1 = Comp => () => <Comp one />;
const testHOC2 = Comp => () => <Comp two />;

describe("getEnhancedComponent", () => {
	it("returns an enhanced component", () =>
		expect(getEnhancedComponent, "when called", "when called with", [
			testHOC1,
			TestComp1,
		]).then(Comp =>
			expect(<Comp />, "when mounted", "to satisfy", <TestComp1 one />),
		));

	it("returns the same component instance on subsequent calls with same parameters", () =>
		expect(getEnhancedComponent, "when called")
			.then(getEC =>
				Promise.all([
					expect(getEC, "when called with", [testHOC1, TestComp1]),
					expect(getEC, "when called with", [testHOC1, TestComp1]),
				]),
			)
			.then(([Comp1, Comp2]) => expect(Comp1, "to be", Comp2)));

	it("returns the different component instance on subsequent calls with different component", () =>
		expect(getEnhancedComponent, "when called")
			.then(getEC =>
				Promise.all([
					expect(getEC, "when called with", [testHOC1, TestComp1]),
					expect(getEC, "when called with", [testHOC1, TestComp2]),
				]),
			)
			.then(([Comp1, Comp2]) => expect(Comp1, "not to be", Comp2)));

	it("returns the different component instance on subsequent calls with different HOC", () =>
		expect(getEnhancedComponent, "when called")
			.then(getEC =>
				Promise.all([
					expect(getEC, "when called with", [testHOC1, TestComp1]),
					expect(getEC, "when called with", [testHOC2, TestComp1]),
				]),
			)
			.then(([Comp1, Comp2]) => expect(Comp1, "not to be", Comp2)));
});
