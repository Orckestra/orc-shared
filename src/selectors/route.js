import { createSelector } from "reselect";
import Immutable from "immutable";

const routerData = state => state.get("router");

export const routeSelector = createSelector(
	routerData,
	router => router.get("route"),
);

export const resultSelector = createSelector(
	routerData,
	router => router.get("result") || Immutable.Map(),
);

export const paramSelector = createSelector(
	routerData,
	router => router.get("params") || Immutable.Map(),
);

export const selectLocation = createSelector(
	routerData,
	router => router.get("location"),
);

// Not a selector, as previous calls can change the result.
let lastScope;
export const resetLastScope = () => {
	lastScope = undefined;
};
export const getCurrentScope = state => {
	const params = paramSelector(state);
	if (params.get("scope")) {
		lastScope = params.get("scope");
	}
	return lastScope || "Global";
};
