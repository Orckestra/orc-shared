import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Immutable from "immutable";
import Helmet from "react-helmet";
import Head from "./Head";

describe("Head", () => {
	let store, node;
	beforeEach(() => {
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () =>
				Immutable.fromJS({
					locale: {
						locale: "fr-CA",
					},
				}),
		};
		node = document.createElement("div");
		document.body.appendChild(node);
	});
	afterEach(() => {
		ReactDOM.unmountComponentAtNode(node);
		node.remove();
	});

	it("renders a Helmet setting the language on the <html> element", () => {
		const render = ReactDOM.render(
			<Provider store={store}>
				<Head />
			</Provider>,
			node,
		);
		return (
			expect(
				render,
				"to have rendered",
				<Helmet>{/* <html lang="fr-CA" /> */}</Helmet>,
			)
				// Wait 1 ms for Helmet to propagate changes
				.then(
					() => new Promise(resolve => window.requestAnimationFrame(resolve)),
				)
				.then(() => expect(document.documentElement.lang, "to be", "fr-CA"))
		);
	});
});
