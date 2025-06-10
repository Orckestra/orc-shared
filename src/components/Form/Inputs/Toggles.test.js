import React from "react";
import sinon from "sinon";
import { IntlProvider } from "react-intl";
import Switch from "../../MaterialUI/Inputs/Switch";
import { generateClassName } from "../../../utils/testUtils";
import { getCheckUpdater, CenterMiddleWrapper, SwitchInput } from "./Toggles";
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
					<CenterMiddleWrapper>
						<Switch />
					</CenterMiddleWrapper>
				</IntlProvider>
			</StylesProvider>,
		));
});

describe("getCheckUpdater", () => {
	let update;
	beforeEach(() => {
		update = sinon.spy().named("update");
	});

	it("creates a handler for an event and calls update with the 'checked' attribute of the target", () =>
		expect(getCheckUpdater, "called with", [update], "called with", [{ target: { checked: true } }]).then(() =>
			expect(update, "to have calls satisfying", [{ args: [true] }]),
		));

	it("is memoized", () => expect(getCheckUpdater, "called with", [update], "to be", getCheckUpdater(update)));
});
