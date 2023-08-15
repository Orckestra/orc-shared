import React from "react";
import TooltippedTypography from "../TooltippedElements/TooltippedTypography";
import { namedLookupLocalizedSelector } from "../../../../selectors/metadata";
import { useSelector } from "react-redux";

const LookupDisplayValue = ({ moduleName, lookupName, lookupKey, lookupReplacementValues, ...otherProps }) => {
	let value = useSelector(namedLookupLocalizedSelector(moduleName, lookupName, lookupKey));

	if (value && lookupReplacementValues) {
		Object.keys(lookupReplacementValues).forEach(key => {
			value = value.replace("{" + key + "}", lookupReplacementValues[key]);
		});
	}

	return <TooltippedTypography noWrap {...otherProps} children={value} titleValue={value} />;
};

export default LookupDisplayValue;
