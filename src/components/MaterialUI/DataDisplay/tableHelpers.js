import React from "react";
import { FormattedNumber, FormattedDate, FormattedTime } from "react-intl";
import safeGet from "../../../utils/safeGet";
import Checkbox from "../Inputs/Checkbox";
import Switch from "../Inputs/Switch";
import SwitchProps from "../Inputs/SwitchProps";
import CheckboxProps from "../Inputs/CheckboxProps";
import TableHeaderCell from "./TableHeaderCell";
import StandaloneRadio from "../Inputs/StandaloneRadio";
import StandaloneRadioProps from "../Inputs/standaloneRadioProps";
import TooltippedTypography from "./TooltippedElements/TooltippedTypography";

const renderByType = (e, def, rowId, readOnly) => {
	const transformedValue = def.transform ? def.transform(e[def.fieldName]) : e[def.fieldName];

	switch (def.type) {
		case "custom": {
			return [def.builder(e, readOnly, def.fieldName)];
		}

		case "currency": {
			const currency = Array.isArray(def.currency) ? safeGet(e, ...def.currency) : def.currency;

			const currencyValue = (
				<FormattedNumber
					style="currency" // eslint-disable-line react/style-prop-object
					currency={currency}
					value={transformedValue || "0"}
				/>
			);
			const tooltippedCurrencyValue = (
				<TooltippedTypography noWrap children={currencyValue} titleValue={currencyValue} />
			);
			return currency != null ? [tooltippedCurrencyValue] : [null];
		}

		case "date":
			const dateValue = <FormattedDate value={transformedValue} />;
			const tooltippedDateValue = <TooltippedTypography noWrap children={dateValue} titleValue={dateValue} />;
			return transformedValue != null ? [tooltippedDateValue] : [null];

		case "datetime":
			const datetimeValue = (
				<React.Fragment>
					<FormattedDate value={transformedValue} /> <FormattedTime value={transformedValue} />
				</React.Fragment>
			);
			const tooltippedDatetimeValue = (
				<TooltippedTypography noWrap children={datetimeValue} titleValue={datetimeValue} />
			);
			return transformedValue != null ? [tooltippedDatetimeValue] : [null];

		case "select":
			const checkboxProps = new CheckboxProps();
			checkboxProps.set(CheckboxProps.propNames.update, def.onChange);
			checkboxProps.set(CheckboxProps.propNames.value, !!transformedValue);
			checkboxProps.set(CheckboxProps.propNames.readOnly, readOnly);

			return [<Checkbox id={"select_" + transformedValue} data-row-id={rowId} checkboxProps={checkboxProps} />, null];

		case "switch":
			const switchProps = new SwitchProps();
			switchProps.set(SwitchProps.propNames.value, !!transformedValue);
			switchProps.set(SwitchProps.propNames.onCaption, def.switch?.onCaption);
			switchProps.set(SwitchProps.propNames.offCaption, def.switch?.offCaption);
			switchProps.set(SwitchProps.propNames.readOnly, readOnly);
			switchProps.set(SwitchProps.propNames.update, def.onChange);

			return transformedValue != null ? [<Switch data-row-id={rowId} switchProps={switchProps} />] : [null];

		case "radio":
			const selectedValue = def.selectedValue;
			const onChange = def.onChangeCallback;
			const groupName = def.groupName;

			const radioProps = new StandaloneRadioProps();
			radioProps.set(StandaloneRadioProps.propNames.checked, selectedValue === transformedValue);
			radioProps.set(StandaloneRadioProps.propNames.value, transformedValue);
			radioProps.set(StandaloneRadioProps.propNames.name, groupName);
			radioProps.set(StandaloneRadioProps.propNames.onChange, onChange);
			radioProps.set(StandaloneRadioProps.propNames.readOnly, readOnly);
			return [<StandaloneRadio radioProps={radioProps} />];

		default:
			return transformedValue != null
				? [<TooltippedTypography noWrap children={transformedValue} titleValue={transformedValue} />]
				: [null];
	}
};

export const buildHeaderAndRowFromConfig = (columnDefinitions, elements, readOnly = true, keyField = "id") => {
	if (columnDefinitions.filter(def => def.sortOptions != null && def.sortOptions.sortField).length > 1) {
		throw new Error("Only one active sort column can exist at the same time");
	}

	const headers = columnDefinitions.map(def => ({
		cellElement: <TableHeaderCell columnDefinition={def} />,
		className: def.className,
	}));

	const rows = elements.map(e => {
		const rowId = e[keyField];
		return {
			key: rowId,
			element: e,
			columns: columnDefinitions.map(def => {
				const [cellElement, title] = renderByType(e, def, rowId, readOnly);

				return {
					title: def.tooltipable !== false ? (title === undefined ? cellElement : title) : null,
					cellElement: cellElement,
					className: def.className,
				};
			}),
		};
	});

	return { headers, rows };
};

export default buildHeaderAndRowFromConfig;
