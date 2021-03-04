import React from "react";
import ModalMui from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import ModalProps, { isModalProps } from "./modalProps";

const useStyles = makeStyles(theme => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		minWidth: theme.spacing(48),
		borderRadius: "8px",
		display: "flex",
		flexDirection: "column",
		backgroundColor: theme.palette.primary.contrastText,
	},
	title: {
		height: theme.spacing(4),
		backgroundColor: theme.palette.grey.lighter,
		padding: `0 ${theme.spacing(2)}`,
		borderRadius: `8px 8px 0 0`,
		borderBottom: `1px solid ${theme.palette.primary.light}`,
		display: "flex",
		alignItems: "center",
		fontSize: theme.typography.h3Size,
		textTransform: theme.typography.button.textTransform,
		fontFamily: theme.typography.button.fontFamily,
		fontWeight: theme.typography.button.fontWeight,
	},
	message: {
		minHeight: theme.spacing(10),
		backgroundColor: theme.palette.primary.contrastText,
		display: "flex",
		alignItems: "center",
		whiteSpace: "pre-wrap",
		padding: `${theme.spacing(2)} ${theme.spacing(2)}`,
	},
	actionPanel: {
		padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
		backgroundColor: theme.palette.grey.lighter,
		borderRadius: `0 0 8px 8px`,
		borderTop: `1px solid ${theme.palette.primary.light}`,
	},
}));

const Modal = ({ message, modalProps }) => {
	const classes = useStyles();

	if (isModalProps(modalProps) === false) {
		throw new TypeError("modalProps property is not of type ModalProps");
	}

	const open = modalProps?.get(ModalProps.propNames.open) ?? false;
	const title = modalProps?.get(ModalProps.propNames.title);
	const actionPanel = modalProps?.get(ModalProps.propNames.actionPanel);
	const backdropClickCallback = modalProps?.get(ModalProps.propNames.backdropClickCallback);

	const model = (
		<ModalMui
			disablePortal
			disableEnforceFocus
			disableAutoFocus
			open={open}
			className={classes.modal}
			onBackdropClick={backdropClickCallback != null ? () => backdropClickCallback() : null}
		>
			<div className={classes.container}>
				<div className={classes.title}>{title}</div>
				<div className={classes.message}>{message}</div>
				<div className={classes.actionPanel}>{actionPanel}</div>
			</div>
		</ModalMui>
	);

	return model;
};

export default Modal;
