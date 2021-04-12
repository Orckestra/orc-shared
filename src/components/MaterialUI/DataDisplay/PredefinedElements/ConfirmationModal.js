import React from "react";
import Modal from "./../Modal";
import ModalProps from "./../modalProps";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import sharedMessages from "../../../../sharedMessages";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(theme => ({
	actionPanel: {
		float: "right",
	},
	message: {
		maxWidth: "480px",
		wordWrap: "normal",
	},
}));

const ConfirmationModal = ({
	title,
	message,
	open,
	okCallback,
	cancelCallback,
	backdropClickCallback,
	okButtonLabel,
	cancelButtonLabel,
}) => {
	const classes = useStyles();
	const okLabel = okButtonLabel ?? sharedMessages.close;
	const cancelLabel = cancelButtonLabel ?? sharedMessages.cancel;

	const modalProps = new ModalProps();

	const titleComponent = title || <FormattedMessage {...sharedMessages.confirmation} />;
	const messageComponent = (
		<div className={classes.message}>
			<Typography children={message} />
		</div>
	);

	modalProps.set(ModalProps.propNames.title, titleComponent);
	modalProps.set(ModalProps.propNames.open, open);
	modalProps.set(ModalProps.propNames.backdropClickCallback, backdropClickCallback);

	const actionPanel = (
		<div className={classes.actionPanel}>
			<Button variant="outlined" onClick={() => cancelCallback()}>
				<FormattedMessage {...cancelLabel} />
			</Button>
			<Button variant="contained" color="primary" onClick={() => okCallback()} disableElevation>
				<FormattedMessage {...okLabel} />
			</Button>
		</div>
	);

	modalProps.set(ModalProps.propNames.actionPanel, actionPanel);

	return <Modal message={messageComponent} modalProps={modalProps} />;
};

export default ConfirmationModal;
