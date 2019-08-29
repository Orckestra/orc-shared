/*
	Multiple lists with a single header, aligned with each other
	Leans on List components etc.
	No virtualization or page loading
	Categories can be folded up to hide content
	Sortable, within categories
*/
import React from "react";
import { compose, setDisplayName } from "recompose";
import { safeGet } from "../utils";
import withScrollBox from "../hocs/withScrollBox";
import Row from "./List/Row";
import HeadRow from "./List/HeadRow";
import { Table, Placeholder, HEADER_HEIGHT } from "./List/List";
import withListState from "./List/withListState";

export const CategoryList = ({
	columnDefs = [],
	rows = [],
	rowOnClick,
	placeholder,
	selection = [],
	keyField = ["id"],
	height,
	rowBackgroundGetter = () => {},
}) => {
	if (columnDefs.length === 0) return null;
	const rowIds = [],
		rowElements = [];
	rows.forEach((row, index) => {
		const id = safeGet(row, ...keyField) + ""; // Ensure rowId is string
		rowIds.push(id);
		rowElements.push(
			<Row
				columnDefs={columnDefs}
				key={id}
				rowId={id}
				row={row}
				onClick={rowOnClick}
				selected={selection.indexOf(id) !== -1}
				bgColor={rowBackgroundGetter(row, index)}
			/>,
		);
	});
	if (rowElements.length === 0 && placeholder) {
		rowElements.push(
			<Placeholder
				key="placeholder"
				width={columnDefs.length}
				height={height - HEADER_HEIGHT}
			>
				{placeholder}
			</Placeholder>,
		);
	}
	return (
		<Table>
			<thead>
				<HeadRow
					columnDefs={columnDefs}
					rowIds={rowIds}
					allSelected={rows.length === selection.length && rows.length !== 0}
				/>
			</thead>
			<tbody>{rowElements}</tbody>
		</Table>
	);
};

const StatefulCategoryList = compose(
	setDisplayName("CategoryList"),
	withScrollBox,
	withListState,
)(CategoryList);

export default StatefulCategoryList;
