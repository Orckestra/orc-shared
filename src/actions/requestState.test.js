import { RESET_REQUEST_STATE, resetRequestState } from "./requestState";

describe("resetRequestState", () => {
	it("creates a reset requestState action", () =>
		expect(resetRequestState, "when called with", [["key1", "key2"], "the operation"], "to equal", {
			type: RESET_REQUEST_STATE,
			meta: {
				requestState: {
					keys: ["key1", "key2"],
					operation: "the operation",
				},
			},
		}));
});
