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
	SAVE_ORDER_LOOKUP_SUCCESS,
	SAVE_CUSTOMER_LOOKUP_SUCCESS,
	CREATE_PROFILE_DEFINITION_SUCCESS,
	ADD_ORDER_LOOKUP_SUCCESS,
	ADD_CUSTOMER_LOOKUP_SUCCESS,
	UPDATE_PROFILE_DEFINITION_SUCCESS,
	GET_ORDER_LOOKUP_SUCCESS,
	GET_CUSTOMER_LOOKUP_SUCCESS,
} from "../actions/metadata";

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
	getPagedLookups: (moduleName, state) => {
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
			return lookupReducerHelper.getPagedLookups(ORDER_MODULE_NAME, state);
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
			return lookupReducerHelper.getPagedLookups(CUSTOMER_MODULE_NAME, state);
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
		case SAVE_ORDER_LOOKUP_SUCCESS:
		case GET_ORDER_LOOKUP_SUCCESS:
			return state.setIn(
				["lookups", ORDER_MODULE_NAME, "index", action.payload.lookupName],
				Immutable.fromJS(action.payload),
			);

		case ADD_ORDER_LOOKUP_SUCCESS: {
			state = state.setIn(
				["lookups", ORDER_MODULE_NAME, "index", action.payload.lookupName],
				Immutable.fromJS(action.payload),
			);

			return lookupReducerHelper.getPagedLookups(ORDER_MODULE_NAME, state);
		}

		case SAVE_CUSTOMER_LOOKUP_SUCCESS:
		case GET_CUSTOMER_LOOKUP_SUCCESS:
			return state.setIn(
				["lookups", CUSTOMER_MODULE_NAME, "index", action.payload.lookupName],
				Immutable.fromJS(action.payload),
			);

		case ADD_CUSTOMER_LOOKUP_SUCCESS: {
			state = state.setIn(
				["lookups", CUSTOMER_MODULE_NAME, "index", action.payload.lookupName],
				Immutable.fromJS(action.payload),
			);

			return lookupReducerHelper.getPagedLookups(CUSTOMER_MODULE_NAME, state);
		}

		case CREATE_PROFILE_DEFINITION_SUCCESS:
			return state.setIn(
				["definitions", CUSTOMER_MODULE_NAME, action.payload.entityTypeName],
				Immutable.fromJS(action.payload),
			);

		case UPDATE_PROFILE_DEFINITION_SUCCESS:
			return state.setIn(
				["definitions", CUSTOMER_MODULE_NAME, action.payload.entityTypeName],
				Immutable.fromJS(action.payload),
			);
		default:
			return state;
	}
};

export default metadataReducer;
