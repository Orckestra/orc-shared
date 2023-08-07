import {
	POP_GLOBAL_ERROR_MESSAGE,
	popGlobalErrorMessage,
	PUSH_GLOBAL_ERROR_MESSAGE,
	pushGlobalErrorMessage,
} from "./globalErrorMessages";

describe("pushGlobalErrorMessage", () => {
	it("create action with message", () =>
		expect(pushGlobalErrorMessage, "when called with", [{ custom: "message" }], "to equal", {
			type: PUSH_GLOBAL_ERROR_MESSAGE,
			payload: { custom: "message" },
		}));
});

describe("popGlobalErrorMessage", () => {
	it("create action", () =>
		expect(popGlobalErrorMessage, "when called with", [], "to equal", {
			type: POP_GLOBAL_ERROR_MESSAGE,
		}));
});
