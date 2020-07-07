import React from "react";
import Icon from "../../../Icon";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	placeholder: {
		margin: `${theme.spacing(5)} auto`,
	},
	placeholderImage: {
		fontSize: theme.spacing(14),
		color: theme.palette.grey.icon,
	},
	placeholderTitle: {
		fontSize: theme.typography.h1Size,
		color: theme.palette.grey.icon,
	},
	placeholderSubtitle: {
		fontSize: theme.typography.h3Size,
		color: theme.palette.grey.icon,
	},
}));

const Placeholder = ({ icon, title, subtitle }) => {
	const classes = useStyles();
	return (
		<Grid
			container
			direction="column"
			alignItems="center"
			className={classes.placeholder}
		>
			{icon ? <Icon className={classes.placeholderImage} {...{ id: icon }} /> : null}
			{title ? (
				<Typography className={classes.placeholderTitle}>{title}</Typography>
			) : null}
			{subtitle ? (
				<Typography className={classes.placeholderSubtitle}>{subtitle}</Typography>
			) : null}
		</Grid>
	);
};

export default Placeholder;
