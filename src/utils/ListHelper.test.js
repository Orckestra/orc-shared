import ListHelper, { ListInfoPropertyName } from "./ListHelper";
import Immutable from "immutable";

describe("createInitialListInfo", () => {
	it("created expected object", () => {
		const obj = ListHelper.createInitialListInfo();
		expect(obj, "to equal", {
			[ListInfoPropertyName]: {
				sorting: null,
				filters: null,
				scope: null,
				page: null,
				nextPageToLoad: 1,
				index: {},
				list: [],
				totalCount: 0,
			},
		});
	});

	it("created expected object with additional properties", () => {
		const obj = ListHelper.createInitialListInfo({
			prop1: 123,
			prop2: { subprop: "a" },
		});
		expect(obj, "to equal", {
			[ListInfoPropertyName]: {
				sorting: null,
				filters: null,
				scope: null,
				page: null,
				nextPageToLoad: 1,
				index: {},
				list: [],
				totalCount: 0,
				prop1: 123,
				prop2: { subprop: "a" },
			},
		});
	});

	it("created expected object with additional properties and overriding default values", () => {
		const obj = ListHelper.createInitialListInfo({
			sorting: { a: 1 },
			filters: { b: 1 },
			scope: "canada",
			page: 1,
			nextPageToLoad: 2,
			index: { c: 1 },
			list: [1, 2, 3],
			totalCount: 10,
			prop1: 123,
			prop2: { subprop: "a" },
		});
		expect(obj, "to equal", {
			[ListInfoPropertyName]: {
				sorting: { a: 1 },
				filters: { b: 1 },
				scope: "canada",
				page: 1,
				nextPageToLoad: 2,
				index: { c: 1 },
				list: [1, 2, 3],
				totalCount: 10,
				prop1: 123,
				prop2: { subprop: "a" },
			},
		});
	});
});

describe("createListInfoFrom", () => {
	it("created expected object", () => {
		const obj = ListHelper.createListInfoFrom();
		expect(obj, "to equal", {
			[ListInfoPropertyName]: {
				sorting: null,
				filters: null,
				scope: null,
				page: null,
				nextPageToLoad: 1,
				index: {},
				list: [],
				totalCount: 0,
			},
		});
	});

	it("created expected object with additional properties", () => {
		const obj = ListHelper.createListInfoFrom({
			prop1: 123,
			prop2: { subprop: "a" },
		});
		expect(obj, "to equal", {
			[ListInfoPropertyName]: {
				sorting: null,
				filters: null,
				scope: null,
				page: null,
				nextPageToLoad: 1,
				index: {},
				list: [],
				totalCount: 0,
				prop1: 123,
				prop2: { subprop: "a" },
			},
		});
	});

	it("created expected object with additional properties and overriding default values", () => {
		const obj = ListHelper.createListInfoFrom({
			sorting: { a: 1 },
			filters: { b: 1 },
			scope: "canada",
			page: 1,
			nextPageToLoad: 2,
			index: { c: 1 },
			list: [1, 2, 3],
			totalCount: 10,
			prop1: 123,
			prop2: { subprop: "a" },
		});
		expect(obj, "to equal", {
			[ListInfoPropertyName]: {
				sorting: { a: 1 },
				filters: { b: 1 },
				scope: "canada",
				page: 1,
				nextPageToLoad: 2,
				index: { c: 1 },
				list: [1, 2, 3],
				totalCount: 10,
				prop1: 123,
				prop2: { subprop: "a" },
			},
		});
	});
});

describe("ListSelectorHelper", () => {
	const initialState = Immutable.fromJS(
		ListHelper.createListInfoFrom({
			sorting: { a: 1 },
			filters: { b: 1 },
			scope: "canada",
			page: 1,
			nextPageToLoad: 2,
			index: { c: 1 },
			list: [1, 2, 3],
			totalCount: 10,
			prop1: 123,
			prop2: { subprop: "a" },
		}),
	);

	it("getNextPageToLoad", () => {
		const value = ListHelper.selector.getNextPageToLoad(initialState);
		expect(value, "to equal", 2);
	});

	it("getList", () => {
		const value = ListHelper.selector.getList(initialState);
		expect(value, "to equal", Immutable.fromJS([1, 2, 3]));
	});

	it("getIndex", () => {
		const value = ListHelper.selector.getIndex(initialState);
		expect(value, "to equal", Immutable.fromJS({ c: 1 }));
	});

	it("getCurrentInfo", () => {
		const value = ListHelper.selector.getCurrentInfo(initialState);
		expect(value, "to equal", {
			currentSorting: { a: 1 },
			currentFilters: { b: 1 },
			currentScope: "canada",
			currentPage: 1,
			totalCount: 10,
			prop1: 123,
			prop2: { subprop: "a" },
		});
	});

	it("getCurrentInfo without filters or sorting", () => {
		const value = ListHelper.selector.getCurrentInfo(
			initialState.setIn([ListInfoPropertyName, "filters"], null).setIn([ListInfoPropertyName, "sorting"], null),
		);
		expect(value, "to equal", {
			currentSorting: undefined,
			currentFilters: undefined,
			currentScope: "canada",
			currentPage: 1,
			totalCount: 10,
			prop1: 123,
			prop2: { subprop: "a" },
		});
	});
});

describe("ListReducerHelper", () => {
	const initialState = Immutable.fromJS(
		ListHelper.createListInfoFrom({
			sorting: { a: 1 },
			filters: { b: 1 },
			scope: "canada",
			page: 1,
			nextPageToLoad: 2,
			index: { c: 1 },
			list: [1, 2, 3],
			totalCount: 10,
			prop1: 123,
			prop2: { subprop: "a" },
		}),
	);

	it("setNextPageToLoad", () => {
		const newState = ListHelper.reducer.setNextPageToLoad(initialState, 888);
		expect(
			newState,
			"to equal",
			Immutable.fromJS(
				ListHelper.createListInfoFrom({
					sorting: { a: 1 },
					filters: { b: 1 },
					scope: "canada",
					page: 1,
					nextPageToLoad: 888,
					index: { c: 1 },
					list: [1, 2, 3],
					totalCount: 10,
					prop1: 123,
					prop2: { subprop: "a" },
				}),
			),
		);
	});

	it("setResults first page", () => {
		const listInfo = {
			indexEntities: { d: 1 },
			listEntities: [4, 5, 6],
			totalCount: 222,
		};
		const newState = ListHelper.reducer.setResults(
			initialState.setIn([ListInfoPropertyName, "nextPageToLoad"], 1),
			listInfo,
		);
		expect(
			newState,
			"to equal",
			Immutable.fromJS(
				ListHelper.createListInfoFrom({
					sorting: { a: 1 },
					filters: { b: 1 },
					scope: "canada",
					page: 1,
					nextPageToLoad: 1,
					index: { d: 1 },
					list: [4, 5, 6],
					totalCount: 222,
					prop1: 123,
					prop2: { subprop: "a" },
				}),
			),
		);
	});

	it("setResults with null entities", () => {
		const listInfo = {
			indexEntities: null,
			listEntities: [4, 5, 6],
			totalCount: 222,
		};
		const newState = ListHelper.reducer.setResults(
			initialState.setIn([ListInfoPropertyName, "nextPageToLoad"], 1),
			listInfo,
			false,
		);
		expect(
			newState,
			"to equal",
			Immutable.fromJS(
				ListHelper.createListInfoFrom({
					sorting: { a: 1 },
					filters: { b: 1 },
					scope: "canada",
					page: 1,
					nextPageToLoad: 1,
					index: {},
					list: [4, 5, 6],
					totalCount: 222,
					prop1: 123,
					prop2: { subprop: "a" },
				}),
			),
		);
	});

	it("setResults another page", () => {
		const listInfo = {
			indexEntities: { d: 1 },
			listEntities: [4, 5, 6],
			totalCount: 222,
		};
		const newState = ListHelper.reducer.setResults(initialState, listInfo, false);
		expect(
			newState,
			"to equal",
			Immutable.fromJS(
				ListHelper.createListInfoFrom({
					sorting: { a: 1 },
					filters: { b: 1 },
					scope: "canada",
					page: 1,
					nextPageToLoad: 2,
					index: { c: 1, d: 1 },
					list: [1, 2, 3, 4, 5, 6],
					totalCount: 222,
					prop1: 123,
					prop2: { subprop: "a" },
				}),
			),
		);
	});

	it("setResults force reset", () => {
		const listInfo = {
			indexEntities: { d: 1 },
			listEntities: [4, 5, 6],
			totalCount: 222,
		};
		const newState = ListHelper.reducer.setResults(initialState, listInfo, true);
		expect(
			newState,
			"to equal",
			Immutable.fromJS(
				ListHelper.createListInfoFrom({
					sorting: { a: 1 },
					filters: { b: 1 },
					scope: "canada",
					page: 1,
					nextPageToLoad: 2,
					index: { d: 1 },
					list: [4, 5, 6],
					totalCount: 222,
					prop1: 123,
					prop2: { subprop: "a" },
				}),
			),
		);
	});

	it("setCurrentInfo with reset", () => {
		const info = {
			resetList: true,
			scope: "usa",
			filters: { e: 1 },
			sorting: { f: 1 },
			prop1: 456,
			prop2: { subprop: "b" },
		};
		const newState = ListHelper.reducer.setCurrentInfo(initialState, info);
		expect(
			newState,
			"to equal",
			Immutable.fromJS(
				ListHelper.createListInfoFrom({
					sorting: { f: 1 },
					filters: { e: 1 },
					scope: "usa",
					page: null,
					nextPageToLoad: 1,
					index: {},
					list: [],
					totalCount: 0,
					prop1: 456,
					prop2: { subprop: "b" },
				}),
			),
		);
	});

	it("setCurrentInfo without reset", () => {
		const info = {
			resetList: false,
			scope: "usa",
			filters: { e: 1 },
			sorting: { f: 1 },
			prop1: 456,
			prop2: { subprop: "b" },
		};
		const newState = ListHelper.reducer.setCurrentInfo(initialState, info);
		expect(
			newState,
			"to equal",
			Immutable.fromJS(
				ListHelper.createListInfoFrom({
					sorting: { f: 1 },
					filters: { e: 1 },
					scope: "usa",
					page: 2,
					nextPageToLoad: 2,
					index: { c: 1 },
					list: [1, 2, 3],
					totalCount: 10,
					prop1: 456,
					prop2: { subprop: "b" },
				}),
			),
		);
	});

	it("setCurrentInfo without reset and without all other props", () => {
		const info = {
			resetList: false,
			scope: "usa",
			filters: { e: 1 },
			sorting: { f: 1 },
			prop1: 456,
			prop3: 789,
		};
		const newState = ListHelper.reducer.setCurrentInfo(initialState, info);
		expect(
			newState,
			"to equal",
			Immutable.fromJS(
				ListHelper.createListInfoFrom({
					sorting: { f: 1 },
					filters: { e: 1 },
					scope: "usa",
					page: 2,
					nextPageToLoad: 2,
					index: { c: 1 },
					list: [1, 2, 3],
					totalCount: 10,
					prop1: 456,
					prop3: 789,
				}),
			),
		);
	});

	it("setCurrentInfo without reset and without any other props", () => {
		const info = {
			resetList: false,
			scope: "usa",
			filters: { e: 1 },
			sorting: { f: 1 },
		};
		const newState = ListHelper.reducer.setCurrentInfo(initialState, info);
		expect(
			newState,
			"to equal",
			Immutable.fromJS(
				ListHelper.createListInfoFrom({
					sorting: { f: 1 },
					filters: { e: 1 },
					scope: "usa",
					page: 2,
					nextPageToLoad: 2,
					index: { c: 1 },
					list: [1, 2, 3],
					totalCount: 10,
				}),
			),
		);
	});

	it("setCurrentInfo without filters and sorting", () => {
		const info = {
			resetList: false,
			scope: "usa",
			filters: null,
			sorting: null,
			prop1: 456,
			prop2: { subprop: "b" },
		};
		const newState = ListHelper.reducer.setCurrentInfo(initialState, info);
		expect(
			newState,
			"to equal",
			Immutable.fromJS(
				ListHelper.createListInfoFrom({
					sorting: null,
					filters: null,
					scope: "usa",
					page: 2,
					nextPageToLoad: 2,
					index: { c: 1 },
					list: [1, 2, 3],
					totalCount: 10,
					prop1: 456,
					prop2: { subprop: "b" },
				}),
			),
		);
	});

	it("addIndexWithMutations", () => {
		const newState = initialState.withMutations(s => ListHelper.reducer.addIndexWithMutations(s, "d", 888));
		expect(
			newState,
			"to equal",
			Immutable.fromJS(
				ListHelper.createListInfoFrom({
					sorting: { a: 1 },
					filters: { b: 1 },
					scope: "canada",
					page: 1,
					nextPageToLoad: 2,
					index: { c: 1, d: 888 },
					list: [1, 2, 3],
					totalCount: 10,
					prop1: 123,
					prop2: { subprop: "a" },
				}),
			),
		);
	});

	it("appendIdToListWithMutations", () => {
		const newState = initialState.withMutations(s => ListHelper.reducer.appendIdToListWithMutations(s, 888));
		expect(
			newState,
			"to equal",
			Immutable.fromJS(
				ListHelper.createListInfoFrom({
					sorting: { a: 1 },
					filters: { b: 1 },
					scope: "canada",
					page: 1,
					nextPageToLoad: 2,
					index: { c: 1 },
					list: [1, 2, 3, 888],
					totalCount: 10,
					prop1: 123,
					prop2: { subprop: "a" },
				}),
			),
		);
	});

	it("updateIndexWithMutations existing", () => {
		const newState = initialState.withMutations(s => ListHelper.reducer.updateIndexWithMutations(s, "c", 888));
		expect(
			newState,
			"to equal",
			Immutable.fromJS(
				ListHelper.createListInfoFrom({
					sorting: { a: 1 },
					filters: { b: 1 },
					scope: "canada",
					page: 1,
					nextPageToLoad: 2,
					index: { c: 888 },
					list: [1, 2, 3],
					totalCount: 10,
					prop1: 123,
					prop2: { subprop: "a" },
				}),
			),
		);
	});

	it("updateIndexWithMutations missing", () => {
		const newState = initialState.withMutations(s => ListHelper.reducer.updateIndexWithMutations(s, "d", 888));
		expect(
			newState,
			"to equal",
			Immutable.fromJS(
				ListHelper.createListInfoFrom({
					sorting: { a: 1 },
					filters: { b: 1 },
					scope: "canada",
					page: 1,
					nextPageToLoad: 2,
					index: { c: 1 },
					list: [1, 2, 3],
					totalCount: 10,
					prop1: 123,
					prop2: { subprop: "a" },
				}),
			),
		);
	});

	it("removeFromIndexWithMutations existing", () => {
		const newState = initialState.withMutations(s => ListHelper.reducer.removeFromIndexWithMutations(s, "c"));
		expect(
			newState,
			"to equal",
			Immutable.fromJS(
				ListHelper.createListInfoFrom({
					sorting: { a: 1 },
					filters: { b: 1 },
					scope: "canada",
					page: 1,
					nextPageToLoad: 2,
					index: {},
					list: [1, 2, 3],
					totalCount: 10,
					prop1: 123,
					prop2: { subprop: "a" },
				}),
			),
		);
	});

	it("removeFromIndexWithMutations missing", () => {
		const newState = initialState.withMutations(s => ListHelper.reducer.removeFromIndexWithMutations(s, "d"));
		expect(
			newState,
			"to equal",
			Immutable.fromJS(
				ListHelper.createListInfoFrom({
					sorting: { a: 1 },
					filters: { b: 1 },
					scope: "canada",
					page: 1,
					nextPageToLoad: 2,
					index: { c: 1 },
					list: [1, 2, 3],
					totalCount: 10,
					prop1: 123,
					prop2: { subprop: "a" },
				}),
			),
		);
	});

	it("resetListInfo without properties to keep", () => {
		const newState = ListHelper.reducer.resetListInfo(initialState);
		expect(
			newState,
			"to equal",
			Immutable.fromJS(
				ListHelper.createListInfoFrom({
					sorting: null,
					filters: null,
					scope: null,
					page: null,
					nextPageToLoad: 1,
					index: {},
					list: [],
					totalCount: 0,
					prop1: 123,
					prop2: { subprop: "a" },
				}),
			),
		);
	});

	it("resetListInfo with properties to keep", () => {
		const newState = ListHelper.reducer.resetListInfo(initialState, { filters: true, sorting: true, scope: true });
		expect(
			newState,
			"to equal",
			Immutable.fromJS(
				ListHelper.createListInfoFrom({
					sorting: { a: 1 },
					filters: { b: 1 },
					scope: "canada",
					page: null,
					nextPageToLoad: 1,
					index: {},
					list: [],
					totalCount: 0,
					prop1: 123,
					prop2: { subprop: "a" },
				}),
			),
		);
	});
});
