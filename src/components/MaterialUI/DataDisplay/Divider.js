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

	var customStyles = dividerProps?.get(DividerProps.propNames.classes);

	return (
		<DividerMui
			orientation={orientation}
			light={light}
			variant={variant}
			classes={{
				root: classNames(
					classes.dividerRoot,
					customStyles?.get(DividerProps.ruleNames.root),
				),
				light: classNames(
					classes.dividerLight,
					customStyles?.get(DividerProps.ruleNames.light),
				),
				vertical: classNames(
					classes.dividerVertical,
					customStyles?.get(DividerProps.ruleNames.vertical),
				),
				middle: classNames(customStyles?.get(DividerProps.ruleNames.middle)),
				inset: classNames(customStyles?.get(DividerProps.ruleNames.inset)),
			}}
		/>
	);
};

export default Divider;
