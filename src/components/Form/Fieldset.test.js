import React from "react";
import Text from "../Text";
import Fieldset, { FieldsetBox, Legend } from "./Fieldset";

describe("Fieldset", () => {
	it("works", () =>
		expect(
			<Fieldset label="A field set">
				<div id="child" />
			</Fieldset>,
			"to render as",
			<FieldsetBox>
				<Legend>
					<Text message="A field set" />
				</Legend>
				<div id="child" />
			</FieldsetBox>,
		));
});
