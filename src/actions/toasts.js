export const PUSH_TOAST = "PUSH_TOAST";

export const pushToast = (message, type = "confirm") => ({
	type: PUSH_TOAST,
	payload: {
		message,
		type,
	},
});

export const SHIFT_TOAST = "SHIFT_TOAST";

export const shiftToast = () => ({ type: SHIFT_TOAST });

// Specific dismissable toast: (Later)
// Add static toast
// Remove static toast
