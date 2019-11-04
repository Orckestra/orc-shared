import React from "react";
import styled from "styled-components";
import { compose, withHandlers } from "recompose";
import { memoize } from "../../utils";
import Button from "../Button";
import Text from "../Text";
import FieldElements from "./FieldElements";
import Field, { FieldBox } from "./Field";

export const REMOVE_ROW = "__form_list_remove_row";

const generateId = (() => {
	let counter = 0;
	return /* istanbul ignore next */ () => (counter += 1);
})();

const stripLabelFromTree = ({ fields, label, ...remainder }) => {
	const tree = {
		...remainder,
	};
	if (fields && Array.isArray(fields)) {
		tree.fields = fields.map(stripLabelFromTree);
	}
	return tree;
};

export const List = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 20px;

	& > ${FieldBox} {
		margin-top: 0;
	}

	& > ${FieldBox} + ${FieldBox} {
		margin-top: 10px;
	}
`;

export const ListControlButton = styled(Button).attrs({ primary: true })`
	align-self: flex-start;
	min-width: 100px;
`;

const decorateField = (field, remove = "[remove]") => {
	if (field.type === "Combination") {
		// Add the closer to the tail end of the combo
		/* istanbul ignore next */
		const { fields = [], proportions = [], ...remainder } = field;
		const decoratedProportions = [...proportions];
		decoratedProportions[fields.length] = "30px";
		const decoratedFields = fields.concat([
			{
				type: "SmallButton",
				name: REMOVE_ROW,
				primary: true,
				icon: "cross",
				altText: remove,
			},
		]);
		return {
			...remainder,
			proportions: decoratedProportions,
			fields: decoratedFields,
		};
	}
	// Wrap field in a combo with the closer
	return {
		type: "Combination",
		name: "rowField",
		// Set field base size to fit in field set
		proportions: [100, "30px"],
		fields: [
			field,
			{
				type: "SmallButton",
				name: REMOVE_ROW,
				primary: true,
				icon: "cross",
				altText: remove,
			},
		],
	};
};

export const FieldList = ({
	name,
	getRows,
	staticValues = [],
	rowField,
	listUpdater,
	rowCount,
	listIndex,
	...props
}) => {
	if (listIndex !== undefined) {
		return <span>Cannot render list inside list</span>;
	}
	const renderField =
		rowCount === undefined ? decorateField(rowField, props.remove) : rowField;
	return (
		<List>
			<FieldElements fields={[renderField]} labelOnly />
			{getRows().map((row, index) => (
				<FieldElements
					key={row.id}
					fields={[stripLabelFromTree(renderField)]}
					listIndex={index}
					getUpdater={listUpdater(index)}
					values={{
						...row,
						...staticValues[index],
					}}
				/>
			))}
			{rowCount === undefined ? (
				<Field>
					<ListControlButton onClick={listUpdater(-1)}>
						<Text message={props.add || "[add]"} />
					</ListControlButton>
				</Field>
			) : null}
		</List>
	);
};

const createRowGetter = (valueList = [], rowCount) => {
	const rows = [];
	if (rowCount === undefined) {
		rows.push(...valueList);
	} else {
		for (let i = 0; i < rowCount; i += 1) {
			const row = { ...valueList[i] };
			if (!row.id) {
				row.id = generateId();
				valueList.forEach(valRow => {
					/* istanbul ignore else */
					if (valRow.id) {
						while (valRow.id >= row.id) {
							row.id = generateId();
						}
					}
				});
			}
			rows.push(row);
		}
	}
	return () => rows;
};

const withRowGetter = withHandlers({
	getRows: ({ values, name, rowCount }) =>
		createRowGetter(values[name], rowCount),
});

const getListFieldUpdater = (updateAll, getRows) => {
	return memoize(index => {
		if (index < 0) {
			return () => {
				const rows = getRows();
				let id = generateId();
				rows.forEach(row => {
					/* istanbul ignore else */
					if (row.id) {
						while (row.id >= id) {
							id = generateId();
						}
					}
				});
				rows.push({ id });
				updateAll(rows);
			};
		}
		return memoize(name => {
			if (name === REMOVE_ROW) {
				return () =>
					setTimeout(() => {
						const rows = getRows();
						rows.splice(index, 1);
						updateAll(rows);
					}, 0);
			}
			return value => {
				const rows = getRows();
				rows[index][name] = value;
				updateAll(rows);
			};
		});
	});
};

const withListUpdater = withHandlers({
	listUpdater: ({ getUpdater, name, getRows }) =>
		getListFieldUpdater(getUpdater(name), getRows),
});

export default compose(
	withRowGetter,
	withListUpdater,
)(FieldList);
