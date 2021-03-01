import { createSelector } from "reselect";

const versionInfo = state => state.get("versionInfo");

export const getVersionSelector = createSelector(versionInfo, data => data.get("version"));

export const getHelpUrlDefaultSelector = createSelector(versionInfo, data => data.get("defaultHelpUrl"));

export const getApplicationHelpUrlSelector = createSelector(versionInfo, data => data.get("moduleHelpUrls"));
