import { compose, mapProps } from "recompose";
import withViewState from "../../hocs/withViewState";

const toggleInArray = (nameList, name) => {
	if (nameList.indexOf(name) !== -1) {
		return nameList.filter(n => n !== name);
	} else {
		return nameList.concat(name);
	}
};

const withLinkHooks = mapProps(
	({
		updateViewState,
		selection = [],
		columnDefs,
		sorting = {},
		...otherProps
	}) => {
		const enhancedColumnDefs = columnDefs.map(def => {
			if (def.type === "select") {
				return {
					fieldName: "selection",
					...def,
					onChange: eventOrSelection => {
						if (Array.isArray(eventOrSelection)) {
							updateViewState("selection", eventOrSelection);
						} else {
							updateViewState(
								"selection",
								toggleInArray(selection, eventOrSelection.target.dataset.rowId),
							);
							eventOrSelection.stopPropagation();
						}
					},
				};
			}
			if (def.sort) {
				const isSortColumn =
					sorting.column &&
					def.fieldName &&
					sorting.column.toString() === def.fieldName.toString();
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
			}
			return def;
		});

		return {
			columnDefs: enhancedColumnDefs,
			selection,
			...otherProps,
		};
	},
);

export default compose(
	withViewState,
	withLinkHooks,
);
