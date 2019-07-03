import { PUSH_TOAST, pushToast, SHIFT_TOAST, shiftToast } from "./toasts";

describe("pushToast", () => {
	it("creates an action with a toast message as payload", () =>
		expect(
			pushToast,
			"when called with",
			["A message", "testType"],
			"to equal",
			{
				type: PUSH_TOAST,
				payload: {
					message: "A message",
					type: "testType",
				},
			},
		));

	it("defaults to 'confirm' type", () =>
		expect(pushToast, "when called with", ["A message"], "to equal", {
			type: PUSH_TOAST,
			payload: {
				message: "A message",
				type: "confirm",
			},
		}));
});

describe("shiftToast", () => {
	it("creates a payloadless action", () =>
		expect(shiftToast, "when called", "to equal", { type: SHIFT_TOAST }));
});
