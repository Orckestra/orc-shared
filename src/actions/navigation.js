export const SET_ROUTE = "SET_ROUTE";

export const setRoute = (location, match) => ({
	type: SET_ROUTE,
	payload: {
		location,
		match,
	},
});

export const REMOVE_TAB = "REMOVE_TAB";

export const removeTab = (module, path) => ({
	type: REMOVE_TAB,
	payload: { module, path },
});
