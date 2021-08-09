import { useState } from "react";

export const tableSelectionMode = Object.freeze({ none: 1, indeterminate: 2, all: 3 });

// When "selectedRowsChanged" is set, it means the selection is managed externally of the Table component.
// By default, it is managed internally but the state is not persistent through unmounting and remounting stages.
export const useTableSelection = (rows, selectedRows = null, selectedRowsChanged = null) => {
	const [selected, setSelected] = useState({}); // Default internal management of selected rows if none are specified
	const selectedNumber = Object.keys(selectedRows ? selectedRows : selected).length;

	const selectionHandler = (event, key) => {
		const newSelection = {
			...(key === null ? {} : selectedRows ? selectedRows : selected),
		};

		if (key === null) {
			if (event.target.checked) {
				rows.forEach(r => (newSelection[r.key] = true));
			}
		} else {
			if (event.target.checked) newSelection[key] = event.target.checked;
			else delete newSelection[key];
		}

		if (selectedRowsChanged !== null) {
			selectedRowsChanged(newSelection);
		} else {
			setSelected(newSelection);
		}
	};

	const isSelected = key => (selectedRows || selected)[key] === true;

	const tableSelectionStatus =
		selectedNumber === 0
			? tableSelectionMode.none
			: selectedNumber === rows.length
			? tableSelectionMode.all
			: tableSelectionMode.indeterminate;

	return [selectedNumber, tableSelectionStatus, { selectionHandler, isSelected }];
};

export default useTableSelection;
