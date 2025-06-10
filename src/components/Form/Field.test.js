import React from "react";
import { Provider } from "react-redux";
import Field from "./Field";

describe("Field", () => {
	it("renders a field with a label", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Field id="field" label="A test">
					<div id="child" />
				</Field>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>
				<label htmlFor="field" id="field_label">
					A test
				</label>
				<div id="child" />
			</div>,
		));

	it("renders a required field with a label", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Field id="field" label="A test" required="Required">
					<div id="child" />
				</Field>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>
				<label htmlFor="field" id="field_label">
					A test
				</label>
				<div id="child" />
			</div>,
		));

	it("renders a missing required field with a label", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Field id="field" label="A test" required="Required" invalid>
					<div id="child" />
				</Field>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>
				<label htmlFor="field" id="field_label">
					A test
				</label>
				<div id="child" />
				<div>Required</div>
			</div>,
		));

	it("renders a field with no label", () =>
		expect(
			<Field id="field">
				<div id="child" />
			</Field>,
			"when mounted",
			"to satisfy",
			<div>
				<div id="child" />
			</div>,
		));

	it("renders only its label when flagged", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Field id="field" label="A test" labelOnly required="Required">
					<div id="child" />
				</Field>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>
				<label id="field_label">A test</label>
			</div>,
		));

	it("renders a field with a centered label", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Field id="field" label="A test" center>
					<div id="child" />
				</Field>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>
				<label htmlFor="field" id="field_label">
					A test
				</label>
				<div id="child" />
			</div>,
		));
});
