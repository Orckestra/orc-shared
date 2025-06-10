import React from "react";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { ReadOnly, LineLabel } from "./ReadOnly";

describe("ReadOnly", () => {
	it("renders a read-only value in a form", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en">
					<ReadOnly value={{ id: "test.readOnlyValue", defaultMessage: "Read Only" }} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>
				<p>Read Only</p>
			</div>,
		));

	it("renders a read-only text in a form", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<ReadOnly value="Read Only" />
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>
				<p>Read Only</p>
			</div>,
		));
});

describe("LineLabel", () => {
	it("renders a formatted text in large font", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en">
					<LineLabel value={{ id: "test.textValue", defaultMessage: "A text value" }} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>
				<p>A text value</p>
			</div>,
		));

	it("renders a text in large font", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<LineLabel value="A text value" />
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>
				<p>A text value</p>
			</div>,
		));
});
