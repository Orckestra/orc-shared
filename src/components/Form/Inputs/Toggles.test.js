import React from "react";
import sinon from "sinon";
import { IntlProvider } from "react-intl";
import Switch from "../../MaterialUI/Inputs/Switch";
import { generateClassName } from "../../../utils/testUtils";
import { switchEventUpdater, SwitchInput } from "./Toggles";
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

describe("switchEventUpdater", () => {
	let update;
	beforeEach(() => {
		update = sinon.spy().named("update");
	});

	it("creates a handler for an event and calls update with the value of the target", () =>
		expect(switchEventUpdater, "called with", [update], "called with", ["foo"]).then(() =>
			expect(update, "to have calls satisfying", [{ args: ["foo"] }]),
		));

	it("is memoized", () => expect(switchEventUpdater, "called with", [update], "to be", switchEventUpdater(update)));
});
