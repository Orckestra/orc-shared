import React from "react";
import styled from "styled-components";
import { FormattedNumber, FormattedDate, FormattedTime } from "react-intl";
import { safeGet } from "../../utils";
import Switch from "../Switch";
import Checkbox from "../Checkbox";
import Text from "../Text";

const arrify = thing => (Array.isArray(thing) ? thing : [thing]);

const renderByType = (value, def, rowId, selected, row) => {
	const transformedValue = def.transform ? def.transform(value) : value;
	switch (def.type) {
		case "custom": {
			const Comp = def.component;
			return <Comp {...row} />;
		}
		case "currency": {
			let currency = def.currency;
			if (Array.isArray(currency)) {
				currency = safeGet(row, ...currency);
			}
			return (
				<FormattedNumber
					style="currency" // eslint-disable-line react/style-prop-object
					currency={currency}
					value={transformedValue}
				/>
			);
		}
		case "date":
			return <FormattedDate value={transformedValue} />;
		case "datetime":
			return (
				<React.Fragment>
					<FormattedDate value={transformedValue} />{" "}
					<FormattedTime value={transformedValue} />
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
			return (
				<Switch
					value={!!transformedValue}
					{...def.switch}
					data-row-id={rowId}
				/>
			);
		default:
			return transformedValue ? <Text message={transformedValue} /> : null;
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
