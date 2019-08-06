import React from "react";
import pt from "prop-types";
import { memoize } from "../../utils";
import routingConnector from "../../hocs/routingConnector";
import withScrollBox from "../../hocs/withScrollBox";
import { cultureList } from "../../selectors/locale";
import { ptLabel } from "../Text";
import Form from "./FormElement";
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

export const withCultureCount = routingConnector(
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

const WiredForm = withScrollBox(withCultureCount(FormPage));

/* PropTypes */
const ptField = pt.oneOfType([
	pt.shape({
		type: pt.oneOf([
			"CheckboxInput",
			"DateInput",
			"EmailInput",
			"LineLabel",
			"NumberInput",
			"ReadOnly",
			"TextInput",
			"TimeInput",
		]).isRequired,
		label: ptLabel,
		name: pt.string.isRequired,
	}),
	pt.shape({
		type: pt.oneOf(["TranslationInput"]).isRequired,
		label: ptLabel,
		name: pt.string.isRequired,
		moreLabel: ptLabel.isRequired,
	}),
	pt.shape({
		type: pt.oneOf(["SwitchInput"]).isRequired,
		label: ptLabel,
		name: pt.string.isRequired,
		onCaption: ptLabel,
		offCaption: ptLabel,
		onColor: pt.string,
		offColor: pt.string,
	}),
	pt.shape({
		type: pt.oneOf(["Selector", "MultiSelector"]).isRequired,
		name: pt.string.isRequired,
		label: ptLabel,
		options: pt.arrayOf(
			pt.exact({ label: ptLabel.isRequired, value: pt.any.isRequired }),
		),
		placeholder: ptLabel,
	}),
	pt.shape({
		type: pt.oneOf(["Button"]).isRequired,
		name: pt.string.isRequired,
		buttonText: ptLabel,
		primary: pt.bool,
		icon: pt.string,
	}),
	pt.shape({
		type: pt.oneOf(["SmallButton"]).isRequired,
		name: pt.string.isRequired,
		altText: ptLabel,
		primary: pt.bool,
		icon: pt.string,
	}),
]);

const ptComboField = pt.shape({
	type: pt.oneOf(["Combination"]).isRequired,
	label: ptLabel,
	fields: pt.arrayOf(ptField).isRequired,
	proportions: pt.arrayOf(pt.oneOfType([pt.string, pt.number])),
});

const ptFieldSet = pt.shape({
	type: pt.oneOf(["Fieldset"]).isRequired,
	label: ptLabel,
	fields: pt.arrayOf(ptField).isRequired,
});

const ptList = pt.shape({
	type: pt.oneOf(["List"]),
	rowCount: pt.number,
	staticValues: pt.arrayOf(pt.object),
	rowField: pt.oneOf([ptField, ptComboField]).isRequired,
});

WiredForm.propTypes = {
	getUpdater: pt.func.isRequired,
	fields: pt.arrayOf(pt.oneOfType([ptField, ptComboField, ptFieldSet, ptList]))
		.isRequired,
	values: pt.object.isRequired,
	wide: pt.bool,
};

/* PropTypes end */

export default WiredForm;
