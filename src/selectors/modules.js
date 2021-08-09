import { createSelector } from "reselect";

const modulesData = state => state.get("modules");

export const modulesSelector = createSelector(modulesData, data => data.getIn(["tree"]));
