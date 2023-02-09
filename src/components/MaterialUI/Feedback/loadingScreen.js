import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import makeStyles from "@mui/styles/makeStyles";
import CircularProgress from "@mui/material/CircularProgress";
import { requestRunningSelector } from "../../../selectors/requests";

const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: 9999,
	},
	progress: {
		color: theme.palette.primary.main,
	},
}));

const onMouseDownHandler = event => {
	// We want to disable clicking on the backdrop, as it causes strange user selections to occur
	event.preventDefault();
	event.stopPropagation();
};

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
		<Backdrop
			data-qa={"backdroploadingscreen"}
			className={classes.backdrop}
			invisible={true}
			open={loadingScreen}
			onMouseDown={onMouseDownHandler}
		>
			{progressState && <CircularProgress className={classes.progress} size={100} color="inherit" />}
		</Backdrop>
	);
};

export default LoadingScreen;
