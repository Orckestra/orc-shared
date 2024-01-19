import { createSelector } from "reselect";

const scopesExtendedConfigurationData = state => state.get("scopesExtendedConfiguration");

export const doesScopeHaveGeolocationProviderSelector = scopeId => {
	return createSelector(scopesExtendedConfigurationData, scopesCfg => {
		return scopesCfg?.get(scopeId)?.get("hasGeolocationProvider") ?? false;
	});
};
