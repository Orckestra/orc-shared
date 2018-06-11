import React from "react";
import styled from "styled-components";
import { withHandlers } from "recompose";
import DataCell from "./DataCell";

// Clicks on these elements will not be handled by the row onClick
const formTags = ["INPUT", "SELECT", "LABEL"];

export const withRowClick = withHandlers({
	onClick: ({ onClick, rowId }) => event => {
		if (formTags.indexOf(event.target.tagName) === -1) {
			event.rowId = rowId;
			onClick(event);
		}
	},
});

export const TableRow = styled.tr`
	border: 0 solid #cccccc;
	border-top-width: 1px;
	border-bottom-width: 1px;
	transition: background-color 0.2s ease-in;

	&:first-child {
		border-top-width: 0;
	}

	&:hover {
		background-color: #f3f3f3;
	}
`;

export const Row = ({ columnDefs, row, rowId, selected, onClick }) => (
	<TableRow onClick={onClick}>
		{columnDefs.map(columnDef => (
			<DataCell
				key={columnDef.fieldName}
				{...{
					rowId,
					row,
					columnDef,
					selected,
				}}
			/>
		))}
	</TableRow>
);

export default withRowClick(Row);
