import React from "react";
import pt from "prop-types";
import styled from "styled-components";
import { safeGet } from "../../utils";
import Row from "./Row";
import HeadRow from "./HeadRow";
import withListState from "./withListState";

export const Table = styled.table`
	border-collapse: collapse;
	table-layout: fixed;
	width: 100%;
	font-size: 13px;
`;

export const List = ({
	columnDefs = [],
	rows = [],
	rowOnClick,
	selection = [],
	keyField = ["id"],
	virtual = false,
	scrollTop = 0,
	height = 300, // Arbitrary, set this prop according to scroll viewport size
	scrollBuffer = 10,
}) => {
	if (columnDefs.length === 0) return null;
	const rowIds = [],
		rowElements = [],
		rowHeight = 51;
	let virtualFilter = () => true;
	let heightAbove = 0,
		heightBelow = 0;
	if (virtual) {
		const correctedScrollTop = scrollTop - 41; // Subtract header height
		const firstIn = Math.floor(correctedScrollTop / rowHeight);
		const firstShow = Math.max(firstIn - scrollBuffer, 0);
		const lastIn = Math.ceil((correctedScrollTop + height) / rowHeight);
		const lastShow = Math.min(lastIn + scrollBuffer, rows.length);
		virtualFilter = index => index >= firstShow && index < lastShow;
		heightAbove = firstShow * rowHeight;
		heightBelow = (rows.length - lastShow) * rowHeight;
	}
	rows.forEach((row, index) => {
		const id = safeGet(row, ...keyField);
		rowIds.push(id);
		if (!virtualFilter(index)) return;
		rowElements.push(
			<Row
				columnDefs={columnDefs}
				key={id}
				rowId={id}
				row={row}
				onClick={rowOnClick}
				selected={selection.indexOf(id) !== -1}
			/>,
		);
	});
	return (
		<Table>
			<thead>
				<HeadRow
					columnDefs={columnDefs}
					rowIds={rowIds}
					allSelected={rows.length === selection.length && rows.length !== 0}
				/>
			</thead>
			<tbody>
				{virtual && heightAbove ? <tr style={{ height: heightAbove }} /> : null}
				{rowElements}
				{virtual && heightBelow ? <tr style={{ height: heightBelow }} /> : null}
			</tbody>
		</Table>
	);
};

const StatefulList = withListState(List);
StatefulList.propTypes = {
	columnDefs: pt.arrayOf(
		pt.oneOfType([
			pt.shape({ type: pt.oneOf(["select"]).isRequired }),
			// Type 'select'handles selection of rows.
			// Sorting isn't meaningful, label is replaced by a checkbox to select all/none.
			pt.shape({
				fieldName: pt.oneOfType([pt.string, pt.arrayOf(pt.string)]).required,
				label: pt.shape({
					id: pt.string.required,
					defaultMessage: pt.string,
				}),
				sort: pt.func,
				// function(descending: boolean, columnId: string, columnType: type enum)
				// Is called with the desired direction on click, should cause the list
				// to be sorted according to this column.
				type: pt.oneOf(["number", "currency", "date", "datetime", "switch"]), // default shows raw value
				// Switch type shows a switch, and takes a boolean value and an onChange handler that takes a row id.
				currency: pt.string, // string, three-letter ISO 4217 currency code, only used for type 'currency'
				switch: pt.object, // object, contains properties for the switch component, only used for type 'switch'
				defaultValue: pt.any, // default value of correct type
			}),
		]),
	),
	rows: pt.arrayOf(pt.object),
	rowOnClick: pt.func, // Click handler for row.
	// Fires when row is clicked, excluding select or switch columns
	// Event target will have a 'rowId' data value which identifies the clicked row.
	keyField: pt.arrayOf(pt.string), // Path to identifying data field on each row.
};

export default StatefulList;
