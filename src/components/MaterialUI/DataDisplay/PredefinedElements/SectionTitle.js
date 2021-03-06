import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
	title: {
		fontSize: theme.typography.fontSize,
		color: theme.palette.primary.main,
		fontFamily: theme.typography.button.fontFamily,
		fontStyle: "italic",
		textTransform: theme.typography.button.textTransform,
		marginBottom: theme.spacing(1),
	},
}));

const SectionTitle = ({ title }) => {
	const classes = useStyles();
	if (title !== null) {
		return <Typography className={classes.title} children={title} />;
	} else {
		return null;
	}
};

export default SectionTitle;
