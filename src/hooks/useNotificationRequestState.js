import { useIntl } from "react-intl";
import { useCallback, useContext } from "react";
import { NotificationContext } from "../components/MaterialUI/Feedback/NotificationContext";
import useRequestState from "./useRequestState";

/*
    This hook is used to handle the notification message for deletes and updates.
    It uses useRequestState internally to know when to display messages.

    This hook returns a method used to build a requestState object that is used in the meta data property of the dispatched action.
    The expected format for the action is as follow:
    {
        type: 'some type',
        ... // other properties
        meta: {
            requestState: {
                keys: [],
                operation: requestStateOperations.delete
            }
        }
    }
*/

const useNotificationRequestState = ({
	keys,
	operation,
	successMessageId,
	successMessageValues,
	successAction,
	errorMessageId,
	errorMessageValues,
	errorAction,
}) => {
	const { formatMessage } = useIntl();
	const { addNotification } = useContext(NotificationContext);

	const onSuccess = useCallback(() => {
		const message = formatMessage(successMessageId, successMessageValues);
		addNotification(message, "success");

		if (successAction) {
			successAction();
		}
		// addNotification causes issues in the deps
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formatMessage, successAction, successMessageId, successMessageValues]);

	const onError = useCallback(() => {
		const message = formatMessage(errorMessageId, errorMessageValues);
		addNotification(message, "error");

		if (errorAction) {
			errorAction();
		}
		// addNotification causes issues in the deps
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [errorAction, errorMessageId, errorMessageValues, formatMessage]);

	const buildRequestState = useRequestState({
		keys,
		operation,
		successAction: onSuccess,
		errorAction: onError,
	});

	return buildRequestState;
};

export default useNotificationRequestState;
