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
} from "../actions/metadata";

export const ORDER_LOOKUP_MODULE_NAME = "order";
export const CUSTOMER_LOOKUP_MODULE_NAME = "customer";
export const PRODUCT_LOOKUP_MODULE_NAME = "product";

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
		customer: {
			index: {},
			list: [],
		},
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
			return lookupReducerHelper.incrementPage(ORDER_LOOKUP_MODULE_NAME, state, action);
		}
		case REFRESH_PAGED_ORDER_LOOKUPS: {
			return lookupReducerHelper.getPagedLookups(ORDER_LOOKUP_MODULE_NAME, state, action);
		}
		case SET_PAGED_ORDER_LOOKUPS_CURRENT_INFO: {
			return lookupReducerHelper.setPagedCurrentInfo(ORDER_LOOKUP_MODULE_NAME, state, action);
		}
		case GET_ORDER_LOOKUPS_SUCCESS: {
			return lookupReducerHelper.getLookupsQuerySuccess(ORDER_LOOKUP_MODULE_NAME, state, action);
		}
		case INCREMENT_CUSTOMER_LOOKUPS_PAGE: {
			return lookupReducerHelper.incrementPage(CUSTOMER_LOOKUP_MODULE_NAME, state, action);
		}
		case REFRESH_PAGED_CUSTOMER_LOOKUPS: {
			return lookupReducerHelper.getPagedLookups(CUSTOMER_LOOKUP_MODULE_NAME, state, action);
		}
		case SET_PAGED_CUSTOMER_LOOKUPS_CURRENT_INFO: {
			return lookupReducerHelper.setPagedCurrentInfo(CUSTOMER_LOOKUP_MODULE_NAME, state, action);
		}
		case GET_CUSTOMER_LOOKUPS_SUCCESS: {
			return lookupReducerHelper.getLookupsQuerySuccess(CUSTOMER_LOOKUP_MODULE_NAME, state, action);
		}
		case GET_PRODUCT_LOOKUPS_SUCCESS: {
			return lookupReducerHelper.getLookupsQuerySuccess(PRODUCT_LOOKUP_MODULE_NAME, state, action);
		}
		case GET_CUSTOMER_DEFINITIONS_SUCCESS: {
			const normalizedDefinitons = normalize(action.payload, definitionsListSchema);
			return state.setIn(["definitions", "customer"], Immutable.fromJS(normalizedDefinitons.entities.definitions));
		}
		case GET_ORDER_DEFINITIONS_SUCCESS: {
			const normalizedDefinitons = normalize(action.payload, definitionsListSchema);
			return state.setIn(["definitions", "order"], Immutable.fromJS(normalizedDefinitons.entities.definitions));
		}
		case GET_PRODUCT_DEFINITIONS_SUCCESS: {
			const normalizedDefinitons = normalize(action.payload, productDefinitionsListSchema);
			return state.setIn(["definitions", "product"], Immutable.fromJS(normalizedDefinitons.entities.definitions));
		}
		case GET_PROFILE_ATTRIBUTE_GROUPS_SUCCESS: {
			const normalizedData = normalize(action.payload?.profileAttributeGroups, profileAttributeGroupsListSchema);
			return state.set("profileAttributeGroups", Immutable.fromJS(normalizedData.entities.metadata));
		}
		default:
			return state;
	}
};

export default metadataReducer;
