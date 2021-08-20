import Immutable from "immutable";
import { normalize } from "normalizr";
import { definitionsListSchema } from "../schemas/definitions";
import { profileAttributeGroupsListSchema } from "../schemas/metadata";
import { productDefinitionsListSchema } from "../schemas/productDefinitions";
import {
	GET_ORDER_LOOKUPS_SUCCESS,
	GET_CUSTOMER_LOOKUPS_SUCCESS,
	GET_PRODUCT_LOOKUPS_SUCCESS,
	REFRESH_PAGED_ORDER_LOOKUPS,
	SET_PAGED_ORDER_LOOKUPS_CURRENT_INFO,
	lookupsPageLength,
	INCREMENT_ORDER_LOOKUPS_PAGE,
	GET_CUSTOMER_DEFINITIONS_SUCCESS,
	GET_ORDER_DEFINITIONS_SUCCESS,
	GET_PROFILE_ATTRIBUTE_GROUPS_SUCCESS,
	GET_PRODUCT_DEFINITIONS_SUCCESS,
	INCREMENT_CUSTOMER_LOOKUPS_PAGE,
	REFRESH_PAGED_CUSTOMER_LOOKUPS,
	SET_PAGED_CUSTOMER_LOOKUPS_CURRENT_INFO,
	SAVE_ORDER_LOOKUP_REQUEST,
	SAVE_ORDER_LOOKUP_SUCCESS,
	SAVE_ORDER_LOOKUP_FAILURE,
	RESET_ORDER_LOOKUP_SAVE_RESULT,
	SAVE_CUSTOMER_LOOKUP_REQUEST,
	SAVE_CUSTOMER_LOOKUP_SUCCESS,
	SAVE_CUSTOMER_LOOKUP_FAILURE,
	RESET_CUSTOMER_LOOKUP_SAVE_RESULT,
	CREATE_PROFILE_DEFINITION_SUCCESS,
	CREATE_PROFILE_DEFINITION_FAILURE,
	RESET_PROFILE_DEFINITION_SAVE_RESULT,
	SET_NEW_PROFILE_DEFINITION,
} from "../actions/metadata";
import { requestStates } from "../constants";

export const ORDER_MODULE_NAME = "order";
export const CUSTOMER_MODULE_NAME = "customer";
export const PRODUCT_MODULE_NAME = "product";

const arrayToIndex = (items, keyField) =>
	items.reduce((index, item) => {
		const key = item[keyField];
		index[key] = item;
		return index;
	}, {});

const initialState = Immutable.fromJS({
	lookups: {
		order: {
			index: {},
			list: [],
		},
		saveOrderLookupRequestState: requestStates.idle,
		saveOrderLookupResponse: null,
		customer: {
			index: {},
			list: [],
		},
		saveCustomerLookupRequestState: requestStates.idle,
		saveCustomerLookupResponse: null,
		product: {
			index: {},
			list: [],
		},
	},
	definitions: {
		customer: {},
		order: {},
		product: {},
	},
});

const lookupReducerHelper = {
	incrementPage: (moduleName, state, action) => {
		return state.setIn(["lookups", moduleName, "nextPageToLoad"], action.pageToLoad);
	},
	getPagedLookups: (moduleName, state, action) => {
		const page = state.getIn(["lookups", moduleName, "nextPageToLoad"]) ?? 1;
		const index = state.getIn(["lookups", moduleName, "index"]);
		const [...keys] = index.keys();
		const pagedKeys = keys
			.sort((a, b) => a?.toLowerCase().localeCompare(b?.toLowerCase()))
			.slice(0, page * lookupsPageLength);
		const pagedList = pagedKeys.filter(id => index.get(id));

		return state
			.setIn(["lookups", moduleName, "list"], Immutable.fromJS(pagedList))
			.setIn(["lookups", moduleName, "totalCount"], index.size);
	},
	setPagedCurrentInfo: (moduleName, state, action) => {
		const nextPageToLoad = action.payload.resetList ? 1 : action.payload.nextPageToLoad;
		const currentPage = action.payload.resetList ? null : nextPageToLoad;

		return state.mergeIn(
			["lookups", moduleName],
			Immutable.fromJS({
				currentPage: currentPage,
				nextPageToLoad: nextPageToLoad,
			}),
		);
	},
	getLookupsQuerySuccess: (moduleName, state, action) => {
		return state.withMutations(s => {
			action.payload.forEach(lookup => {
				lookup.values = arrayToIndex(lookup.values, "value");
				s.setIn(["lookups", moduleName, "index", lookup.lookupName], Immutable.fromJS(lookup));
			});
		});
	},
};

const metadataReducer = (state = initialState, action) => {
	switch (action.type) {
		case INCREMENT_ORDER_LOOKUPS_PAGE: {
			return lookupReducerHelper.incrementPage(ORDER_MODULE_NAME, state, action);
		}
		case REFRESH_PAGED_ORDER_LOOKUPS: {
			return lookupReducerHelper.getPagedLookups(ORDER_MODULE_NAME, state, action);
		}
		case SET_PAGED_ORDER_LOOKUPS_CURRENT_INFO: {
			return lookupReducerHelper.setPagedCurrentInfo(ORDER_MODULE_NAME, state, action);
		}
		case GET_ORDER_LOOKUPS_SUCCESS: {
			return lookupReducerHelper.getLookupsQuerySuccess(ORDER_MODULE_NAME, state, action);
		}
		case INCREMENT_CUSTOMER_LOOKUPS_PAGE: {
			return lookupReducerHelper.incrementPage(CUSTOMER_MODULE_NAME, state, action);
		}
		case REFRESH_PAGED_CUSTOMER_LOOKUPS: {
			return lookupReducerHelper.getPagedLookups(CUSTOMER_MODULE_NAME, state, action);
		}
		case SET_PAGED_CUSTOMER_LOOKUPS_CURRENT_INFO: {
			return lookupReducerHelper.setPagedCurrentInfo(CUSTOMER_MODULE_NAME, state, action);
		}
		case GET_CUSTOMER_LOOKUPS_SUCCESS: {
			return lookupReducerHelper.getLookupsQuerySuccess(CUSTOMER_MODULE_NAME, state, action);
		}
		case GET_PRODUCT_LOOKUPS_SUCCESS: {
			return lookupReducerHelper.getLookupsQuerySuccess(PRODUCT_MODULE_NAME, state, action);
		}
		case GET_CUSTOMER_DEFINITIONS_SUCCESS: {
			const normalizedDefinitons = normalize(action.payload, definitionsListSchema);
			return state.setIn(
				["definitions", CUSTOMER_MODULE_NAME],
				Immutable.fromJS(normalizedDefinitons.entities.definitions),
			);
		}
		case GET_ORDER_DEFINITIONS_SUCCESS: {
			const normalizedDefinitons = normalize(action.payload, definitionsListSchema);
			return state.setIn(
				["definitions", ORDER_MODULE_NAME],
				Immutable.fromJS(normalizedDefinitons.entities.definitions),
			);
		}
		case GET_PRODUCT_DEFINITIONS_SUCCESS: {
			const normalizedDefinitons = normalize(action.payload, productDefinitionsListSchema);
			return state.setIn(
				["definitions", PRODUCT_MODULE_NAME],
				Immutable.fromJS(normalizedDefinitons.entities.definitions),
			);
		}
		case GET_PROFILE_ATTRIBUTE_GROUPS_SUCCESS: {
			const normalizedData = normalize(action.payload?.profileAttributeGroups, profileAttributeGroupsListSchema);
			return state.set("profileAttributeGroups", Immutable.fromJS(normalizedData.entities.metadata));
		}
		case SAVE_ORDER_LOOKUP_REQUEST:
			return state.setIn(["lookups", "saveOrderLookupRequestState"], requestStates.processing);

		case SAVE_ORDER_LOOKUP_SUCCESS:
			return state
				.setIn(["lookups", ORDER_MODULE_NAME, "index", action.payload.lookupName], Immutable.fromJS(action.payload))
				.setIn(["lookups", "saveOrderLookupRequestState"], requestStates.success);

		case SAVE_ORDER_LOOKUP_FAILURE:
			return state
				.setIn(["lookups", "saveOrderLookupRequestState"], requestStates.fail)
				.setIn(["lookups", "saveOrderLookupResponse"], Immutable.fromJS(action.payload.response));

		case RESET_ORDER_LOOKUP_SAVE_RESULT: {
			return state
				.setIn(["lookups", "saveOrderLookupRequestState"], requestStates.idle)
				.setIn(["lookups", "saveOrderLookupResponse"], null);
		}

		case SAVE_CUSTOMER_LOOKUP_REQUEST:
			return state.setIn(["lookups", "saveCustomerLookupRequestState"], requestStates.processing);

		case SAVE_CUSTOMER_LOOKUP_SUCCESS:
			return state
				.setIn(["lookups", CUSTOMER_MODULE_NAME, "index", action.payload.lookupName], Immutable.fromJS(action.payload))
				.setIn(["lookups", "saveCustomerLookupRequestState"], requestStates.success);

		case SAVE_CUSTOMER_LOOKUP_FAILURE:
			return state
				.setIn(["lookups", "saveCustomerLookupRequestState"], requestStates.fail)
				.setIn(["lookups", "saveCustomerLookupResponse"], Immutable.fromJS(action.payload.response));

		case RESET_CUSTOMER_LOOKUP_SAVE_RESULT: {
			return state
				.setIn(["lookups", "saveCustomerLookupRequestState"], requestStates.idle)
				.setIn(["lookups", "saveCustomerLookupResponse"], null);
		}
		case CREATE_PROFILE_DEFINITION_SUCCESS:
			return state
				.setIn(["definitions", "newInstanceId"], action.meta.entityTypeName)
				.setIn(["definitions", CUSTOMER_MODULE_NAME, action.meta.entityTypeName], Immutable.fromJS(action.meta))
				.setIn(["definitions", "saveProfileDefinitionRequestState"], requestStates.success);
		case CREATE_PROFILE_DEFINITION_FAILURE:
			return state.setIn(["definitions", "saveProfileDefinitionRequestState"], requestStates.fail);
		case RESET_PROFILE_DEFINITION_SAVE_RESULT:
			return state
				.setIn(["definitions", "saveProfileDefinitionRequestState"], requestStates.idle)
				.setIn(["definitions", "newInstanceId"], null);
		case SET_NEW_PROFILE_DEFINITION: {
			return state.setIn(["definitions", "newInstance"], Immutable.fromJS({ name: action.payload.name }));
		}

		default:
			return state;
	}
};

export default metadataReducer;
