import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { ifFlag } from "../../utils";
import DataCell from "./DataCell";

export const stringifyFieldName = name => {
	if (Array.isArray(name)) {
		return name.join("_");
	} else {
		return name && name.toString();
	}
};

export const TableRow = styled.tr`
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

	${ifFlag(
		"onClick",
		css`
			& td {
				cursor: pointer;
			}
		`,
	)}
`;

// Clicks on these elements will not be handled by the row onClick
const formTags = ["INPUT", "SELECT", "LABEL"];

export const Row = ({ columnDefs, row, rowId, selected, rowOnClick, bgColor }) => {
	const onClick = useCallback(
		event => {
			if (formTags.indexOf(event.target.tagName) === -1) {
				/* istanbul ignore else */
				if (!event.target.dataset["rowId"]) {
					event.target.dataset["rowId"] = rowId;
				}
				rowOnClick(event);
			}
		},
		[rowOnClick, rowId],
	);
	return (
		<TableRow onClick={rowOnClick ? onClick : undefined} bgColor={bgColor}>
			{columnDefs.map(columnDef => (
				<DataCell
					key={stringifyFieldName(columnDef.fieldName)}
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
};

export default Row;
