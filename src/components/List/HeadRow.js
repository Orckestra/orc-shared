import React from "react";
// import styled from "styled-components";
import { styled } from "@mui/material/styles";
import { TableRow, stringifyFieldName } from "./Row";
import HeadCell from "./HeadCell";

export const HeadTableRow = styled(TableRow)`
	border-width: 0;
`;

const HeadRow = ({ columnDefs, rowIds, allSelected }) => (
	<HeadTableRow>
		{columnDefs.map(columnDef => (
			<HeadCell
				key={columnDef.type === "select" ? "select" : stringifyFieldName(columnDef.fieldName)}
				{...{ columnDef, rowIds, allSelected }}
			/>
		))}
	</HeadTableRow>
);

export default HeadRow;
