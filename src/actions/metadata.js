import { makeActionTypes } from "./makeApiAction";
import makeOrcApiAction from "./makeOrcApiAction";
import {
	getCustomerLookupsRequest,
	getOrderLookupsRequest,
	getProductLookupsRequest,
	getCustomerDefinitionsRequest,
	getOrderDefinitionRequest,
	getProfileAttributeGroupsRequest,
	getProductDefinitionsRequest,
} from "./requestsApi";

export const lookupsPageLength = 20;

const GET_ORDER_LOOKUPS = "GET_ORDER_LOOKUPS";

export const [GET_ORDER_LOOKUPS_REQUEST, GET_ORDER_LOOKUPS_SUCCESS, GET_ORDER_LOOKUPS_FAILURE] =
	makeActionTypes(GET_ORDER_LOOKUPS);

export const getOrderLookups = () => makeOrcApiAction(GET_ORDER_LOOKUPS, getOrderLookupsRequest.buildUrl());

export const SET_PAGED_ORDER_LOOKUPS_CURRENT_INFO = "SET_PAGED_ORDER_LOOKUPS_CURRENT_INFO";

export const setPagedOrderLookupsCurrentInfo = (page = 1, resetList = false) => ({
	type: SET_PAGED_ORDER_LOOKUPS_CURRENT_INFO,
	payload: {
		nextPageToLoad: page,
		resetList: resetList,
	},
});

export const REFRESH_PAGED_ORDER_LOOKUPS = "REFRESH_PAGED_ORDER_LOOKUPS";

export const refreshPagedOrderLookups = () => ({
	type: REFRESH_PAGED_ORDER_LOOKUPS,
});

export const INCREMENT_ORDER_LOOKUPS_PAGE = "INCREMENT_ORDER_LOOKUPS_PAGE";

export const incrementOrderLookupsPage = pageToLoad => ({
	type: INCREMENT_ORDER_LOOKUPS_PAGE,
	pageToLoad: pageToLoad,
});

const GET_CUSTOMER_LOOKUPS = "GET_CUSTOMER_LOOKUPS";

export const [GET_CUSTOMER_LOOKUPS_REQUEST, GET_CUSTOMER_LOOKUPS_SUCCESS, GET_CUSTOMER_LOOKUPS_FAILURE] =
	makeActionTypes(GET_CUSTOMER_LOOKUPS);

export const getCustomerLookups = () => makeOrcApiAction(GET_CUSTOMER_LOOKUPS, getCustomerLookupsRequest.buildUrl());

const GET_PRODUCT_LOOKUPS = "GET_PRODUCT_LOOKUPS";

export const [GET_PRODUCT_LOOKUPS_REQUEST, GET_PRODUCT_LOOKUPS_SUCCESS, GET_PRODUCT_LOOKUPS_FAILURE] =
	makeActionTypes(GET_PRODUCT_LOOKUPS);

export const getProductLookups = () => makeOrcApiAction(GET_PRODUCT_LOOKUPS, getProductLookupsRequest.buildUrl());

const GET_CUSTOMER_DEFINITIONS = "GET_CUSTOMER_DEFINITIONS";
export const [GET_CUSTOMER_DEFINITIONS_REQUEST, GET_CUSTOMER_DEFINITIONS_SUCCESS, GET_CUSTOMER_DEFINITIONS_FAILURE] =
	makeActionTypes(GET_CUSTOMER_DEFINITIONS);

export const getCustomerDefinitions = () =>
	makeOrcApiAction(GET_CUSTOMER_DEFINITIONS, getCustomerDefinitionsRequest.buildUrl());

const GET_ORDER_DEFINITIONS = "GET_ORDER_DEFINITIONS";
export const [GET_ORDER_DEFINITIONS_REQUEST, GET_ORDER_DEFINITIONS_SUCCESS, GET_ORDER_DEFINITIONS_FAILURE] =
	makeActionTypes(GET_ORDER_DEFINITIONS);

export const getOrderDefinitions = () => makeOrcApiAction(GET_ORDER_DEFINITIONS, getOrderDefinitionRequest.buildUrl());

const GET_PRODUCT_DEFINITIONS = "GET_PRODUCT_DEFINITIONS";
export const [GET_PRODUCT_DEFINITIONS_REQUEST, GET_PRODUCT_DEFINITIONS_SUCCESS, GET_PRODUCT_DEFINITIONS_FAILURE] =
	makeActionTypes(GET_PRODUCT_DEFINITIONS);

export const getProductDefinitions = () =>
	makeOrcApiAction(GET_PRODUCT_DEFINITIONS, getProductDefinitionsRequest.buildUrl());

const GET_PROFILE_ATTRIBUTE_GROUPS = "GET_PROFILE_ATTRIBUTE_GROUPS";
export const [
	GET_PROFILE_ATTRIBUTE_GROUPS_REQUEST,
	GET_PROFILE_ATTRIBUTE_GROUPS_SUCCESS,
	GET_PROFILE_ATTRIBUTE_GROUPS_FAILURE,
] = makeActionTypes(GET_PROFILE_ATTRIBUTE_GROUPS);

export const getProfileAttributeGroups = () =>
	makeOrcApiAction(GET_PROFILE_ATTRIBUTE_GROUPS, getProfileAttributeGroupsRequest.buildUrl());

export const SET_PAGED_CUSTOMER_LOOKUPS_CURRENT_INFO = "SET_PAGED_CUSTOMER_LOOKUPS_CURRENT_INFO";
export const setPagedCustomerLookupsCurrentInfo = (page = 1, resetList = false) => ({
	type: SET_PAGED_CUSTOMER_LOOKUPS_CURRENT_INFO,
	payload: {
		nextPageToLoad: page,
		resetList: resetList,
	},
});

export const REFRESH_PAGED_CUSTOMER_LOOKUPS = "REFRESH_PAGED_CUSTOMER_LOOKUPS ";
export const refreshPagedCustomerLookups = () => ({
	type: REFRESH_PAGED_CUSTOMER_LOOKUPS,
});

export const INCREMENT_CUSTOMER_LOOKUPS_PAGE = "INCREMENT_CUSTOMER_LOOKUPS_PAGE";
export const incrementCustomerLookupsPage = pageToLoad => ({
	type: INCREMENT_CUSTOMER_LOOKUPS_PAGE,
	pageToLoad: pageToLoad,
});
