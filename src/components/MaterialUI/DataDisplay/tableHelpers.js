import React from "react";
import { FormattedNumber, FormattedDate, FormattedTime, FormattedMessage } from "react-intl";
import safeGet from "../../../utils/safeGet";
import Checkbox from "../Inputs/Checkbox";
import Switch from "../../Switch";
import CheckboxProps from "../Inputs/CheckboxProps";

const renderByType = (e, def, rowId) => {
	const transformedValue = def.transform ? def.transform(e[def.fieldName]) : e[def.fieldName];

	switch (def.type) {
		case "custom": {
			return [def.builder(e)];
		}

		case "currency": {
			const currency = Array.isArray(def.currency) ? safeGet(e, ...def.currency) : def.currency;
			return [
				<FormattedNumber
					style="currency" // eslint-disable-line react/style-prop-object
					currency={currency}
					value={transformedValue || "0"}
				/>,
			];
		}

		case "date":
			return [<FormattedDate value={transformedValue} />];

		case "datetime":
			return [
				<React.Fragment>
					<FormattedDate value={transformedValue} /> <FormattedTime value={transformedValue} />
				</React.Fragment>,
			];

		case "select":
			const checkboxProps = new CheckboxProps();
			checkboxProps.set(CheckboxProps.propNames.update, def.onChange);
			checkboxProps.set(CheckboxProps.propNames.value, !!transformedValue);

			return [<Checkbox id={"select_" + transformedValue} data-row-id={rowId} checkboxProps={checkboxProps} />, null];

		case "switch":
			const titleCaption = transformedValue ? def.switch?.onCaption : def.switch?.offCaption;
			return [
				<Switch // TODO : Replace that component by Material-UI when we have it
					value={!!transformedValue}
					{...def.switch}
					data-row-id={rowId}
					onChange={def.onChange}
				/>,
				titleCaption ? <FormattedMessage {...titleCaption} /> : null,
			];

		default:
			return [transformedValue];
	}
};

export const buildHeaderAndRowFromConfig = (columnDefinitions, elements, keyField = "id") => {
	const headers = columnDefinitions.map(def => ({
		cellElement: typeof def.label === "object" ? <FormattedMessage {...def.label} /> : def.label,
		className: def.className,
	}));

	const rows = elements.map(e => {
		const rowId = e[keyField];
		return {
			key: rowId,
			element: e,
			columns: columnDefinitions.map(def => {
				const [cellElement, title] = renderByType(e, def, rowId);

				return {
					title: title === undefined ? cellElement : title,
					cellElement: cellElement,
					className: def.className,
				};
			}),
		};
	});

	return { headers, rows };
};

export default buildHeaderAndRowFromConfig;
