import { useState } from "react";

export const staticTableSelectionMethods = {
	selectionHandler: null,
	isSelected: null,
};

export const tableSelectionMode = Object.freeze({ none: 1, indeterminate: 2, all: 3 });

export const useTableSelection = rows => {
	const [selected, setSelected] = useState({});
	const selectedNumber = Object.keys(selected).length;

	staticTableSelectionMethods.selectionHandler = (event, key) => {
		const newSelection = {
			...(key === null ? {} : selected),
		};

		if (key === null) {
			if (event.target.checked) {
				rows.forEach(r => (newSelection[r.key] = true));
			}
		} else {
			if (event.target.checked) newSelection[key] = event.target.checked;
			else delete newSelection[key];
		}

		setSelected(newSelection);
	};

	staticTableSelectionMethods.isSelected = key => selected[key] === true;

	const tableSelectionStatus =
		selectedNumber === 0
			? tableSelectionMode.none
			: selectedNumber === rows.length
			? tableSelectionMode.all
			: tableSelectionMode.indeterminate;

	// static object is to improve IE performance as it had a huge impact when returning new functions everytime
	return [selectedNumber, tableSelectionStatus, staticTableSelectionMethods];
};

export default useTableSelection;
