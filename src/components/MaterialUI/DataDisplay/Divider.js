import React from "react";
import DividerMui from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import DividerProps from "./dividerProps";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
	dividerRoot: {
		backgroundColor: theme.palette.grey.dark,
	},
	dividerLight: {
		backgroundColor: theme.palette.grey.borders,
	},
	dividerVertical: {
		height: theme.spacing(3),
		margin: `0 ${theme.spacing(1)}`,
	},
}));

const Divider = ({ dividerProps }) => {
	const classes = useStyles();

	if (dividerProps != null && dividerProps instanceof DividerProps === false) {
		throw new TypeError("dividerProps property is not of type DividerProps");
	}

	const orientation = dividerProps?.get(DividerProps.propNames.orientation);
	const light = dividerProps?.get(DividerProps.propNames.light);
	const variant = dividerProps?.get(DividerProps.propNames.variant);

	return (
		<DividerMui
			orientation={orientation}
			light={light}
			variant={variant}
			classes={{
				root: classNames(
					classes.dividerRoot,
					dividerProps?.getStyle(DividerProps.ruleNames.root),
				),
				light: classNames(
					classes.dividerLight,
					dividerProps?.getStyle(DividerProps.ruleNames.light),
				),
				vertical: classNames(
					classes.dividerVertical,
					dividerProps?.getStyle(DividerProps.ruleNames.vertical),
				),
				middle: classNames(dividerProps?.getStyle(DividerProps.ruleNames.middle)),
				inset: classNames(dividerProps?.getStyle(DividerProps.ruleNames.inset)),
			}}
		/>
	);
};

export default Divider;
