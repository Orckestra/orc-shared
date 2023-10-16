import { createSelector } from "reselect";

const scopeRouteStateData = state => state.get("scopeRouteState");

export const getScopeChangeInProgress = createSelector(scopeRouteStateData, data => data.get("scopeChangeInProgress"));
