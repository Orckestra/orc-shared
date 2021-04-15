import { createSelector } from "reselect";
import Immutable from "immutable";
import { getCurrentScope } from "./navigation";
import { currentLocaleOrDefault } from "./locale";
import {
	normalizeForSearch,
	setTranslation,
	setTranslationWithFallbackValue,
	setTranslationWithFallbackField,
	memoize,
} from "../utils";
import { getLocalization } from "../utils/localizationHelper";

const scopeData = state => state.get("scopes");

const localizedScopesSelector = createSelector(scopeData, currentLocaleOrDefault, (scopes, locale) =>
	scopes.map(scope =>
		scope.withMutations(s => {
			setTranslationWithFallbackField(locale, s, "id", "name");
			setTranslation(locale, s, "description");
			setTranslation(locale, s, "currency", "displayName");
		}),
	),
);

export const currentScopeSelector = createSelector(
	getCurrentScope,
	localizedScopesSelector,
	(id, scopes) => scopes.get(id) || Immutable.Map(),
);

export const isCurrentScopeAuthorizedSelector = createSelector(getCurrentScope, localizedScopesSelector, (id, scopes) =>
	scopes.getIn([id, "isAuthorizedScope"], !scopes.count()),
);

const scopeFilter = state => state.getIn(["view", "scopeSelector", "filter"]);

const filteredScopesSelector = createSelector(scopeFilter, localizedScopesSelector, (filter, scopes) => {
	if (!filter) return scopes;
	const directHitScopes = scopes.filter(s => normalizeForSearch(s.get("name")).includes(normalizeForSearch(filter)));
	let foundScopes = Immutable.Map();
	directHitScopes.forEach(scope => {
		for (let parent = scope; parent; parent = scopes.get(parent.get("parentScopeId"))) {
			foundScopes = foundScopes.set(parent.get("id"), parent);
		}
	});
	if (foundScopes.size === 0) {
		foundScopes = foundScopes.set("Global", scopes.get("Global"));
	}
	return foundScopes;
});

export const scopeGetter = createSelector(filteredScopesSelector, scopes => id => {
	const scope = scopes.get(id);
	if (!scope) return null;
	return scope.toJS();
});

export const localizedScopesSelectorByIds = memoize(scopeIds =>
	createSelector(scopeData, currentLocaleOrDefault, (scopes, locale) => {
		let scopesMap = Immutable.Map();
		scopeIds.forEach(scopeId => {
			let scope = scopes.get(scopeId);
			if (scope != null) {
				scope = setTranslationWithFallbackField(locale, scope, "id", "name");
				scope = setTranslationWithFallbackValue(
					locale,
					scope,
					scope.getIn(["currency", "isoCode"]),
					"currency",
					"displayName",
				);
				scopesMap = scopesMap.set(scopeId, scope);
			}
		});

		return scopesMap;
	}),
);

export const localizedScopeSelector = memoize(key =>
	createSelector(scopeData, currentLocaleOrDefault, (scopes, locale) => {
		const name = scopes.getIn([key, "name"]);

		if (name == null) return null;

		return getLocalization(name.toJS(), locale, key);
	}),
);
