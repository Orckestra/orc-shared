import { createSelector } from "reselect";

const modulesData = state => state.get("modules");

export const modulesSelector = createSelector(modulesData, data => data.getIn(["tree"]));

export const getScopeModuleInformationSelector = createSelector(modulesData, data => {
	return {
		visibleModules: data.getIn(["visibleModules"]).toJS(),
		...data.getIn(["lastScopeAndModuleSelection"]).toJS(),
	};
});
