export const RESET_REQUEST_STATE = "RESET_REQUEST_STATE";

export const resetRequestState = (keys, operation) => ({
	type: RESET_REQUEST_STATE,
	meta: {
		requestState: { keys, operation },
	},
});
