import React from "react";
import styled from "styled-components";
import { TableRow } from "./Row";
import HeadCell from "./HeadCell";

export const HeadTableRow = styled(TableRow)`
	border-width: 0;
`;

const HeadRow = ({ columnDefs, rowIds, allSelected }) => (
	<HeadTableRow>
		{columnDefs.map(columnDef => (
			<HeadCell
				key={columnDef.fieldName}
				{...{ columnDef, rowIds, allSelected }}
			/>
		))}
	</HeadTableRow>
);

export default HeadRow;
