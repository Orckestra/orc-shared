import { createSelector } from "reselect";
import Immutable from "immutable";
import { resultSelector } from "./route";

const getNavigationState = state => state.get("navigation");

const selectTabs = createSelector(getNavigationState, nav =>
	nav.get("tabIndex"),
);

export const selectTabGetter = createSelector(selectTabs, tabs => path =>
	tabs.get(path),
);

const selectModuleLists = createSelector(getNavigationState, nav =>
	nav.get("moduleTabs"),
);

const getModuleName = result =>
	(result && (result.get("module") || getModuleName(result.get("parent")))) ||
	"";
export const selectCurrentModuleName = createSelector(
	resultSelector,
	getModuleName,
);

const selectCurrentModuleList = createSelector(
	selectModuleLists,
	selectCurrentModuleName,
	(lists, module) => lists.get(module) || Immutable.List(),
);

export const selectMappedCurrentModuleList = createSelector(
	selectCurrentModuleList,
	selectTabGetter,
	(list, getTab) => list.map(getTab),
);
