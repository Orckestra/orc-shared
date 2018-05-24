import React from "react";
import ReactDOM from "react-dom";
import PortalWrapper, { Wrapper } from "./Wrapper";

class RenderWrapper extends React.Component {
	render() {
		return (
			<div id="outer">
				<PortalWrapper {...this.props} />
			</div>
		);
	}
}

describe("Wrapper", () => {
	it("sets transition time according to its timeout", () =>
		expect(
			<Wrapper in timeout={500} />,
			"to render style rules",
			"to contain",
			"transition: opacity 500ms ease-out;",
		));

	describe("rendered in portal", () => {
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

		it("renders a Wrapper in a portal", () => {
			const render = ReactDOM.render(
				<RenderWrapper in>
					<div id="inner">Foo</div>
				</RenderWrapper>,
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
	});
});
