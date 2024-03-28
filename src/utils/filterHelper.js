import { allValue } from "../constants";
import { memoize } from "./index";
import { getNotLocalizedString } from "./localizationHelper";

export const getValueWithAll = value => {
	if (!value) return allValue;
	return value;
};

export const substituteAllForNull = value => (value === allValue ? null : value);

export const extractDropboxOptionsMemo = (data, config = undefined) => {
	const {
		activeKey = "isActive",
		valueKey = "value",
		labelKey = "displayName",
		fallbackLabelKey = undefined,
		sortOrderKey = "sortOrder",
	} = config ?? {};
	let items = Array.isArray(data) ? data : data.valueSeq();
	let options = [];
	items.forEach(v => {
		if (!activeKey || v.get(activeKey)) {
			const value = v.get(valueKey);
			options.push({
				value: value,
				label: v.get(labelKey) || (fallbackLabelKey && v.get(fallbackLabelKey)) || getNotLocalizedString(value),
				sortOrder: v.get(sortOrderKey),
			});
		}
	});

	return options;
};

export const extractDropboxOptions = memoize(extractDropboxOptionsMemo);
