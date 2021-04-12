import React from "react";
import sharedMessages from "../../sharedMessages";
import ConfirmationModal from "../MaterialUI/DataDisplay/PredefinedElements/ConfirmationModal";
import { scopeConfirmationDialogTypes } from "../../constants";
import { FormattedMessage } from "react-intl";

const ScopeModificationConfirmationDialog = ({ scopeDialogType, isModalOpened, closeModalCallback, okCallback }) => {
	let message;
	let title;

	switch (scopeDialogType) {
		case scopeConfirmationDialogTypes.scopeChangeConfirmation:
			message = <FormattedMessage {...sharedMessages.scopeChangeWithOpenedTabsConfirmation} />;
			title = <FormattedMessage {...sharedMessages.scopeChangeWithOpenedTabsTitle} />;
			break;
		case scopeConfirmationDialogTypes.hasUnsavedDataMessage:
			message = <FormattedMessage {...sharedMessages.scopeChangeWithUnsavedDataConfirmation} />;
			title = <FormattedMessage {...sharedMessages.scopeChangeWithUnsavedDataTitle} />;
			break;
		default:
			return null;
	}

	return (
		<ConfirmationModal
			title={title}
			message={message}
			open={isModalOpened}
			okButtonLabel={sharedMessages.yes}
			cancelButtonLabel={sharedMessages.no}
			okCallback={okCallback}
			cancelCallback={closeModalCallback}
			backdropClickCallback={closeModalCallback}
		/>
	);
};

export default ScopeModificationConfirmationDialog;
