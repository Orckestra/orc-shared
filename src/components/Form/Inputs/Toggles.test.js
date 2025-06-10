import React from "react";
import sinon from "sinon";
import { IntlProvider } from "react-intl";
import Switch from "../../MaterialUI/Inputs/Switch";
import { generateClassName } from "../../../utils/testUtils";
import { SwitchInput } from "./Toggles";
import { StylesProvider } from "@material-ui/core";

describe("SwitchInput", () => {
	let update;
	beforeEach(() => {
		update = sinon.spy().named("update");
	});

	it("renders a switch input with change handler", () =>
		expect(
			<StylesProvider generateClassName={generateClassName}>
				<IntlProvider locale="en">
					<SwitchInput id="test-item" update={update} value={true} otherProp />
				</IntlProvider>
			</StylesProvider>,
			"when mounted",
			"to satisfy",
			<StylesProvider generateClassName={generateClassName}>
				<IntlProvider locale="en">
					<div>
						<Switch />
					</div>
				</IntlProvider>
			</StylesProvider>,
		));
});
