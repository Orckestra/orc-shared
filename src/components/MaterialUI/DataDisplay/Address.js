import React from "react";
import Grid from "@material-ui/core/Grid";
import { TextProps } from "../textProps";
import TooltippedTypography from "./TooltippedElements/TooltippedTypography";
import _ from "lodash";

const Address = ({ address, textProps }) => {
	if (textProps != null && textProps instanceof TextProps === false) {
		throw new TypeError("textProps property is not of type TextProps");
	}

	const cityRegionPostalCode = `${address.city}, ${address.regionCode}, ${address.postalCode}`;

	const contactPerson =
		address.firstName && address.lastName
			? `${address.firstName} ${address.lastName}`
			: address.firstName || address.lastName;

	const addressInfo = [
		address.addressName,
		contactPerson,
		address.line1,
		address.line2,
		cityRegionPostalCode,
		address.country,
		address.notes,
		address.email,
		address.phoneNumber,
	];

	const customStyles = textProps?.get(TextProps.propNames.classes);

	return (
		<Grid container direction="column">
			{addressInfo.map((elem, index) => {
				return !_.isEmpty(elem) ? (
					<TooltippedTypography key={index} noWrap className={customStyles} children={elem} titleValue={elem} />
				) : null;
			})}
		</Grid>
	);
};

export default Address;
