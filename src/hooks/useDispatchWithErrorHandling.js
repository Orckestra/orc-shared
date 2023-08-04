import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { extractStandardErrorMessagesFromResponse } from "../utils/responseProcessingHelper";
import { pushGlobalErrorMessage } from "../actions/globalErrorMessages";

export const executeDispatchWithErrorHandling = ({
	dispatch,
	action,
	errorTitle,
	errorDescription,
	validationLookupModule,
	validationLookupName,
}) => {
	return dispatch(action).then(data => {
		const extractedMessages = extractStandardErrorMessagesFromResponse(
			data,
			validationLookupModule,
			validationLookupName,
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

	return useCallback(
		({ action, errorTitle, errorDescription, validationLookupModule, validationLookupName }) => {
			return executeDispatchWithErrorHandling({
				dispatch,
				action,
				errorTitle,
				errorDescription,
				validationLookupModule,
				validationLookupName,
			});
		},
		[dispatch],
	);
};

export default useDispatchWithErrorHandling;
