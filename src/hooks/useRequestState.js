import useSelectorAndUnwrap from "./useSelectorAndUnwrap";
import { getRequestStateInfo } from "../selectors/requestStates";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetRequestState } from "../actions/requestState";

/*
    This hook is used to handle custom action after deletes and updates requests. We can add additional operation if required.
    We have a reducer scanning every request for a special payload (meta.requestState).
    If this payload is detected we set some flags (inProgress, value, error) depending on the request type (_REQUEST, _SUCCESS, _FAILURE):
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

const useRequestState = ({ keys, operation, successAction, errorAction }) => {
	const { inProgress, value, error, errorMessage } = useSelectorAndUnwrap(getRequestStateInfo(operation, keys));
	const dispatch = useDispatch();

	useEffect(() => {
		if (value && !inProgress && !error) {
			dispatch(resetRequestState(keys, operation));
			if (successAction) {
				successAction();
			}
		} else if (!value && !inProgress && error) {
			dispatch(resetRequestState(keys, operation));
			if (errorAction) {
				errorAction(errorMessage);
			}
		}
	}, [dispatch, keys, operation, successAction, errorAction, errorMessage, inProgress, value, error]);

	const buildRequestState = () => {
		return {
			keys,
			operation,
		};
	};

	return [buildRequestState];
};

export default useRequestState;
