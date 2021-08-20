import { createSelector } from "reselect";
import Immutable from "immutable";
import { setTranslation, memoize } from "../utils";
import { setTranslationWithFallbackField } from "../utils/setTranslationWithFallback";
import { currentLocaleOrDefault } from "../selectors/locale";
import { getLocalization } from "../utils/localizationHelper";
import { getPropertyOrDefault } from "../utils/propertyHelper";
import { ORDER_MODULE_NAME } from "../reducers/metadata";
import { attributeDataType, definitionType } from "../constants";
import { each, camelCase } from "lodash";

const metadata = state => state.get("metadata");

const lookups = createSelector(metadata, meta => meta.get("lookups"));

const lookupsModule = memoize(moduleName => createSelector(lookups, lookups => lookups.get(moduleName)));

export const lookupSelector = memoize(moduleName =>
	createSelector(lookupsModule(moduleName), module => module.get("index")),
);

export const lookupValuesSelector = memoize((moduleName, lookupName) =>
	createSelector(lookups, lookups => lookups.getIn([moduleName, "index", lookupName]) || Immutable.Map()),
);

export const namedLookupSelector = memoize((moduleName, lookupName) =>
	createSelector(
		lookupSelector(moduleName),
		currentLocaleOrDefault,
		(lookups, locale) => setTranslation(locale, lookups.get(lookupName), "displayName") || Immutable.Map(),
	),
);

export const namedLookupValuesSelector = memoize((moduleName, lookupName) =>
	createSelector(namedLookupSelector(moduleName, lookupName), currentLocaleOrDefault, (statuses, locale) =>
		(statuses.get("values") || Immutable.Map()).map(status => setTranslation(locale, status, "displayName")),
	),
);

export const selectCurrentLookupDetails = memoize((moduleName, lookupName) =>
	namedLookupSelector(moduleName, lookupName),
);

export const namedLookupLocalizedSelector = memoize((moduleName, lookupName, key, defaultValue = key) =>
	createSelector(lookupValuesSelector(moduleName, lookupName), currentLocaleOrDefault, (lookups, locale) => {
		const values = lookups.get("values");
		if (values == null || key == null) return getLocalization(null, locale, defaultValue);
		const value = getPropertyOrDefault(values.toJS(), key, defaultValue, true);
		return getLocalization(value?.displayName, locale, defaultValue);
	}),
);

export const namedLookupLocalizedValuesSelector = memoize((moduleName, lookupName) =>
	createSelector(lookupValuesSelector(moduleName, lookupName), currentLocaleOrDefault, (lookup, locale) =>
		(lookup.get("values") || Immutable.Map()).map(lookupValue =>
			getLocalization(lookupValue.get("displayName"), locale, lookupValue.get("value")),
		),
	),
);

export const lookupsListCurrentInfo = memoize(moduleName =>
	createSelector(lookupsModule(moduleName), data => ({
		currentPage: data.get("currentPage") ?? 1,
		totalCount: data.get("index").size,
	})),
);

export const lookupsNextPageToLoad = memoize(moduleName =>
	createSelector(lookupsModule(moduleName), data => data.get("nextPageToLoad")),
);

export const lookupsListSelector = memoize(moduleName =>
	createSelector(lookupsModule(moduleName), module => module.get("list")),
);

export const mappedLookupListSelector = memoize(moduleName =>
	createSelector(lookupSelector(moduleName), lookupsListSelector(moduleName), (index, list) =>
		list
			.map(id => index.get(id))
			.filter(Boolean)
			.map(item => item.set("id", item.get("lookupName"))),
	),
);

export const orderLookupsListCurrentInfo = lookupsListCurrentInfo(ORDER_MODULE_NAME);

export const orderLookupsNextPageToLoad = lookupsNextPageToLoad(ORDER_MODULE_NAME);

export const mappedOrderLookupsListSelector = mappedLookupListSelector(ORDER_MODULE_NAME);

/***  DEFINITIONS  ***/
const definitions = createSelector(metadata, meta => meta.get("definitions"));
const definitionsModule = memoize(moduleName =>
	createSelector(definitions, definitions => definitions.get(moduleName) ?? Immutable.Map()),
);

export const mappedDefinitionsListSelector = memoize(moduleName =>
	createSelector(
		definitionsModule(moduleName),
		currentLocaleOrDefault,
		(definitions, locale, key, defaultValue = key) => {
			return definitions.map(definition => {
				return definition
					.set("type", definition.get("isSharedEntity") === true ? definitionType.shared : definitionType.embedded)
					.set("displayName", getLocalization(definition?.get("displayName"), locale, defaultValue))
					.delete("attributes");
			});
		},
	),
);

export const mappedCustomDefinitionsListSelector = memoize(moduleName =>
	createSelector(mappedDefinitionsListSelector(moduleName), definitions =>
		definitions.filter(a => a.get("isBuiltIn") === false),
	),
);

export const mappedBaseDefinitionsListSelector = memoize(moduleName =>
	createSelector(mappedDefinitionsListSelector(moduleName), definitions =>
		definitions.filter(a => a.get("isBuiltIn") === true),
	),
);

export const newProfileDefinitionInstanceSelector = () =>
	createSelector(definitions, data => data.get("newInstance") || null);

export const newProfileDefinitionNameSelector = createSelector(definitions, data => data.get("newInstanceId"));

export const definitionEntity = memoize((moduleName, entityName) =>
	createSelector(definitionsModule(moduleName), definition => definition.getIn([entityName]) || Immutable.Map()),
);

export const mappedDefinitionEntity = memoize((moduleName, entityName) =>
	createSelector(definitionEntity(moduleName, entityName), currentLocaleOrDefault, (definition, locale) =>
		setTranslationWithFallbackField(locale, definition, "entityTypeName", "displayName"),
	),
);

const definitionEntityAttributes = memoize((moduleName, entityName) =>
	createSelector(
		definitionEntity(moduleName, entityName),
		definition => definition.get("attributes") || Immutable.List(),
	),
);

export const mappedDefinitionAttributesSelector = memoize((moduleName, entityName) =>
	createSelector(definitionEntityAttributes(moduleName, entityName), currentLocaleOrDefault, (attributes, locale) =>
		attributes.map(a => setTranslationWithFallbackField(locale, a, "name", "displayName")),
	),
);

export const customAttributesSelector = memoize((moduleName, entityName) =>
	createSelector(mappedDefinitionAttributesSelector(moduleName, entityName), attributes =>
		attributes.filter(a => a.get("isBuiltIn") === false),
	),
);

export const baseAttributesSelector = memoize((moduleName, entityName) =>
	createSelector(mappedDefinitionAttributesSelector(moduleName, entityName), attributes =>
		attributes.filter(a => a.get("isBuiltIn") === true),
	),
);

export const profileAttributeGroupsSelector = createSelector(metadata, currentLocaleOrDefault, (meta, locale) => {
	const groups = meta.get("profileAttributeGroups");
	return !groups?.size ? null : groups?.map(x => setTranslationWithFallbackField(locale, x, "name", "displayName"));
});

export const groupedCustomAttributesDefinitionSelector = memoize((moduleName, entityName) =>
	createSelector(
		profileAttributeGroupsSelector,
		customAttributesSelector(moduleName, entityName),
		currentLocaleOrDefault,
		(allProfileAttributeGroups, attributes) =>
			attributes
				.groupBy(item => item.get("groupId"))
				.map(group => {
					const groupId = group.first().get("groupId");
					const profileAttributeGroup = allProfileAttributeGroups?.get(groupId);
					return Immutable.fromJS({
						id: groupId,
						name: profileAttributeGroup?.get("displayName"),
						displayOrder: profileAttributeGroup?.get("displayOrder"),
					})
						.set(
							"baseAttributes",
							group.filter(i => i.get("dataType") !== attributeDataType.entityReference),
						)
						.set(
							"profileAttributes",
							group.filter(i => i.get("dataType") === attributeDataType.entityReference),
						);
				})
				.sortBy(x => x.get("displayOrder")),
	),
);

export const customAttributesDefinitionSelector = memoize((moduleName, profileEntityName) =>
	createSelector(
		mappedDefinitionEntity(moduleName, profileEntityName),
		customAttributesSelector(moduleName, profileEntityName),
		(definition, attributes) => {
			const profileAttributes = attributes?.filter(a => a.get("dataType") === attributeDataType.entityReference);
			const baseAttributes = attributes?.filter(a => a.get("dataType") !== attributeDataType.entityReference);
			return definition.set("baseAttributes", baseAttributes).set("profileAttributes", profileAttributes);
		},
	),
);

export const customProfileTypesSelector = memoize(() =>
	createSelector(definitionsModule("customer"), types =>
		types.filter(t => t.get("isBuiltIn") === false && t.get("isSharedEntity") === true),
	),
);

export const productPropertyMapSelector = memoize(definitionName =>
	createSelector(definitionEntity("product", definitionName), immutableProductDefinition => {
		const productDefinition = immutableProductDefinition.toJS();
		const propertyMap = {};

		each(productDefinition.properties, property => {
			const name = camelCase(property.propertyName);
			propertyMap[name] = property;
		});

		each(productDefinition.propertyGroups, group => {
			each(group.properties, property => {
				const name = camelCase(property.propertyName);
				propertyMap[name] = property;
			});
		});

		each(productDefinition.variantProperties, property => {
			const name = camelCase(property.propertyName);
			propertyMap[name] = property;
		});

		return propertyMap;
	}),
);

export const variantPropertyMapKvaSelector = memoize(definitionName =>
	createSelector(definitionEntity("product", definitionName), immutableProductDefinition => {
		const productDefinition = immutableProductDefinition.toJS();
		const propertyMap = {};

		each(productDefinition.variantProperties, property => {
			if (property.isKeyVariant) {
				const name = camelCase(property.propertyName);
				propertyMap[name] = property;
			}
		});

		return propertyMap;
	}),
);

export const productPropertyValueSelector = memoize(({ definitionName }, propertyName, propertyValue) =>
	createSelector(
		productPropertyMapSelector(definitionName),
		lookupSelector("product"),
		currentLocaleOrDefault,
		(propertyMap, lookups, locale) => {
			const property = propertyMap[camelCase(propertyName)];
			return resolveProductPropertyValue(property, propertyValue, locale, lookups);
		},
	),
);

export const productPropertyValuesSelector = memoize(({ definitionName }, propertyBag) =>
	createSelector(
		productPropertyMapSelector(definitionName),
		lookupSelector("product"),
		currentLocaleOrDefault,
		(propertyMap, lookups, locale) => {
			if (propertyBag != null) {
				return Object.keys(propertyBag).reduce(
					(acc, rec) => ({
						...acc,
						[rec]: resolveProductPropertyValue(propertyMap[camelCase(rec)], propertyBag[rec], locale, lookups),
					}),
					{},
				);
			}
			return null;
		},
	),
);

export const variantPropertyKeyValuesSelector = memoize(({ definitionName }, propertyBag) =>
	createSelector(
		variantPropertyMapKvaSelector(definitionName),
		lookupSelector("product"),
		currentLocaleOrDefault,
		(propertyMap, lookups, locale) => {
			if (propertyBag != null) {
				return Object.keys(propertyBag).reduce(
					(acc, rec) =>
						propertyMap[camelCase(rec)]
							? {
									...acc,
									[rec]: resolveProductPropertyValue(propertyMap[camelCase(rec)], propertyBag[rec], locale, lookups),
							  }
							: acc,
					{},
				);
			}
			return null;
		},
	),
);

const resolveProductPropertyValue = (property, propertyValue, locale, lookups) => {
	if (property != null) {
		switch (property.dataType) {
			case "Lookup":
				const lookupName = property.lookupDefinition?.lookupName;
				const lookup = lookups?.get(lookupName);
				const lookupValue = lookup?.get("values")?.get(propertyValue);
				return getLocalization(lookupValue?.get("displayName"), locale, lookupValue?.get("value"));
			default:
				return propertyValue;
		}
	}
	return propertyValue;
};

export const saveOrderLookupRequestStateSelector = createSelector(metadata, data => ({
	requestState: data.getIn(["lookups", "saveOrderLookupRequestState"]),
	response: data.getIn(["lookups", "saveOrderLookupResponse"])?.toJS() ?? null,
}));

export const saveCustomerLookupRequestStateSelector = createSelector(metadata, data => ({
	requestState: data.getIn(["lookups", "saveCustomerLookupRequestState"]),
	response: data.getIn(["lookups", "saveCustomerLookupResponse"])?.toJS() ?? null,
}));
