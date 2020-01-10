import React from "react";
import ReactDOM from "react-dom";
import Sidepanel, { PanelDrawer } from "./Sidepanel";

class RenderSidepanel extends React.Component {
	render() {
		return (
			<div id="outer">
				<Sidepanel {...this.props} />
			</div>
		);
	}
}

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
		ReactDOM.render(
			<RenderSidepanel in>
				<div id="inner">Foo</div>
			</RenderSidepanel>,
			appRoot,
		);
		return expect(
			modalRoot,
			"queried for first",
			"div#inner",
			"to be a",
			"DOMElement",
		);
	});

	describe("PanelDrawer", () => {
		it("sets the width it is given", () =>
			expect(
				<PanelDrawer in width="25vw" />,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"width: 25vw;",
			));

		it("sets width by default", () =>
			expect(
				<PanelDrawer in />,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"width: 200px;",
			));

		it("sets transition according to timeout", () =>
			expect(
				<PanelDrawer in timeout={300} />,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"transition: transform 300ms",
			));

		it("sets default transition", () =>
			expect(
				<PanelDrawer in />,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"transition: transform 1000ms",
			));
	});
});
