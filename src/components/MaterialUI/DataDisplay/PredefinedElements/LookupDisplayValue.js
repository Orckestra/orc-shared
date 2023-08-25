import React from "react";
import TooltippedTypography from "../TooltippedElements/TooltippedTypography";
import { namedLookupLocalizedSelector } from "../../../../selectors/metadata";
import { useSelector } from "react-redux";

const LookupDisplayValue = ({
	moduleName,
	lookupName,
	lookupKey,
	lookupReplacementValues,
	labelComponent,
	...otherProps
}) => {
	let value = useSelector(namedLookupLocalizedSelector(moduleName, lookupName, lookupKey));

	if (value && lookupReplacementValues) {
		Object.keys(lookupReplacementValues).forEach(key => {
			value = value.replace("{" + key + "}", lookupReplacementValues[key]);
		});
	}

	const DisplayComponent =
		labelComponent ??
		(({ children }) => <TooltippedTypography noWrap {...otherProps} children={children} titleValue={value} />);

	return <DisplayComponent>{value}</DisplayComponent>;
};

export default LookupDisplayValue;
