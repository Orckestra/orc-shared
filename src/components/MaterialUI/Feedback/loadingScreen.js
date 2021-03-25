import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { requestRunningSelector } from "../../../selectors/requests";

const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: 9999,
	},
	progress: {
		color: theme.palette.primary.main,
	},
}));

const LoadingScreen = () => {
	const classes = useStyles();
	const loadingScreen = useSelector(requestRunningSelector);
	const [progressState, setProgressState] = useState(false);

	useEffect(() => {
		if (loadingScreen) {
			const timeout = setTimeout(() => setProgressState(true), 250);
			return () => clearTimeout(timeout);
		}

		setProgressState(false);
	}, [loadingScreen, setProgressState]);

	return (
		<Backdrop className={classes.backdrop} invisible={true} open={loadingScreen}>
			{progressState && <CircularProgress className={classes.progress} size={100} color="inherit" />}
		</Backdrop>
	);
};

export default LoadingScreen;
