import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
	text: {},
}));

const Text = ({ value, customClasses }) => {
	const classes = useStyles();

	return (
		<Typography className={classNames(classes.text, customClasses)}>{value}</Typography>
	);
};

export default Text;
