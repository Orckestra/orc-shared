import React from "react";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import sharedMessages from "./../../sharedMessages";

const useStyles = makeStyles(theme => ({
	helpLink: {
		fontFamily: theme.typography.button.fontFamily,
		fontSize: theme.spacing(1.2),
		textTransform: "uppercase",
		color: theme.palette.grey.borders,
		width: theme.spacing(4),
		cursor: "pointer",
		paddingTop: theme.spacing(1.4),
		paddingRight: theme.spacing(1),
		textDecoration: "none",
		"&:hover": {
			color: theme.palette.primary.light,
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
