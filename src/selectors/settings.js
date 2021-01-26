import { createSelector } from "reselect";

const settingsData = state => state.get("settings");

export const defaultAppId = createSelector(settingsData, data => data.get("defaultApp"));

export const defaultScopeSelector = createSelector(settingsData, data => data.get("defaultScope"));
