import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	progressContainer: {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		display: "flex",
		position: "fixed",
		alignItems: "center",
		justifyContent: "center",
		zIndex: 999,
	},
	progress: {
		color: theme.palette.primary.main,
	},
}));

const LoadingIcon = () => {
	const classes = useStyles();

	return (
		<div className={classes.progressContainer}>
			<CircularProgress className={classes.progress} size={100} color="inherit" />
		</div>
	);
};

export default LoadingIcon;
