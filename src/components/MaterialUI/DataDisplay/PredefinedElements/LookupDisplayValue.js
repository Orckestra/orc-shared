import React from "react";
import TooltippedTypography from "../TooltippedElements/TooltippedTypography";
import { namedLookupLocalizedSelector } from "../../../../selectors/metadata";
import { useSelector } from "react-redux";

const LookupDisplayValue = ({ moduleName, lookupName, lookupKey, ...otherProps }) => {
	const value = useSelector(namedLookupLocalizedSelector(moduleName, lookupName, lookupKey));

	return <TooltippedTypography noWrap {...otherProps} children={value} titleValue={value} />;
};

export default LookupDisplayValue;
