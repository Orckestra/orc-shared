import Immutable from "immutable";
import { firstDialogErrorMessageSelector } from "./globalErrorMessages";

describe("firstDialogErrorMessageSelector", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			globalErrorMessages: {
				dialog: {
					errorMessages: [{ msg: "123" }, { msg: "456" }],
				},
			},
			view: {},
		});
	});

	it("gets the first message", () => {
		expect(firstDialogErrorMessageSelector, "called with", [state], "to satisfy", { msg: "123" });
	});

	it("gets the first message on an empty list", () => {
		state = state.setIn(["globalErrorMessages", "dialog", "errorMessages"], Immutable.fromJS([]));
		expect(firstDialogErrorMessageSelector, "called with", [state], "to satisfy", null);
	});
});
