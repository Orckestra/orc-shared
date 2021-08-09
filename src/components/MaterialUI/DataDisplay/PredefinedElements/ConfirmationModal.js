import React from "react";
import sharedMessages from "../../../../sharedMessages";
import ActionModal from "./ActionModal";

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
	const cancelLabel = cancelButtonLabel ?? sharedMessages.cancel;
	const okLabel = okButtonLabel ?? sharedMessages.close;

	const actions = [
		{ label: cancelLabel, handler: cancelCallback },
		{ label: okLabel, handler: okCallback, isPrimary: true },
	];

	return (
		<ActionModal
			title={title}
			message={message}
			open={open}
			actions={actions}
			backdropClickCallback={backdropClickCallback}
		/>
	);
};

export default ConfirmationModal;
