import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Icon from "./Icon";
import NotificationProps from "./NotificationProps";

const useStyles = makeStyles(theme => ({
	close: {
		padding: theme.spacing(0.5),
		color: theme.palette.primary.contrastText,
		border: "none",
		margin: theme.spacing(-0.7),
		fontSize: theme.spacing(1.5),
		width: theme.spacing(2.5),
		height: theme.spacing(2.5),
	},
	closeIcon: {
		color: theme.palette.primary.contrastText,
	},
	notification: {
		padding: theme.spacing(1),
		borderRadius: theme.spacing(0.5),
		width: theme.spacing(35),
		display: "flex",
	},
	icon: {
		color: theme.palette.primary.contrastText,
		padding: theme.spacing(1),
		fontSize: theme.spacing(3),
	},
	success: {
		backgroundColor: theme.palette.success.main,
		color: theme.palette.success.contrastText,
	},
	error: {
		backgroundColor: theme.palette.error.main,
		color: theme.palette.error.contrastText,
	},
	message: {
		flex: 1,
		padding: theme.spacing(0.5),
		fontSize: theme.typography.fieldLabelSize,
	},
}));

const defaultAnchorOrigin = {
	vertical: "top",
	horizontal: "right",
};

const getIconIdByType = type => {
	switch (type) {
		case "success":
			return "checkmark-filled";
		case "error":
			return "error-cross-filled";
		default:
			return "";
	}
};

const useNotificationState = (snackPack, setSnackPack, lastOnly) => {
	const [open, setOpen] = useState(false);
	const [messageInfo, setMessageInfo] = useState(undefined);

	useEffect(() => {
		if (snackPack.length && !messageInfo) {
			// Set a new snack when we don't have an active one
			setMessageInfo({ ...snackPack[0] });
			setSnackPack(prev => {
				prev.splice(0, 1);
				return prev;
			});
			setOpen(true);
		} else if (lastOnly && snackPack.length && messageInfo && open) {
			// Close an active snack when a new one is added
			setOpen(false);
		}
	}, [snackPack, messageInfo, open, lastOnly, setSnackPack]);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const handleExited = () => {
		setMessageInfo(undefined);
	};

	return {
		open,
		messageInfo,
		handleClose,
		handleExited,
	};
};

const Notification = ({ notificationProps, snackPack, setSnackPack }) => {
	const classes = useStyles();

	const autoHideDuration = notificationProps?.get(NotificationProps.propNames.autoHideDuration) || 5000;
	const anchorOrigin = notificationProps?.get(NotificationProps.propNames.anchorOrigin) || defaultAnchorOrigin;
	const lastOnly = notificationProps?.get(NotificationProps.propNames.lastOnly) ?? true;

	const { open, messageInfo, handleClose, handleExited } = useNotificationState(snackPack, setSnackPack, lastOnly);

	return messageInfo ? (
		<Snackbar
			key={messageInfo.key}
			anchorOrigin={anchorOrigin}
			open={open}
			autoHideDuration={autoHideDuration}
			onClose={handleClose}
			TransitionProps={{
				onExited: handleExited,
			}}
		>
			<div key={messageInfo.key} className={`${classes.notification} ${classes[messageInfo.type]}`}>
				<Icon id={getIconIdByType(messageInfo.type)} className={classes.icon} />
				<div className={classes.message}>{messageInfo.message}</div>
				<IconButton aria-label="close" color="inherit" className={classes.close} onClick={handleClose}>
					<Icon id="close2" className={classes.closeIcon} />
				</IconButton>
			</div>
		</Snackbar>
	) : (
		<></>
	);
};

export default React.memo(Notification);
