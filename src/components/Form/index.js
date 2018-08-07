import React from "react";
import { connect } from "react-redux";
import { memoize } from "../../utils";
import withScrollBox from "../../hocs/withScrollBox";
import { cultureList } from "../../selectors/locale";
import Form from "./Form";
import FieldElements from "./FieldElements";

const heights = {
	label: 27,
	baseInput: 30,
	fieldMargin: 20,
	listMargin: 10,
	fieldsetHead: 47,
};

export const fieldHeight = (field, values = {}, numCultures = 1) => {
	switch (field.type) {
		case "Fieldset":
			return (
				heights.fieldsetHead +
				heights.fieldMargin +
				field.fields.reduce(
					(sum, field) => sum + fieldHeight(field, values, numCultures),
					0,
				)
			);
		case "List": {
			if (field.rowCount) {
				return (
					field.rowCount * (heights.baseInput + heights.listMargin) +
					heights.listMargin +
					heights.label
				); // Assuming there is a label
			} else {
				return (
					((values[field.name] || []).length + 1) *
						(heights.baseInput + heights.listMargin) +
					heights.listMargin +
					heights.label
				); // Assuming there is a label
			}
		}
		case "Combination": {
			let label = 0;
			if (field.label !== undefined) {
				label += heights.label;
			}
			if (field.fields.some(field => field.label !== undefined)) {
				label += heights.label;
			}
			return heights.baseInput + heights.fieldMargin + label;
		}
		case "TranslationInput": {
			// Set aside space enough to open fully
			return (
				numCultures * (heights.baseInput + heights.listMargin) +
				heights.listMargin +
				(field.label !== undefined ? heights.label : 0)
			);
		}
		default:
			return (
				heights.baseInput +
				heights.fieldMargin +
				(field.label !== undefined ? heights.label : 0)
			);
	}
};

const colWidth = 480;
export const calculateFormHeight = memoize(
	(width, fields = [], values, numCultures) => {
		const numColumns = Math.floor(width / colWidth);
		const fieldHeights = fields.map(field =>
			fieldHeight(field, values, numCultures),
		);
		const allFieldsHeight = fieldHeights.reduce((sum, h) => sum + h, 0);
		const minColumnHeight = allFieldsHeight / numColumns - 50;
		const columnHeights = fieldHeights.reduce(
			(cols, height) => {
				const [...outCols] = cols;
				const lastIndex = outCols.length - 1;
				if (height > minColumnHeight && outCols[lastIndex] !== 0) {
					// Try to keep any very large elements alone
					outCols.push(height);
					/* istanbul ignore else */
					if (outCols.length < numColumns) {
						outCols.push(0);
					}
				} else {
					outCols[lastIndex] += height;
					if (
						outCols[lastIndex] > minColumnHeight &&
						outCols.length < numColumns
					) {
						outCols.push(0);
					}
				}
				return outCols;
			},
			[0],
		);
		return Math.max(...columnHeights);
	},
);

export const withCultureCount = connect(
	state => ({ cultureCount: cultureList(state).size }),
	() => ({}),
);

const randomName = () =>
	Math.floor(Math.random() * 16777215)
		.toString(16)
		.padStart(6, "0");

export const addNamesToFields = memoize(fields =>
	fields.map(field => {
		const outField = {
			name: randomName(),
			...field,
		};
		if (field.fields) {
			outField.fields = addNamesToFields(field.fields);
		}
		if (field.rowField) {
			outField.rowField = addNamesToFields([field.rowField])[0];
		}
		return outField;
	}),
);

export const FormPage = ({
	getUpdater,
	fields,
	values,
	width = 1000,
	cultureCount,
	wide,
}) => (
	<Form
		h={calculateFormHeight(width, fields, values, cultureCount)}
		wide={wide}
	>
		<FieldElements
			getUpdater={getUpdater}
			fields={addNamesToFields(fields)}
			values={values}
			wide={wide}
		/>
	</Form>
);

export default withScrollBox(withCultureCount(FormPage));
