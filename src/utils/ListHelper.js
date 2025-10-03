import Immutable from "immutable";
import { isObject } from "lodash";

export const ListInfoPropertyName = "listInfo";

const standardInfoKeys = [
	"scope",
	"page",
	"filters",
	"sorting",
	"totalCount",
	"nextPageToLoad",
	"index",
	"list",
	"searchRequested",
];

class ListReducerHelper {
	constructor(groupPropertyName) {
		this.groupPropertyName = groupPropertyName;
	}

	setNextPageToLoad = (state, nextPageToLoad) => {
		return state.setIn([this.groupPropertyName, "nextPageToLoad"], nextPageToLoad);
	};

	setSearchRequested = (state, searchRequested) => {
		return state.setIn([this.groupPropertyName, "searchRequested"], searchRequested);
	};

	setResults = (state, listInfo, forceReset = false) => {
		return state.withMutations(s => {
			const page = s.getIn([this.groupPropertyName, "nextPageToLoad"]);

			const entities = Immutable.fromJS(listInfo.indexEntities || {});
			if (page === 1 || forceReset) {
				s.setIn([this.groupPropertyName, "index"], entities);
				s.setIn([this.groupPropertyName, "list"], Immutable.fromJS(listInfo.listEntities));
			} else {
				s.mergeIn([this.groupPropertyName, "index"], entities);
				s.setIn(
					[this.groupPropertyName, "list"],
					s.getIn([this.groupPropertyName, "list"]).concat(Immutable.fromJS(listInfo.listEntities)),
				);
			}

			s.setIn([this.groupPropertyName, "totalCount"], listInfo.totalCount);
		});
	};

	setCurrentInfo = (state, { resetList, scope, filters, sorting, ...others } = {}) => {
		return state.withMutations(s => {
			if (resetList) {
				s.setIn([this.groupPropertyName, "nextPageToLoad"], 1);
				s.setIn([this.groupPropertyName, "page"], null);
				s.setIn([this.groupPropertyName, "index"], Immutable.fromJS({}));
				s.setIn([this.groupPropertyName, "list"], Immutable.fromJS([]));
				s.setIn([this.groupPropertyName, "totalCount"], 0);
			} else {
				const nextPageToLoad = state.getIn([this.groupPropertyName, "nextPageToLoad"]);
				s.setIn([this.groupPropertyName, "nextPageToLoad"], nextPageToLoad);
				s.setIn([this.groupPropertyName, "page"], nextPageToLoad);
			}

			s.setIn([this.groupPropertyName, "scope"], scope ?? null);
			s.setIn([this.groupPropertyName, "filters"], Immutable.fromJS(filters ?? null));
			s.setIn([this.groupPropertyName, "sorting"], Immutable.fromJS(sorting ?? null));
			s.setIn([this.groupPropertyName, "searchRequested"], false);

			const otherKeys = Object.keys(others);

			s.get(this.groupPropertyName)
				.keySeq()
				.forEach(key => {
					if (!standardInfoKeys.includes(key) && !otherKeys.includes(key)) {
						s.removeIn([this.groupPropertyName, key]);
					}
				});

			otherKeys.forEach(key => {
				s.setIn([this.groupPropertyName, key], isObject(others[key]) ? Immutable.fromJS(others[key]) : others[key]);
			});
		});
	};

	addIndexWithMutations = (mutator, id, value) => {
		mutator.setIn([this.groupPropertyName, "index", id], Immutable.fromJS(value));
	};

	appendIdToListWithMutations = (mutator, id) => {
		mutator.setIn([this.groupPropertyName, "list"], mutator.getIn([this.groupPropertyName, "list"]).push(id));
	};

	updateIndexWithMutations = (mutator, id, value) => {
		const key = [this.groupPropertyName, "index", id];
		if (mutator.getIn(key)) {
			mutator.setIn(key, Immutable.fromJS(value));
		}
	};

	removeFromIndexWithMutations = (mutator, id) => {
		mutator.removeIn([this.groupPropertyName, "index", id]);
	};

	resetListInfo = (state, propertiesToKeep = {}) => {
		let updatedState = state
			.setIn([this.groupPropertyName, "nextPageToLoad"], 1)
			.setIn([this.groupPropertyName, "searchRequested"], false)
			.setIn([this.groupPropertyName, "index"], Immutable.fromJS({}))
			.setIn([this.groupPropertyName, "list"], Immutable.fromJS([]))
			.setIn([this.groupPropertyName, "totalCount"], 0);

		if (!propertiesToKeep.filters) {
			updatedState = updatedState.setIn([this.groupPropertyName, "filters"], null);
		}

		if (!propertiesToKeep.sorting) {
			updatedState = updatedState.setIn([this.groupPropertyName, "sorting"], null);
		}

		if (!propertiesToKeep.scope) {
			updatedState = updatedState.setIn([this.groupPropertyName, "scope"], null);
		}

		if (!propertiesToKeep.page) {
			updatedState = updatedState.setIn([this.groupPropertyName, "page"], null);
		}

		return updatedState;
	};
}

class ListSelectorHelper {
	constructor(groupPropertyName) {
		this.groupPropertyName = groupPropertyName;
	}

	getCurrentInfo = state => {
		const listInfo = state.get(this.groupPropertyName) || Immutable.Map();

		const info = {
			currentScope: listInfo.get("scope"),
			currentPage: listInfo.get("page"),
			currentFilters: listInfo.get("filters")?.toJS(),
			currentSorting: listInfo.get("sorting")?.toJS(),
			totalCount: listInfo.get("totalCount"),
			searchRequested: listInfo.get("searchRequested"),
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

	getIndex = state => {
		return state.getIn([this.groupPropertyName, "index"]);
	};

	getList = state => {
		return state.getIn([this.groupPropertyName, "list"]);
	};

	getNextPageToLoad = state => {
		return state.getIn([this.groupPropertyName, "nextPageToLoad"]);
	};

	getSearchRequested = state => {
		return state.getIn([this.groupPropertyName, "searchRequested"]);
	};
}

class ListHelper {
	constructor(groupPropertyName = ListInfoPropertyName) {
		this.groupPropertyName = groupPropertyName;
		this.reducer = new ListReducerHelper(this.groupPropertyName);
		this.selector = new ListSelectorHelper(this.groupPropertyName);
	}

	static defaultInstance = new ListHelper();
	static reducer = ListHelper.defaultInstance.reducer;
	static selector = ListHelper.defaultInstance.selector;
	static createInitialListInfo = ListHelper.defaultInstance.createInitialListInfo;
	static createListInfoFrom = ListHelper.defaultInstance.createListInfoFrom;

	createInitialListInfo = (additionalValues = null) => {
		return this.createListInfoFrom({
			...additionalValues,
		});
	};

	createListInfoFrom = ({
		sorting,
		filters,
		scope,
		page,
		nextPageToLoad,
		index,
		list,
		totalCount,
		searchRequested,
		...additionalValues
	} = {}) => {
		return {
			[this.groupPropertyName]: {
				sorting: sorting ?? null,
				filters: filters ?? null,
				scope: scope ?? null,
				page: page ?? null,
				nextPageToLoad: nextPageToLoad ?? 1,
				index: index ?? {},
				list: list ?? [],
				totalCount: totalCount ?? 0,
				searchRequested: searchRequested ?? false,
				...additionalValues,
			},
		};
	};
}

export default ListHelper;
