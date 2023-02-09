import React from "react";
import DividerMui from "@mui/material/Divider";
import makeStyles from "@mui/styles/makeStyles";
import DividerProps, { isDividerProps } from "./dividerProps";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
	dividerRoot: {
		backgroundColor: theme.palette.grey.dark,
	},
	dividerLight: {
		backgroundColor: theme.palette.grey.borders,
	},
	dividerVertical: {
		margin: `0 ${theme.spacing(2)}`,
	},
	inheritedWidth: {
		width: "inherit",
	},
}));

const Divider = ({ dividerProps }) => {
	const classes = useStyles();

	if (isDividerProps(dividerProps) === false) {
		throw new TypeError("dividerProps property is not of type DividerProps");
	}

	const orientation = dividerProps?.get(DividerProps.propNames.orientation) || "horizontal";
	const light = dividerProps?.get(DividerProps.propNames.light) || false;
	const variant = dividerProps?.get(DividerProps.propNames.variant) || "fullWidth";
	const flexItem = dividerProps?.get(DividerProps.propNames.flexItem) || false;

	const fullWidthHorizontalStyle =
		variant === "fullWidth" && orientation === "horizontal" ? classes.inheritedWidth : null;

	return (
		<DividerMui
			orientation={orientation}
			light={light}
			variant={variant}
			flexItem={flexItem}
			classes={{
				root: classNames(
					classes.dividerRoot,
					fullWidthHorizontalStyle,
					dividerProps?.getStyle(DividerProps.ruleNames.root),
				),
				light: classNames(classes.dividerLight, dividerProps?.getStyle(DividerProps.ruleNames.light)),
				vertical: classNames(classes.dividerVertical, dividerProps?.getStyle(DividerProps.ruleNames.vertical)),
				middle: classNames(dividerProps?.getStyle(DividerProps.ruleNames.middle)),
				inset: classNames(dividerProps?.getStyle(DividerProps.ruleNames.inset)),
			}}
		/>
	);
};

export default Divider;
