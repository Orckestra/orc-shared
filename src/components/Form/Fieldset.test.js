import React from "react";
import { Provider } from "react-redux";
import Fieldset, { FieldsetBox, Legend } from "./Fieldset";

describe("Fieldset", () => {
	it("works", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Fieldset label="A field set">
					<div id="child" />
				</Fieldset>
			</Provider>,
			"when mounted",
			"to satisfy",
			<FieldsetBox>
				<Legend>A field set</Legend>
				<div id="child" />
			</FieldsetBox>,
		));
});
