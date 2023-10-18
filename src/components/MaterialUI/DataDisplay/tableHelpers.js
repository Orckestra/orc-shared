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
import InputBase from "./../Inputs/InputBase";
import InputBaseProps from "./../Inputs/InputBaseProps";

const defaultRendering = (e, def, rowId, readOnly, transformedValue) => {
	return transformedValue != null ? (
		<TooltippedTypography noWrap children={transformedValue} titleValue={transformedValue} />
	) : null;
};

const renderByType = (e, def, rowId, readOnly, transformedValue, index) => {
	switch (def.type) {
		case "custom": {
			return [def.builder(e, readOnly, def, index) || defaultRendering(e, def, rowId, readOnly, transformedValue)];
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
			checkboxProps.set(
				CheckboxProps.propNames.readOnly,
				def.transform?.readOnly != null ? def.transform.readOnly(e, readOnly, def) : readOnly,
			);
			checkboxProps.set(CheckboxProps.propNames.metadata, { id: rowId, name: def.fieldName });

			return [<Checkbox id={"select_" + transformedValue} data-row-id={rowId} checkboxProps={checkboxProps} />, null];

		case "switch":
			const switchProps = new SwitchProps();
			switchProps.set(SwitchProps.propNames.value, def.reversed ? !transformedValue : !!transformedValue);
			switchProps.set(SwitchProps.propNames.onCaption, def.switch?.onCaption);
			switchProps.set(SwitchProps.propNames.offCaption, def.switch?.offCaption);
			switchProps.set(
				SwitchProps.propNames.readOnly,
				def.transform?.readOnly != null ? def.transform.readOnly(e, readOnly, def) : readOnly,
			);
			switchProps.set(
				SwitchProps.propNames.disabled,
				def.transform?.disabled != null ? def.transform.disabled(e, readOnly, def) : def.disabled,
			);
			switchProps.set(SwitchProps.propNames.update, def.onChange);
			switchProps.set(SwitchProps.propNames.className, def.switch?.className);
			switchProps.set(SwitchProps.propNames.metadata, { id: rowId, name: def.fieldName });

			return transformedValue != null ? [<Switch data-row-id={rowId} switchProps={switchProps} />] : [null];

		case "radio":
			const selectedValue = def.selectedValue;
			const onChange = def.onChangeCallback;
			const groupName = def.groupName;

			const radioProps = new StandaloneRadioProps();
			radioProps.set(
				StandaloneRadioProps.propNames.checked,
				def.transform?.checked != null ? def.transform.checked(e, readOnly, def) : selectedValue === transformedValue,
			);
			radioProps.set(StandaloneRadioProps.propNames.value, transformedValue);
			radioProps.set(
				StandaloneRadioProps.propNames.name,
				def.transform?.name != null ? def.transform.name(e, readOnly, def) : groupName,
			);
			radioProps.set(StandaloneRadioProps.propNames.onChange, onChange);
			radioProps.set(
				StandaloneRadioProps.propNames.readOnly,
				def.transform?.readOnly != null ? def.transform.readOnly(e, readOnly, def) : readOnly,
			);
			return [<StandaloneRadio radioProps={radioProps} />];

		case "textInput":
			const inputBaseProps = new InputBaseProps();
			inputBaseProps.set(InputBaseProps.propNames.value, transformedValue);
			inputBaseProps.set(
				InputBaseProps.propNames.disabled,
				def.transform?.disabled != null ? def.transform.disabled(e, readOnly, def) : def.disabled,
			);
			inputBaseProps.set(InputBaseProps.propNames.update, def.onChange);
			inputBaseProps.set(InputBaseProps.propNames.placeholder, def.placeholder);
			inputBaseProps.set(
				InputBaseProps.propNames.error,
				def.transform?.error != null ? def.transform.error(e, readOnly, def) : def.error,
			);
			inputBaseProps.set(InputBaseProps.propNames.inputAttributes, def.inputAttributes);
			inputBaseProps.set(InputBaseProps.propNames.metadata, { id: rowId, name: def.fieldName });
			return [<InputBase inputProps={inputBaseProps} />];
		default:
			return [defaultRendering(e, def, rowId, readOnly, transformedValue)];
	}
};

const renderByTypeInEditingMode = (e, def, rowId, readOnly, transformedValue, index) => {
	if ((def.editingBuilder || null) !== null)
		return [def.editingBuilder(e, readOnly, def, index) || defaultRendering(e, def, rowId, readOnly, transformedValue)];

	return renderByType(e, def, rowId, readOnly, transformedValue, index);
};

export const buildHeaderAndRowFromConfig = (
	columnDefinitions,
	elements,
	readOnly = true,
	keyField = "id",
	showCustomClass = false,
) => {
	if (columnDefinitions.filter(def => def.sortOptions != null && def.sortOptions.sortField).length > 1) {
		throw new Error("Only one active sort column can exist at the same time");
	}

	const headers = columnDefinitions
		.filter(def => def.visible !== false)
		.map(def => ({
			cellElement: <TableHeaderCell columnDefinition={def} />,
			className: def.className,
		}));

	const rows = elements.map((e, index) => {
		const rowId = e[keyField];
		const elementClass = e.customClass || "";
		return {
			key: rowId,
			element: e,
			style: { show: showCustomClass, customClass: elementClass },
			columns: columnDefinitions
				.filter(def => def.visible !== false)
				.map(def => {
					const transformedValue = def.transform?.value ? def.transform.value(e[def.fieldName]) : e[def.fieldName];

					const [cellElement, title] = readOnly
						? renderByType(e, def, rowId, readOnly, transformedValue, index)
						: renderByTypeInEditingMode(e, def, rowId, readOnly, transformedValue, index);

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
