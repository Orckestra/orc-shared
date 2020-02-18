import React from "react";
import ReactDOM from "react-dom";
import sinon from "sinon";
import { spyOnConsole } from "../utils/testUtils";
import withUpdateHandler from "./withUpdateHandler";

const TestComp = () => <div />;

describe("withUpdateHandler", () => {
	let handler, node;
	beforeEach(() => {
		node = document.createElement("div");
		handler = sinon.spy().named("handler");
	});
	spyOnConsole(["warn"]);

	it("issues a deprecation warning", () =>
		expect(
			withUpdateHandler,
			"when called with",
			["loader", props => props.loadOnMount],
			"when called with",
			[TestComp],
		)
			.then(EnhComp =>
				expect(
					<EnhComp update={handler} set={false} />,
					"when mounted",
					"to satisfy",
					<div />,
				),
			)
			.then(() =>
				expect(console.warn, "to have calls satisfying", [
					{
						args: [
							expect.it("to contain", "withUpdateHandler has been deprecated"),
						],
					},
				]),
			));

	it("calls named update handler on wrapped component", () =>
		expect(
			withUpdateHandler,
			"when called with",
			["update", () => true],
			"when called with",
			[TestComp],
		).then(Comp => {
			ReactDOM.render(<Comp update={handler} set={false} />, node);
			expect(handler, "was not called");
			ReactDOM.render(<Comp update={handler} set={true} />, node);
			expect(handler, "was called once");
		}));

	it("only calls handler if test passes", () =>
		expect(
			withUpdateHandler,
			"when called with",
			["update", (oldProps, newProps) => newProps.flag !== oldProps.flag],
			"when called with",
			[TestComp],
		).then(Comp => {
			ReactDOM.render(<Comp update={handler} flag={false} foo={1} />, node);
			expect(handler, "was not called");
			ReactDOM.render(<Comp update={handler} flag={false} foo={2} />, node);
			expect(handler, "was not called");
			ReactDOM.render(<Comp update={handler} flag={true} foo={3} />, node);
			expect(handler, "was called once");
		}));

	it("never calls handler if no test given", () =>
		expect(
			withUpdateHandler,
			"when called with",
			["update"],
			"when called with",
			[TestComp],
		).then(Comp => {
			ReactDOM.render(<Comp update={handler} set={false} />, node);
			expect(handler, "was not called");
			ReactDOM.render(<Comp update={handler} set={true} />, node);
			expect(handler, "was not called");
		}));
});
