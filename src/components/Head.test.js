import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
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

	it("¨sets the language on the <html> element", () => {
		ReactDOM.render(
			<Provider store={store}>
				<MemoryRouter>
					<Head />
				</MemoryRouter>
			</Provider>,
			node,
		);
		expect(document.documentElement.lang, "not to be", "fr-CA");
		return new Promise(resolve => window.requestAnimationFrame(resolve)).then(() =>
			expect(document.documentElement.lang, "to be", "fr-CA"),
		);
	});
});
