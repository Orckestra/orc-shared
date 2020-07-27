import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { TextProps } from "../textProps";
import TooltippedTypography from "./TooltippedElements/TooltippedTypography";
import _ from "lodash";

const useStyles = makeStyles(theme => ({}));

const Address = ({
	name,
	contactPerson,
	line1,
	line2,
	city,
	province,
	postalCode,
	country,
	email,
	phone,
	textProps,
}) => {
	const classes = useStyles();

	if (textProps != null && textProps instanceof TextProps === false) {
		throw new TypeError("textProps property is not of type TextProps");
	}

	const cityProvincePostalCode = `${city}, ${province}, ${postalCode}`;

	const addressInfo = [name, contactPerson, line1, line2, cityProvincePostalCode, country, email, phone];

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
