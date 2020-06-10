import React from "react";
import ReactDOM from "react-dom";
import sinon from "sinon";
import withClickOutside from "./withClickOutside";

const TestComp = React.forwardRef(({ other = false, ...props }, ref) =>
	other ? (
		<button ref={ref} {...props} id="inner" />
	) : (
		<div ref={ref} {...props} id="inner" />
	),
);
const Enhanced = withClickOutside(TestComp);

const Wrapped = props => (
	<div id="outer">
		<Enhanced {...props} />
	</div>
);

const delay = () => new Promise(resolve => setTimeout(resolve, 10));

describe("withClickOutside", () => {
	it("acts as a HOC", () =>
		expect(withClickOutside, "when called with", [TestComp]).then(Comp =>
			expect(
				<Comp data-test />,
				"when mounted",
				"to satisfy",
				<div id="inner" data-test />,
			),
		));

	describe("click handling", () => {
		let onClickOutside, onClick, parentNode;
		beforeEach(() => {
			onClickOutside = sinon.spy().named("onClickOutside");
			onClick = sinon.spy().named("onClick");
			parentNode = document.createElement("div");
			document.body.appendChild(parentNode);
			ReactDOM.render(
				<Wrapped onClick={onClick} onClickOutside={onClickOutside} />,
				parentNode,
			);
		});
		afterEach(() => {
			ReactDOM.unmountComponentAtNode(parentNode);
			document.body.removeChild(parentNode);
		});

		it("handles clicks outside the component", () => {
			parentNode.click();
			delay().then(() => {
				expect(onClick, "was not called");
				expect(onClickOutside, "was called");
			});
		});

		it("does not handle clicks inside the component", () => {
			const innernode = parentNode.querySelector("#inner");
			innernode.click();
			delay().then(() => {
				expect(onClick, "was called");
				expect(onClickOutside, "was not called");
			});
		});

		it("changes handlers on re-render", () => {
			const newClickOutside = sinon.spy().named("newClickOutside");
			ReactDOM.render(
				<Wrapped onClick={onClick} onClickOutside={newClickOutside} />,
				parentNode,
			);
			const outernode = parentNode.querySelector("#outer");
			outernode.click();
			delay().then(() => {
				expect(onClick, "was not called");
				expect(onClickOutside, "was not called");
				expect(newClickOutside, "was called");
			});
		});

		it("changes DOM nodes on re-render", () => {
			ReactDOM.render(
				<Wrapped other onClick={onClick} onClickOutside={onClickOutside} />,
				parentNode,
			);
			const innernode = parentNode.querySelector("#inner");
			innernode.click();
			delay().then(() => {
				expect(onClick, "was called");
				expect(onClickOutside, "was not called");
			});
		});

		it("does not handle clicks on elements nested within the outer element", () => {
			ReactDOM.render(
				<Wrapped onClick={onClick} onClickOutside={onClickOutside}>
					<div id="nested" />
				</Wrapped>,
				parentNode,
			);
			const nestednode = parentNode.querySelector("#nested");
			nestednode.click();
			delay().then(() => {
				expect(onClick, "was called");
				expect(onClickOutside, "was not called");
			});
		});
	});

	describe("event phase", () => {
		let onClickPropagate, onClick, stoppingHandler, parentNode;
		beforeEach(() => {
			onClick = sinon.spy().named("onClick");
			onClickPropagate = sinon.spy().named("onClickPropagate");
			stoppingHandler = sinon
				.spy(event => event.stopPropagation())
				.named("stoppingHandler");
			parentNode = document.createElement("div");
			document.body.appendChild(parentNode);
			ReactDOM.render(
				<Wrapped onClick={onClick} onClickOutside={stoppingHandler} />,
				parentNode,
			);
			parentNode.addEventListener("click", onClickPropagate);
		});
		afterEach(() => {
			ReactDOM.unmountComponentAtNode(parentNode);
			document.body.removeChild(parentNode);
		});

		it("can intercept and stop clicks outside from hitting their targets", () => {
			const outernode = parentNode.querySelector("#outer");
			outernode.click();
			delay().then(() => {
				expect(stoppingHandler, "was called");
				expect(onClickPropagate, "was not called");
				expect(onClick, "was not called");
			});
		});
	});
});
