import React from "react";
import ReactDOM from "react-dom";
import withId from "./withId";

const TestComp = props => <div {...props} />;
const TestComp2 = props => <p {...props} />;

describe("with id handling", () => {
	it("passes through a given id", () =>
		expect(withId, "when called with", ["test"], "when called with", [
			TestComp,
		]).then(EnhComp =>
			expect(
				<EnhComp id="fixedID" />,
				"when mounted",
				"to satisfy",
				<div id="fixedID" />,
			),
		));

	it("sets a generated id if none given", () =>
		expect(withId, "when called with", ["gen"], "when called with", [
			TestComp,
		]).then(EnhComp =>
			expect(<EnhComp />, "when mounted", "to satisfy", <div id="gen0" />),
		));

	it("sets different ids on different components", () =>
		expect(withId, "when called with", ["seq"], "when called with", [
			TestComp,
		]).then(EnhComp =>
			expect(
				<div>
					<EnhComp />
					<EnhComp />
					<EnhComp />
				</div>,
				"when mounted",
				"to satisfy",
				<div>
					<div id="seq0" />
					<div id="seq1" />
					<div id="seq2" />
				</div>,
			),
		));

	describe("when updated", () => {
		let rootElm;
		beforeEach(() => {
			rootElm = document.createElement("div");
		});

		it("keeps the same id when updated", () => {
			const EnhComp = withId("same")(TestComp);
			ReactDOM.render(<EnhComp />, rootElm);
			return expect(
				rootElm.querySelector("div"),
				"to satisfy",
				<div id="same0" />,
			)
				.then(() => {
					ReactDOM.render(<EnhComp foo="feep" />, rootElm);
				})
				.then(() =>
					expect(
						rootElm.querySelector("div"),
						"to satisfy",
						<div id="same0" />,
					),
				);
		});

		it("reverts to a generated id if a fixed id is intermittently provided", () => {
			const EnhComp = withId("intermittent")(TestComp);
			ReactDOM.render(<EnhComp />, rootElm);
			return expect(
				rootElm.querySelector("div"),
				"to satisfy",
				<div id="intermittent0" />,
			)
				.then(() => {
					ReactDOM.render(<EnhComp id="Fixed" />, rootElm);
				})
				.then(() =>
					expect(
						rootElm.querySelector("div"),
						"to satisfy",
						<div id="Fixed" />,
					),
				)
				.then(() => {
					ReactDOM.render(<EnhComp />, rootElm);
				})
				.then(() =>
					expect(
						rootElm.querySelector("div"),
						"to satisfy",
						<div id="intermittent1" />,
					),
				);
		});
	});

	describe("shared id generators", () => {
		it("shares counters with the same name", () => {
			const Enh1 = withId("share")(TestComp);
			const Enh2 = withId("share")(TestComp2);
			return Promise.all([
				expect(<Enh1 />, "when mounted", "to satisfy", <div id="share0" />),
				expect(<Enh2 />, "when mounted", "to satisfy", <p id="share1" />),
			]);
		});
	});
});
