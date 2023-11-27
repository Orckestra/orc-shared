import { useSelector } from "react-redux";
import { extractDropboxOptions } from "../../../utils/filterHelper";
import { namedLookupValuesSelector } from "../../../selectors/metadata";
import { getNotLocalizedString } from "../../../utils/localizationHelper";
import createInput, { inputTypes } from "./createInput";

const LookupSelect = ({ moduleName, lookupName, value, onChange, disabled, metadata }) => {
	const options = extractDropboxOptions(useSelector(namedLookupValuesSelector(moduleName, lookupName)));

	if (value !== null && !options.some(x => x.value === value)) {
		options.push({
			label: getNotLocalizedString(value),
			value: value,
			sortOrder: 0,
		});
	}

	return createInput(inputTypes.select, {
		options: options,
		value: value,
		update: newValue => onChange(newValue, metadata),
		disabled: disabled,
	});
};

export default LookupSelect;
