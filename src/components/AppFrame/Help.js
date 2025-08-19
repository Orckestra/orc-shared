import React from "react";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import sharedMessages from "./../../sharedMessages";

const useStyles = makeStyles(theme => ({
	helpLink: {
		fontFamily: theme.typography.button.fontFamily,
		fontSize: "12px",
		textTransform: "uppercase",
		color: theme.palette.grey.borders,
		width: "40px",
		cursor: "pointer",
		paddingTop: "14px",
		paddingRight: "10px",
		textDecoration: "none",
		"&:hover": {
			color: theme.palette.primary.main,
		},
	},
}));

const Help = ({ helpUrl }) => {
	const classes = useStyles();

	return (
		<a href={helpUrl} target="_blank" rel="noreferrer" className={classes.helpLink}>
			<FormattedMessage {...sharedMessages.help} />
		</a>
	);
};

export default Help;
