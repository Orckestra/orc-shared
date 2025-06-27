import { useCallback, useMemo, useRef } from "react";
import { unwrapImmutable } from "../utils";
import useViewState from "./useViewState";

const scrollTableRef = tableRef => {
	if (!tableRef?.current) {
		console.error("[useInMemoryPaging]: tableRef was not specified or tableRef.current is null.");
	} else {
		tableRef.current.scrollToTop();
	}
};

const useInMemoryPaging = ({
	viewStateName,
	tableRef,
	records,
	pageSize,
	initialSort = {},
	initialFilters = {},
	sortAndFilterFn,
}) => {
	const [viewState, updateViewState] = useViewState(viewStateName);
	const internalSortAndFilterFn = useRef(sortAndFilterFn);
	const internalInitialSort = useRef(initialSort);
	const internalInitialFilters = useRef(initialFilters);

	const filters = viewState.filters ?? internalInitialFilters.current;
	const sorting = viewState.sorting ?? internalInitialSort.current;
	const currentPage = viewState.currentPage ?? 1;
	const nextPageToLoad = viewState.nextPageToLoad ?? 1;

	if (internalSortAndFilterFn.current !== sortAndFilterFn) {
		console.warn(
			"[useInMemoryPaging]: a different value for sortAndFilterFn was detected between renders, ensure that it never changes (define it outside of your component).",
		);
	}

	const setFilter = filters => {
		scrollTableRef(tableRef);
		updateViewState("filters", filters);
		updateViewState("currentPage", 1);
		updateViewState("nextPageToLoad", 1);
	};

	const setSort = sorting => {
		scrollTableRef(tableRef);
		updateViewState("sorting", sorting);
		updateViewState("currentPage", 1);
		updateViewState("nextPageToLoad", 1);
	};

	const scrollLoader = useCallback(
		page => {
			if (page > nextPageToLoad) {
				updateViewState("currentPage", page);
				updateViewState("nextPageToLoad", page);
			}
		},
		[nextPageToLoad, updateViewState],
	);

	const [rows, totalCount] = useMemo(() => {
		let list = internalSortAndFilterFn.current({
			list: unwrapImmutable(records),
			filters: filters,
			sorting: sorting,
		});
		return [unwrapImmutable(list.slice(0, currentPage * pageSize)), list.length];
	}, [currentPage, pageSize, records, filters, sorting, internalSortAndFilterFn]);

	return {
		rows,
		scrollLoader,
		currentPage,

		filters,
		sorting,

		setFilter,
		setSort,
		totalCount,
	};
};

export default useInMemoryPaging;
