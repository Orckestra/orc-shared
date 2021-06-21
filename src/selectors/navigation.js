import { createSelector } from "reselect";
import Immutable from "immutable";
import { defaultScopeSelector } from "./settings";
import { getAllAfterPrependHref } from "../utils/parseHelper";

const getNavigationState = state => state.get("navigation");

const selectRoute = createSelector(getNavigationState, nav => nav.get("route"));

// const selectLocation = createSelector(
// 	selectRoute,
// 	route => route.get("location") || Immutable.Map(),
// );
const selectMatch = createSelector(selectRoute, route => route.get("match") || Immutable.Map());

export const selectRouteParams = createSelector(selectMatch, match => match.get("params") || Immutable.Map());

export const selectRoutePath = createSelector(selectMatch, match => match.get("path") || "");

export const selectRouteHref = createSelector(selectMatch, match => match.get("url") || "");

// Not a selector, as previous calls can change the result.
let lastScope;
export const resetLastScope = () => {
	lastScope = undefined;
};

const getLastRouteScope = state => {
	const params = selectRouteParams(state);
	if (params.get("scope")) {
		lastScope = params.get("scope");
	}
	return lastScope;
};

export const getCurrentScope = createSelector(
	getLastRouteScope,
	defaultScopeSelector,
	(id, defaultScope) => id || defaultScope || "Global",
);

export const getCurrentScopeFromRoute = createSelector(getLastRouteScope, scope => scope || null);

const selectTabs = createSelector(getNavigationState, nav => nav.get("tabIndex"));

export const selectTabGetter = createSelector(selectTabs, tabs => path => tabs.get(path));

const selectModuleLists = createSelector(getNavigationState, nav => nav.get("moduleTabs"));
const selectHrefConfig = createSelector(getNavigationState, state => state.get("config"));
const selectCurrentPrependPath = createSelector(getNavigationState, state => state.get("currentPrependPath"));

export const selectClosingTabHandlerActions = createSelector(getNavigationState, nav => {
	const moduleActions = nav.get("closingTabsHandlerActions")?.toJS() ?? {};

	return Object.values(moduleActions).reduce((a, b) => a.concat(b), []);
});

export const selectClosingTabHandlerActionForEntity = (module, entityId) =>
	createSelector(getNavigationState, nav => {
		const actions = nav.getIn(["closingTabsHandlerActions", module])?.toJS() ?? [];

		return actions.find(x => x.entityId === entityId)?.closeTab ?? null;
	});

export const selectPrependPathConfig = createSelector(
	selectHrefConfig,
	selectCurrentPrependPath,
	(config, currentPath) => currentPath || config.get("prependPath"),
);
export const selectPrependHrefConfig = createSelector(selectHrefConfig, config => name =>
	config.getIn([name, "prependHref"]) || config.get("prependHref"),
);

export const selectCurrentModuleName = createSelector(selectPrependPathConfig, selectRoutePath, (prependPath, path) =>
	new RegExp(`^${prependPath}`).test(path) ? path.replace(new RegExp(`^${prependPath}([^/]+)(/.*)?$`), "$1") : "",
);

export const selectCurrentSectionName = createSelector(
	selectPrependPathConfig,
	selectRoutePath,
	(prependPath, path) => {
		//strips the scope and module
		let segmentPath = path.replace(prependPath, "").replace(new RegExp(`^([^/]*/){1}`), "");

		//strips param paths
		while (segmentPath.includes(":") && segmentPath.includes("/")) {
			segmentPath = segmentPath.replace(new RegExp(`^([^/]*/){1}`), "");
		}

		//strips entity id and deeper pages
		return segmentPath.replace(new RegExp(`^([^/]*/){1}`), "").replace(new RegExp(`/.*$`), "");
	},
);

const selectCurrentModuleList = createSelector(
	selectModuleLists,
	selectCurrentModuleName,
	(lists, module) => lists.get(module) || Immutable.List(),
);

export const selectMappedCurrentModuleList = createSelector(selectCurrentModuleList, selectTabGetter, (list, getTab) =>
	list.map(getTab),
);

const segmentHrefMap = createSelector(getNavigationState, state => state.get("mappedHrefs"));

export const selectSegmentHrefMapper = createSelector(
	selectPrependPathConfig,
	segmentHrefMap,
	(prependPath, map) => href => {
		const otherPath = getAllAfterPrependHref(prependPath, href);
		const newPrependPath = href.replace(otherPath, "");

		const hrefMap = map.get(otherPath);
		return hrefMap ? newPrependPath.concat(hrefMap) : href;
	},
);

export const hasOpenedTabs = createSelector(selectModuleLists, lists => {
	if (!lists) {
		return false;
	}

	return lists.some((module, key) => {
		return module.some(tab => tab !== key);
	});
});
