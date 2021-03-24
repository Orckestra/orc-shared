import React from "react";
import clsx from "clsx";
import ModalMui from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import ModalProps, { isModalProps } from "./modalProps";

const useStyles = makeStyles(theme => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	baseContainer: {
		borderRadius: theme.spacing(0.8),
		display: "flex",
		flexDirection: "column",
		backgroundColor: theme.palette.primary.contrastText,
		"&:focus": {
			outline: "none",
		},
	},
	containerNormal: {
		minWidth: theme.spacing(48),
	},
	containerWide: {
		minWidth: theme.spacing(106.4),
		maxHeight: `calc(100% - 80px)`,
	},
	containerFullwidth: {
		minWidth: `calc(100% - 80px)`,
		height: `calc(100% - 80px)`,
	},
	title: {
		height: theme.spacing(4),
		backgroundColor: theme.palette.grey.lighter,
		padding: theme.spacing(0, 2),
		borderRadius: theme.spacing(0.8, 0.8, 0, 0),
		borderBottom: `1px solid ${theme.palette.grey.borders}`,
		display: "flex",
		alignItems: "center",
		fontSize: theme.typography.h3Size,
		textTransform: theme.typography.button.textTransform,
		fontFamily: theme.typography.button.fontFamily,
		fontWeight: theme.typography.button.fontWeight,
		flexShrink: 0,
	},
	message: {
		minHeight: theme.spacing(10),
		backgroundColor: theme.palette.primary.contrastText,
		display: "flex",
		alignItems: "center",
		whiteSpace: "pre-wrap",
		padding: theme.spacing(2, 2),
		overflowY: "auto",
	},
	messageWide: {
		minHeight: theme.spacing(10),
		backgroundColor: theme.palette.primary.contrastText,
		display: "flex",
		alignItems: "stretch",
		whiteSpace: "pre-wrap",
		padding: theme.spacing(2, 2),
		overflowY: "auto",
		flexGrow: 1,
	},
	actionPanel: {
		padding: theme.spacing(1, 2),
		backgroundColor: theme.palette.grey.lighter,
		borderRadius: theme.spacing(0, 0, 0.8, 0.8),
		borderTop: `1px solid ${theme.palette.grey.borders}`,
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
	const modalType = modalProps?.get(ModalProps.propNames.type) ?? "normal";

	var containerCls = clsx({
		[classes.containerNormal]: modalType === "normal",
		[classes.containerWide]: modalType === "wide",
		[classes.containerFullwidth]: modalType === "fullwidth",
	});

	var messageCls = clsx({
		[classes.message]: modalType === "normal",
		[classes.messageWide]: modalType === "wide" || modalType === "fullwidth",
	});

	const model = (
		<ModalMui
			disablePortal
			disableEnforceFocus
			disableAutoFocus
			open={open}
			className={classes.modal}
			onBackdropClick={backdropClickCallback != null ? () => backdropClickCallback() : null}
		>
			<div className={clsx(classes.baseContainer, containerCls)}>
				<div className={classes.title}>{title}</div>
				<div className={messageCls}>{message}</div>
				<div className={classes.actionPanel}>{actionPanel}</div>
			</div>
		</ModalMui>
	);

	return model;
};

export default Modal;
