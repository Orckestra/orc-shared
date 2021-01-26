const toggleInArray = (nameList, name) => {
	if (nameList.indexOf(name) !== -1) {
		return nameList.filter(n => n !== name);
	} else {
		return nameList.concat(name);
	}
};

const enhanceSelectColumn = (selection, updateViewState, def) => {
	return {
		fieldName: "selection",
		...def,
		onChange: eventOrSelection => {
			if (Array.isArray(eventOrSelection)) {
				updateViewState("selection", eventOrSelection);
			} else {
				updateViewState("selection", toggleInArray(selection, eventOrSelection.target.dataset.rowId));
				eventOrSelection.stopPropagation();
			}
		},
	};
};

const enhanceSortableColumn = (sorting, updateViewState, def) => {
	const isSortColumn = sorting.column && def.fieldName && sorting.column.toString() === def.fieldName.toString();
	const isAscending = isSortColumn && sorting.direction === "asc";
	const newDef = {
		...def,
		sort: () => {
			updateViewState("sorting", {
				column: def.fieldName,
				direction: isAscending ? "desc" : "asc",
			});
			def.sort(isAscending, def.fieldName, def.type);
		},
	};
	if (isSortColumn) {
		newDef.sortDirection = sorting.direction;
	}
	return newDef;
};

const enhanceColumnDef = (sorting, selection, updateViewState, columnDefs) =>
	columnDefs.map(def => {
		if (def.type === "select") {
			return enhanceSelectColumn(selection, updateViewState, def);
		}
		if (def.sort) {
			return enhanceSortableColumn(sorting, updateViewState, def);
		}
		return def;
	});

export default enhanceColumnDef;
