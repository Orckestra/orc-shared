import React from "react";
import ReactDOM from "react-dom";
import Sidepanel from "./Sidepanel";
import { createMuiTheme, TestWrapper } from "../utils/testUtils";

const theme = createMuiTheme();

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
		} catch {
			// don't do anything
		}
		document.body.removeChild(appRoot);
		document.body.removeChild(modalRoot);
	});

	it("renders sidepanel in a portal", () => {
		ReactDOM.render(
			<RenderSidepanel in>
				<div id="inner">Foo</div>
			</RenderSidepanel>,
			appRoot,
		);
		return expect(modalRoot, "queried for first", "div#inner", "to be a", "DOMElement");
	});

	it("sets the width it is given", () => {
		ReactDOM.render(
			<TestWrapper muiThemeProvider={{ theme }}>
				<Sidepanel in widthSpacing={25}>
					<div id="inner">Foo</div>
				</Sidepanel>
			</TestWrapper>,
			appRoot,
		);
		return expect(
			modalRoot,
			"queried for first",
			"div#modal > div",
			"to have style rules satisfying",
			"to contain",
			"width: 15.625rem",
		);
	});

	it("sets transition according to timeout", () => {
		ReactDOM.render(
			<Sidepanel in timeout={300}>
				<div id="inner">Foo</div>
			</Sidepanel>,
			appRoot,
		);
		return expect(
			modalRoot,
			"queried for first",
			"div#modal > div",
			"to have style rules satisfying",
			"to contain",
			"transition: transform 300ms",
		);
	});

	it("sets default transition", () => {
		ReactDOM.render(
			<Sidepanel in>
				<div id="inner">Foo</div>
			</Sidepanel>,
			appRoot,
		);
		return expect(
			modalRoot,
			"queried for first",
			"div#modal > div",
			"to have style rules satisfying",
			"to contain",
			"transition: transform 1000ms",
		);
	});
});
