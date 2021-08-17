import { useIntl } from "react-intl";
import useSelectorAndUnwrap from "./useSelectorAndUnwrap";
import { getRequestStateInfo } from "../selectors/requestStates";
import { useContext, useEffect, useRef } from "react";
import { NotificationContext } from "../components/MaterialUI/Feedback/NotificationContext";
import { useDispatch } from "react-redux";
import { resetRequestState } from "../actions/requestState";

/*
    This hook is used to handle the notification message for deletes and updates.
    We have a reducer scanning every request for a special payload (meta.requestState). If this
    payload is detected we set some flags (inProgress, value, error) depending on the request type (_REQUEST, _SUCCESS, _FAILURE):
        * inProgress: set to true while the request is executing
        * value: set to false when starting the request and to true when the request has been executed successfully
        * error: set to false when starting the request and to true when the request has not been executed successfully

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

const useRequestState = ({ keys, operation, successMessageId, successAction, errorMessageId, errorAction }) => {
	const { inProgress, value, error } = useSelectorAndUnwrap(getRequestStateInfo(operation, keys));
	const { formatMessage } = useIntl();
	const { addNotification } = useContext(NotificationContext);
	const dispatch = useDispatch();

	useEffect(() => {
		if (value && !inProgress && !error) {
			const message = formatMessage(successMessageId);

			dispatch(resetRequestState(keys, operation));
			addNotification(message, "success");
			if (successAction) {
				successAction();
			}
		} else if (!value && !inProgress && error) {
			const message = formatMessage(errorMessageId);

			dispatch(resetRequestState(keys, operation));
			addNotification(message, "error");
			if (errorAction) {
				errorAction();
			}
		}
		// addNotification causes issues in the deps
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		dispatch,
		keys,
		operation,
		successMessageId,
		successAction,
		errorMessageId,
		errorAction,
		formatMessage,
		inProgress,
		value,
		error,
	]);

	const buildRequestState = () => {
		return {
			keys,
			operation,
		};
	};

	return [buildRequestState];
};

export default useRequestState;
