import React from "react";
import sinon from "sinon";
import Switch from "../../Switch";
import { FormCheckbox, getCheckUpdater, CenterMiddleWrapper, CheckboxInput, SwitchInput } from "./Toggles";

describe("CheckboxInput", () => {
	let update;
	beforeEach(() => {
		update = sinon.spy().named("update");
	});

	it("renders a checkbox input with change handler", () =>
		expect(
			<CheckboxInput id="test-item" update={update} value={false} otherProp />,
			"when mounted",
			"to satisfy",
			<CenterMiddleWrapper>
				<FormCheckbox id="test-item" onChange={getCheckUpdater(update)} value={false} otherProp />
			</CenterMiddleWrapper>,
		));
});

describe("SwitchInput", () => {
	let update;
	beforeEach(() => {
		update = sinon.spy().named("update");
	});

	it("renders a switch input with change handler", () =>
		expect(
			<SwitchInput id="test-item" update={update} value={true} otherProp />,
			"when mounted",
			"to satisfy",
			<CenterMiddleWrapper>
				<Switch id="test-item" onChange={getCheckUpdater(update)} value={true} otherProp />
			</CenterMiddleWrapper>,
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
