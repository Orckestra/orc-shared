import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(() => ({
	centerWrapper: {
		minHeight: 30,
		display: "flex",
		alignItems: "center",
	},
	readOnlyBlock: {
		margin: 0,
	},
	label: {
		margin: 0,
		fontSize: 16,
	},
}));

export const ReadOnly = ({ value }) => {
	const classes = useStyles();

	return (
		<div className={classes.centerWrapper}>
			<p className={classes.readOnlyBlock}>{typeof value === "string" ? value : <FormattedMessage {...value} />}</p>
		</div>
	);
};

export const LineLabel = ({ value }) => {
	const classes = useStyles();

	return (
		<div className={classes.centerWrapper}>
			<p className={classes.label}>{typeof value === "string" ? value : <FormattedMessage {...value} />}</p>
		</div>
	);
};

export default ReadOnly;
