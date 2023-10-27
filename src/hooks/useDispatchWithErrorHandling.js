import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { extractStandardErrorMessagesFromResponse } from "../utils/responseProcessingHelper";
import { pushGlobalErrorMessage } from "../actions/globalErrorMessages";
import { useIntl } from "react-intl";

export const executeDispatchWithErrorHandling = ({
	dispatch,
	action,
	errorTitle,
	errorDescription,
	validationLookupModule,
	validationLookupName,
	formatMessage,
	formatDate,
	formatTime,
	lookupKeyCustomizer = null,
}) => {
	return dispatch(action).then(data => {
		const extractedMessages = extractStandardErrorMessagesFromResponse(
			data,
			validationLookupModule,
			validationLookupName,
			formatMessage,
			formatDate,
			formatTime,
			lookupKeyCustomizer,
		);
		if (extractedMessages.hasErrors) {
			const newMsg = {
				messages: extractedMessages.messages,
			};

			if (extractedMessages.messages.length > 0) {
				newMsg.title = errorDescription;
			} else {
				newMsg.title = errorTitle;
				newMsg.description = errorDescription;
			}

			dispatch(pushGlobalErrorMessage(newMsg));
		}

		return data;
	});
};

export const useDispatchWithErrorHandling = () => {
	const dispatch = useDispatch();
	const { formatMessage, formatDate, formatTime } = useIntl();

	return useCallback(
		({ action, errorTitle, errorDescription, validationLookupModule, validationLookupName, lookupKeyCustomizer }) => {
			return executeDispatchWithErrorHandling({
				dispatch,
				action,
				errorTitle,
				errorDescription,
				validationLookupModule,
				validationLookupName,
				formatMessage,
				formatDate,
				formatTime,
				lookupKeyCustomizer,
			});
		},
		[dispatch, formatDate, formatMessage, formatTime],
	);
};

export default useDispatchWithErrorHandling;
