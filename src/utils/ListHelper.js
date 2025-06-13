import Immutable from "immutable";
import { isObject } from "lodash";

export const ListInfoPropertyName = "listInfo";

const standardInfoKeys = ["scope", "page", "filters", "sorting", "totalCount", "nextPageToLoad", "index", "list"];

class ListReducerHelper {
	static setNextPageToLoad = (state, nextPageToLoad) => {
		return state.setIn([ListInfoPropertyName, "nextPageToLoad"], nextPageToLoad);
	};

	static setResults = (state, listInfo, forceReset = false) => {
		return state.withMutations(s => {
			const page = s.getIn([ListInfoPropertyName, "nextPageToLoad"]);

			const entities = Immutable.fromJS(listInfo.indexEntities || {});
			if (page === 1 || forceReset) {
				s.setIn([ListInfoPropertyName, "index"], entities);
				s.setIn([ListInfoPropertyName, "list"], Immutable.fromJS(listInfo.listEntities));
			} else {
				s.mergeIn([ListInfoPropertyName, "index"], entities);
				s.setIn(
					[ListInfoPropertyName, "list"],
					s.getIn([ListInfoPropertyName, "list"]).concat(Immutable.fromJS(listInfo.listEntities)),
				);
			}

			s.setIn([ListInfoPropertyName, "totalCount"], listInfo.totalCount);
		});
	};

	static setCurrentInfo = (state, { resetList, scope, filters, sorting, ...others }) => {
		return state.withMutations(s => {
			if (resetList) {
				s.setIn([ListInfoPropertyName, "nextPageToLoad"], 1);
				s.setIn([ListInfoPropertyName, "page"], null);
				s.setIn([ListInfoPropertyName, "index"], Immutable.fromJS({}));
				s.setIn([ListInfoPropertyName, "list"], Immutable.fromJS([]));
				s.setIn([ListInfoPropertyName, "totalCount"], 0);
			} else {
				const nextPageToLoad = state.getIn([ListInfoPropertyName, "nextPageToLoad"]);
				s.setIn([ListInfoPropertyName, "nextPageToLoad"], nextPageToLoad);
				s.setIn([ListInfoPropertyName, "page"], nextPageToLoad);
			}

			s.setIn([ListInfoPropertyName, "scope"], scope);
			s.setIn([ListInfoPropertyName, "filters"], Immutable.fromJS(filters ?? null));
			s.setIn([ListInfoPropertyName, "sorting"], Immutable.fromJS(sorting ?? null));

			const otherKeys = Object.keys(others);

			s.get(ListInfoPropertyName)
				.keySeq()
				.forEach(key => {
					if (!standardInfoKeys.includes(key) && !otherKeys.includes(key)) {
						s.removeIn([ListInfoPropertyName, key]);
					}
				});

			otherKeys.forEach(key => {
				s.setIn([ListInfoPropertyName, key], isObject(others[key]) ? Immutable.fromJS(others[key]) : others[key]);
			});
		});
	};

	static addIndexWithMutations = (mutator, id, value) => {
		mutator.setIn([ListInfoPropertyName, "index", id], Immutable.fromJS(value));
	};

	static appendIdToListWithMutations = (mutator, id) => {
		mutator.setIn([ListInfoPropertyName, "list"], mutator.getIn([ListInfoPropertyName, "list"]).push(id));
	};

	static updateIndexWithMutations = (mutator, id, value) => {
		const key = [ListInfoPropertyName, "index", id];
		if (mutator.getIn(key)) {
			mutator.setIn(key, Immutable.fromJS(value));
		}
	};

	static removeFromIndexWithMutations = (mutator, id) => {
		mutator.removeIn([ListInfoPropertyName, "index", id]);
	};

	static resetListInfo = (state, propertiesToKeep = {}) => {
		let updatedState = state
			.setIn([ListInfoPropertyName, "page"], null)
			.setIn([ListInfoPropertyName, "nextPageToLoad"], 1)
			.setIn([ListInfoPropertyName, "index"], Immutable.fromJS({}))
			.setIn([ListInfoPropertyName, "list"], Immutable.fromJS([]))
			.setIn([ListInfoPropertyName, "totalCount"], 0);

		if (!propertiesToKeep.filters) {
			updatedState = updatedState.setIn([ListInfoPropertyName, "filters"], null);
		}

		if (!propertiesToKeep.sorting) {
			updatedState = updatedState.setIn([ListInfoPropertyName, "sorting"], null);
		}

		if (!propertiesToKeep.scope) {
			updatedState = updatedState.setIn([ListInfoPropertyName, "scope"], null);
		}

		return updatedState;
	};
}

class ListSelectorHelper {
	static getCurrentInfo = state => {
		const listInfo = state.get(ListInfoPropertyName);

		const info = {
			currentScope: listInfo.get("scope"),
			currentPage: listInfo.get("page"),
			currentFilters: listInfo.get("filters")?.toJS(),
			currentSorting: listInfo.get("sorting")?.toJS(),
			totalCount: listInfo.get("totalCount"),
		};

		listInfo.mapKeys((key, value) => {
			if (standardInfoKeys.includes(key)) {
				// standard key, nothing to do
			} else {
				info[key] = value?.toJS ? value.toJS() : value;
			}
		});

		return info;
	};

	static getIndex = state => {
		return state.getIn([ListInfoPropertyName, "index"]);
	};

	static getList = state => {
		return state.getIn([ListInfoPropertyName, "list"]);
	};

	static getNextPageToLoad = state => {
		return state.getIn([ListInfoPropertyName, "nextPageToLoad"]);
	};
}

class ListHelper {
	static reducer = ListReducerHelper;
	static selector = ListSelectorHelper;

	static createInitialListInfo = (additionalValues = null) => {
		return ListHelper.createListInfoFrom({
			...additionalValues,
		});
	};

	static createListInfoFrom = ({
		sorting,
		filters,
		scope,
		page,
		nextPageToLoad,
		index,
		list,
		totalCount,
		...additionalValues
	} = {}) => {
		return {
			[ListInfoPropertyName]: {
				sorting: sorting ?? null,
				filters: filters ?? null,
				scope: scope ?? null,
				page: page ?? null,
				nextPageToLoad: nextPageToLoad ?? 1,
				index: index ?? {},
				list: list ?? [],
				totalCount: totalCount ?? 0,
				...additionalValues,
			},
		};
	};
}

export default ListHelper;
