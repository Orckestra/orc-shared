export const SET_ROUTE = "SET_ROUTE";

export const setRoute = (location, match) => ({
	type: SET_ROUTE,
	payload: {
		location,
		match,
	},
});

export const MAP_HREF = "MAP_HREF";

export const mapHref = (from, to) => ({
	type: MAP_HREF,
	payload: {
		from,
		to,
	},
});

export const REMOVE_TAB = "REMOVE_TAB";

export const removeTab = (module, path) => ({
	type: REMOVE_TAB,
	payload: { module, path },
});

export const SET_HREF_CONFIG = "SET_HREF_CONFIG";

export const setHrefConfig = (prependPath, prependHref, otherConfigs = {}) => ({
	type: SET_HREF_CONFIG,
	payload: { prependPath, prependHref, ...otherConfigs },
});

export const SET_CURRENT_PREPEND_PATH = "SET_CURRENT_PREPEND_PATH";

export const setCurrentPrependPath = prependPath => ({
	type: SET_CURRENT_PREPEND_PATH,
	payload: prependPath,
});

export const SET_CLOSING_TAB_HANDLER_ACTIONS = "SET_CLOSING_TAB_HANDLER_ACTIONS";

export const setClosingTabHandlerActions = (module, actions) => ({
	type: SET_CLOSING_TAB_HANDLER_ACTIONS,
	payload: {
		module,
		actions,
	},
});
