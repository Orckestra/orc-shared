import React from "react";
import ReactDOM from "react-dom";
import Sidepanel, { PanelDrawer } from "./Sidepanel";

const RenderSidepanel = class Wrapped extends React.Component {
	render() {
		return (
			<div id="outer">
				<Sidepanel {...this.props} />
			</div>
		);
	}
};

describe("Sidepanel", () => {
	let appRoot, modalRoot;
	beforeEach(() => {
		appRoot = document.createElement("div");
		appRoot.id = "app";
		document.body.appendChild(appRoot);
		modalRoot = document.createElement("div");
		modalRoot.id = "modal";
		document.body.appendChild(modalRoot);
	});
	afterEach(() => {
		try {
			ReactDOM.unmountComponentAtNode(appRoot);
		} catch (_) {}
		document.body.removeChild(appRoot);
		document.body.removeChild(modalRoot);
	});

	it("renders a PanelDrawer in a portal", () => {
		const render = ReactDOM.render(
			<RenderSidepanel in>
				<div id="inner">Foo</div>
			</RenderSidepanel>,
			appRoot,
		);
		return expect(render, "queried for", <div id="inner" />).then(elm => {
			let node = ReactDOM.findDOMNode(elm);
			while (node.parentNode !== document.body) {
				node = node.parentNode;
			}
			return expect(node, "to be", modalRoot);
		});
	});

	describe("PanelDrawer", () => {
		it("sets the width it is given", () =>
			expect(
				<PanelDrawer in width="25vw" />,
				"to render style rules",
				"to contain",
				"width: 25vw;",
			));

		it("sets width by default", () =>
			expect(
				<PanelDrawer in />,
				"to render style rules",
				"to contain",
				"width: 200px;",
			));

		it("sets transition according to timeout", () =>
			expect(
				<PanelDrawer in timeout={300} />,
				"to render style rules",
				"to contain",
				"transition: transform 300ms",
			));

		it("sets default transition", () =>
			expect(
				<PanelDrawer in />,
				"to render style rules",
				"to contain",
				"transition: transform 1000ms",
			));
	});
});
