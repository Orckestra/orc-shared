import React from "react";
import sinon from "sinon";
import { spyOnConsole } from "../utils/testUtils";
import withInitialLoad from "./withInitialLoad";

const TestComp = () => <div />;

describe("withInitialLoad", () => {
	let loader;
	beforeEach(() => {
		loader = sinon.spy().named("loader");
	});
	spyOnConsole(["warn"]);

	it("issues a deprecation warning", () =>
		expect(withInitialLoad, "when called with", ["loader", props => props.loadOnMount], "when called with", [TestComp])
			.then(EnhComp => expect(<EnhComp loader={loader} loadOnMount={true} />, "when mounted", "to satisfy", <div />))
			.then(() =>
				expect(console.warn, "to have a call satisfying", {
					args: [expect.it("to contain", "withInitialLoad has been deprecated")],
				}),
			));

	it("fires a loader function on component mount, if test returns true", () =>
		expect(withInitialLoad, "when called with", ["loader", props => props.loadOnMount], "when called with", [TestComp])
			.then(EnhComp => expect(<EnhComp loader={loader} loadOnMount={true} />, "when mounted", "to satisfy", <div />))
			.then(() => expect(loader, "was called")));

	it("does not fire loader function if test returns false", () =>
		expect(withInitialLoad, "when called with", ["loader", props => props.loadOnMount], "when called with", [TestComp])
			.then(EnhComp => expect(<EnhComp loader={loader} />, "when mounted", "to satisfy", <div />))
			.then(() => expect(loader, "was not called")));

	it("does not fire loader function if no test provided", () =>
		expect(withInitialLoad, "when called with", ["loader"], "when called with", [TestComp])
			.then(EnhComp => expect(<EnhComp loader={loader} />, "when mounted", "to satisfy", <div />))
			.then(() => expect(loader, "was not called")));
});
