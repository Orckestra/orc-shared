import React from "react";
import styled from "styled-components";
import { FormattedNumber, FormattedDate, FormattedTime } from "react-intl";
import { safeGet } from "../../utils";
import Switch from "../Switch";
import Checkbox from "../Checkbox";

const arrify = thing => (Array.isArray(thing) ? thing : [thing]);

const renderByType = (value, def, rowId, selected, row) => {
	switch (def.type) {
		case "currency": {
			let currency = def.currency;
			if (Array.isArray(currency)) {
				currency = safeGet(row, ...currency);
			}
			return (
				<FormattedNumber
					style="currency" // eslint-disable-line react/style-prop-object
					currency={currency}
					value={value}
				/>
			);
		}
		case "date":
			return <FormattedDate value={value} />;
		case "datetime":
			return (
				<React.Fragment>
					<FormattedDate value={value} /> <FormattedTime value={value} />
				</React.Fragment>
			);
		case "select":
			return (
				<Checkbox
					value={selected}
					data-row-id={rowId}
					onChange={def.onChange}
				/>
			);
		case "switch":
			return <Switch value={!!value} {...def.switch} data-row-id={rowId} />;
		default:
			return value;
	}
};

export const TableData = styled.td`
	height: 20px;
	padding: 15px 20px;
	white-space: nowrap;
	overflow-x: hidden;
	text-overflow: ellipsis;
`;

const DataCell = ({ columnDef, row, rowId, selected }) => (
	<TableData>
		{renderByType(
			safeGet(row, ...arrify(columnDef.fieldName)) || columnDef.defaultValue,
			columnDef,
			rowId,
			selected,
			row,
		)}
	</TableData>
);

export default DataCell;
