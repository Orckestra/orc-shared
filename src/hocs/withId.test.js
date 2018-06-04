import React from "react";
import ReactDOM from "react-dom";
import withId from "./withId";

const TestComp = () => <div />;
const TestComp2 = () => <p />;

describe("with id handling", () => {
	it("passes through a given id", () =>
		expect(withId, "when called with", ["test"], "when called with", [
			TestComp,
		]).then(EnhComp =>
			expect(
				<EnhComp id="fixedID" />,
				"to render as",
				<TestComp id="fixedID" />,
			),
		));

	it("sets a generated id if none given", () =>
		expect(withId, "when called with", ["gen"], "when called with", [
			TestComp,
		]).then(EnhComp =>
			expect(<EnhComp />, "to render as", <TestComp id="gen0" />),
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
				"to deeply render as",
				<div>
					<TestComp id="seq0" />
					<TestComp id="seq1" />
					<TestComp id="seq2" />
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
			let render = ReactDOM.render(<EnhComp />, rootElm);
			return expect(render, "to have rendered", <TestComp id="same0" />)
				.then(() => {
					render = ReactDOM.render(<EnhComp foo="feep" />, rootElm);
				})
				.then(() =>
					expect(render, "to have rendered", <TestComp id="same0" />),
				);
		});

		it("reverts to a generated id if a fixed id is intermittently provided", () => {
			const EnhComp = withId("intermittent")(TestComp);
			let render = ReactDOM.render(<EnhComp />, rootElm);
			return expect(render, "to have rendered", <TestComp id="intermittent0" />)
				.then(() => {
					render = ReactDOM.render(<EnhComp id="Fixed" />, rootElm);
				})
				.then(() => expect(render, "to have rendered", <TestComp id="Fixed" />))
				.then(() => {
					render = ReactDOM.render(<EnhComp />, rootElm);
				})
				.then(() =>
					expect(render, "to have rendered", <TestComp id="intermittent1" />),
				);
		});
	});

	describe("shared id generators", () => {
		it("shares counters with the same name", () => {
			const Enh1 = withId("share")(TestComp);
			const Enh2 = withId("share")(TestComp2);
			return Promise.all([
				expect(<Enh1 />, "to render as", <TestComp id="share0" />),
				expect(<Enh2 />, "to render as", <TestComp2 id="share1" />),
			]);
		});
	});
});
