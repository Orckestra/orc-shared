import React from "react";
import styled, { css } from "styled-components";
import { withHandlers } from "recompose";
import { ifFlag } from "../../utils";
import DataCell from "./DataCell";

// Clicks on these elements will not be handled by the row onClick
const formTags = ["INPUT", "SELECT", "LABEL"];

export const withRowClick = withHandlers(({ onClick }) => {
	if (!onClick) return {};
	return {
		onClick: ({ onClick, rowId }) => event => {
			if (formTags.indexOf(event.target.tagName) === -1) {
				if (!event.target.dataset["rowId"]) {
					event.target.dataset["rowId"] = rowId;
				}
				onClick(event);
			}
		},
	};
});

export const TableRow = styled.tr`
	border: 0 solid #cccccc;
	border-top-width: 1px;
	border-bottom-width: 1px;

	&:first-child {
		border-top-width: 0;
	}

	${ifFlag(
		"bgColor",
		props =>
			css`
				background-color: ${props.bgColor};
			`,
		css`
			transition: background-color 0.2s ease-in;
			&:hover {
				background-color: #f3f3f3;
			}
		`,
	)}
`;

export const Row = ({ columnDefs, row, rowId, selected, onClick, bgColor }) => (
	<TableRow onClick={onClick} bgColor={bgColor}>
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
