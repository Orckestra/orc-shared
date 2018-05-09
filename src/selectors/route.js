import { createSelector } from "reselect";
import Immutable from "immutable";

const routerData = state => state.get("router");

export const routeSelector = createSelector(routerData, router =>
	router.get("route"),
);

export const resultSelector = createSelector(
	routerData,
	router => router.get("result") || Immutable.Map(),
);

export const paramSelector = createSelector(
	routerData,
	router => router.get("params") || Immutable.Map(),
);
