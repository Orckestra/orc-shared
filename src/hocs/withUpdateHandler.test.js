import React from "react";
import ReactDOM from "react-dom";
import sinon from "sinon";
import withUpdateHandler from "./withUpdateHandler";

const TestComp = () => <div />;

describe("withUpdateHandler", () => {
	let handler, node;
	beforeEach(() => {
		node = document.createElement("div");
		handler = sinon.spy().named("handler");
	});

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
