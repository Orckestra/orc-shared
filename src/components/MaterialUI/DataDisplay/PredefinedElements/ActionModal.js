import React from "react";
import Modal from "./../Modal";
import ModalProps from "./../modalProps";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import sharedMessages from "../../../../sharedMessages";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(theme => ({
	actionPanel: {
		display: "flex",
		marginLeft: "auto",
		flex: "1 1 0",
		justifyContent: "flex-end",
	},
}));

const ActionModal = ({
	title,
	message,
	open,
	type,
	actions, // Array of objects containing three properties: label, handler, isPrimary
	backdropClickCallback,
}) => {
	const classes = useStyles();

	const modalProps = new ModalProps();

	const titleComponent = title || <FormattedMessage {...sharedMessages.confirmation} />;

	modalProps.set(ModalProps.propNames.title, titleComponent);
	modalProps.set(ModalProps.propNames.open, open);
	modalProps.set(ModalProps.propNames.type, type);
	modalProps.set(ModalProps.propNames.backdropClickCallback, backdropClickCallback);

	const actionPanel = (
		<div className={classes.actionPanel}>
			{actions.map(action => (
				<Button
					key={action.label.id}
					variant={action.isPrimary ? "contained" : "outlined"}
					color={action.isPrimary ? "primary" : "default"}
					disableElevation={action.isPrimary}
					disabled={action.disabled ?? false}
					onClick={e => action.handler(e)}
				>
					<FormattedMessage {...action.label} />
				</Button>
			))}
		</div>
	);

	modalProps.set(ModalProps.propNames.actionPanel, actionPanel);

	return <Modal message={message} modalProps={modalProps} />;
};

export default ActionModal;
