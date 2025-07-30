/* istanbul ignore file */

import { buildUrl } from "../utils/buildUrl";

export const createCustomerLookupTypeDefinitionRequest = {
	name: "createCustomerLookupTypeDefinitionRequest",
	buildUrl: lookupName => buildUrl(["metadata", "lookups", "customer", lookupName]),
	verb: "POST",
};

export const createEntityTypeRequest = {
	name: "createEntityTypeRequest",
	buildUrl: entityTypeName => buildUrl(["metadata", "EntityType", entityTypeName]),
	verb: "POST",
};

export const createOrderLookupTypeDefinitionRequest = {
	name: "createOrderLookupTypeDefinitionRequest",
	buildUrl: lookupName => buildUrl(["metadata", "lookups", "order", lookupName]),
	verb: "POST",
};

export const deleteTaskInfoRequest = {
	name: "deleteTaskInfoRequest",
	buildUrl: (taskId, queryParams) => buildUrl(["tasks", taskId], queryParams),
	verb: "DELETE",
};

export const getApplicationModules = {
	name: "getApplicationModules",
	buildUrl: applicationName => buildUrl(["modules", "byApplicationName", applicationName]),
	verb: "GET",
};

export const getAuthorizedApplicationsRequest = {
	name: "getAuthorizedApplicationsRequest",
	buildUrl: () => buildUrl(["my", "applications"]),
	verb: "GET",
};

export const getCountriesRequest = {
	name: "getCountriesRequest",
	buildUrl: queryParams => buildUrl(["countries"], queryParams),
	verb: "GET",
};

export const getCustomerDefinitionsRequest = {
	name: "getCustomerDefinitionsRequest",
	buildUrl: queryParams => buildUrl(["metadata", "definitions", "customer"], queryParams),
	verb: "GET",
};

export const getCustomerLookupRequest = {
	name: "getCustomerLookupRequest",
	buildUrl: lookupName => buildUrl(["metadata", "lookups", "customer", lookupName]),
	verb: "GET",
};

export const getCustomerLookupsRequest = {
	name: "getCustomerLookupsRequest",
	buildUrl: () => buildUrl(["metadata", "lookups", "customer"]),
	verb: "GET",
};

export const getOrderAttributeGroupsRequest = {
	name: "getOrderAttributeGroupsRequest",
	buildUrl: () => buildUrl(["metadata", "attributegroups", "order"]),
	verb: "GET",
};

export const getOrderDefinitionRequest = {
	name: "getOrderDefinitionRequest",
	buildUrl: (name, queryParams) => buildUrl(["metadata", "definitions", "order", name], queryParams),
	verb: "GET",
};

export const getOrderLookupRequest = {
	name: "getOrderLookupRequest",
	buildUrl: lookupName => buildUrl(["metadata", "lookups", "order", lookupName]),
	verb: "GET",
};

export const getOrderLookupsRequest = {
	name: "getOrderLookupsRequest",
	buildUrl: () => buildUrl(["metadata", "lookups", "order"]),
	verb: "GET",
};

export const getProductDefinitionsRequest = {
	name: "getProductDefinitionsRequest",
	buildUrl: queryParams => buildUrl(["products", "definitions"], queryParams),
	verb: "GET",
};

export const getProductLookupsRequest = {
	name: "getProductLookupsRequest",
	buildUrl: () => buildUrl(["metadata", "lookups", "product"]),
	verb: "GET",
};

export const getProfileAttributeGroupsRequest = {
	name: "getProfileAttributeGroupsRequest",
	buildUrl: () => buildUrl(["metadata", "attributegroups", "profile"]),
	verb: "GET",
};

export const getRequesterTasksInfoRequest = {
	name: "getRequesterTasksInfoRequest",
	buildUrl: queryParams => buildUrl(["tasks"], queryParams),
	verb: "GET",
};

export const getScopeExtendedConfigurationRequest = {
	name: "getScopeExtendedConfigurationRequest",
	buildUrl: scopeId => buildUrl(["scopes", scopeId, "extendedConfiguration"]),
	verb: "GET",
};

export const getSupportedCulturesRequest = {
	name: "getSupportedCulturesRequest",
	buildUrl: () => buildUrl(["cultures"]),
	verb: "GET",
};

export const getTaskExecutionLogsRequest = {
	name: "getTaskExecutionLogsRequest",
	buildUrl: taskId => buildUrl(["tasks", taskId, "logs"]),
	verb: "GET",
};

export const getTaskInfoRequest = {
	name: "getTaskInfoRequest",
	buildUrl: taskId => buildUrl(["tasks", taskId]),
	verb: "GET",
};

export const getTimeZonesRequest = {
	name: "getTimeZonesRequest",
	buildUrl: () => buildUrl(["timezones"]),
	verb: "GET",
};

export const getUserApplicationRequest = {
	name: "getUserApplicationRequest",
	buildUrl: () => buildUrl(["my", "application"]),
	verb: "GET",
};

export const getUserCultureRequest = {
	name: "getUserCultureRequest",
	buildUrl: () => buildUrl(["my", "culture"]),
	verb: "GET",
};

export const getUserPermissionsRequest = {
	name: "getUserPermissionsRequest",
	buildUrl: () => buildUrl(["authentication", "profile"]),
	verb: "GET",
};

export const getUserScopeRequest = {
	name: "getUserScopeRequest",
	buildUrl: module => buildUrl(["my", "scope", module]),
	verb: "GET",
};

export const getUserScopeTreeRequest = {
	name: "getUserScopeTreeRequest",
	buildUrl: (module, queryParams) => buildUrl(["my", "scope", module, "tree"], queryParams),
	verb: "GET",
};

export const getVersionInfoRequest = {
	name: "getVersionInfoRequest",
	buildUrl: queryParams => buildUrl(["diagnostic", "versioninfo"], queryParams),
	verb: "GET",
};

export const saveUserApplicationRequest = {
	name: "saveUserApplicationRequest",
	buildUrl: applicationId => buildUrl(["my", "application", applicationId]),
	verb: "POST",
};

export const saveUserCultureRequest = {
	name: "saveUserCultureRequest",
	buildUrl: cultureIso => buildUrl(["my", "culture", cultureIso]),
	verb: "POST",
};

export const signOutRequest = {
	name: "signOutRequest",
	buildUrl: () => buildUrl(["authentication", "signout"]),
	verb: "POST",
};

export const updateCustomerLookupTypeDefinitionRequest = {
	name: "updateCustomerLookupTypeDefinitionRequest",
	buildUrl: lookupName => buildUrl(["metadata", "lookups", "customer", lookupName]),
	verb: "PUT",
};

export const updateEntityTypeRequest = {
	name: "updateEntityTypeRequest",
	buildUrl: entityTypeName => buildUrl(["metadata", "EntityType", entityTypeName]),
	verb: "PUT",
};

export const updateOrderLookupTypeDefinitionRequest = {
	name: "updateOrderLookupTypeDefinitionRequest",
	buildUrl: lookupName => buildUrl(["metadata", "lookups", "order", lookupName]),
	verb: "PUT",
};
