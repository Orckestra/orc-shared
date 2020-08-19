/* eslint-disable react/style-prop-object */
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedNumber } from "react-intl";

const useStyles = makeStyles(theme => ({
  regular: {
    fontSize: theme.typography.fieldLabelSize,
    fontFamily: theme.typography.fontFamily,
    textDecoration: "line-through",
    display: "inline-block"
  },
  current: {
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
    display: "inline-block"
  },
  container: {
    display: "flex",
    flexDirection: "column"
  },
}));

const DiscountedPrice = ({ regular, current, currency }) => {
  const classes = useStyles();

  if (regular === current) {
    return (
      <FormattedNumber style="currency" currency={currency} value={current} />
    );
  }

  const regularPrice = <FormattedNumber style="currency" currency={currency} value={regular} />;
  const currentPrice = <FormattedNumber style="currency" currency={currency} value={current} />;

  const discountedPrice = (
    <div className={classes.container}>
      <Typography children={regularPrice} className={classes.regular} />
      <Typography children={currentPrice} className={classes.current} />
    </div>
  );

  return discountedPrice;
}

export default DiscountedPrice;