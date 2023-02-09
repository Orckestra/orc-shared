import React from "react";
import Select from "./../Select";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
	container: {
		margin: `0 ${theme.spacing(0.5)}`,
	},
	title: {
		fontFamily: theme.typography.fontFamily,
		fontSize: theme.typography.fieldLabelSize,
		color: theme.palette.text.hint,
		marginBottom: theme.spacing(0.5),
	},
}));

const TitledSelect = ({ options, title, selectProps, textStyle }) => {
	const classes = useStyles();

	const titledSelect = (
		<div className={classes.container}>
			<Typography children={title} className={classNames(classes.title, textStyle)} />
			<Select options={options} selectProps={selectProps} />
		</div>
	);

	return titledSelect;
};

export default TitledSelect;
