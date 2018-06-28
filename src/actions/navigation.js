export const REMOVE_TAB = "REMOVE_TAB";

export const removeTab = (module, path) => ({
	type: REMOVE_TAB,
	payload: { module, path },
});
