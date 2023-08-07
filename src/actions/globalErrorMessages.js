export const PUSH_GLOBAL_ERROR_MESSAGE = "PUSH_GLOBAL_ERROR_MESSAGE";

export const pushGlobalErrorMessage = msg => ({
	type: PUSH_GLOBAL_ERROR_MESSAGE,
	payload: msg,
});

export const POP_GLOBAL_ERROR_MESSAGE = "POP_GLOBAL_ERROR_MESSAGE";

export const popGlobalErrorMessage = () => ({
	type: POP_GLOBAL_ERROR_MESSAGE,
});
