import useLoader from "./useLoader";
import useRequestState from "./useRequestState";
import { requestStateOperations } from "../constants";
import { useState } from "react";
import { selectClosingTabHandlerActionForEntity, selectCurrentModuleName } from "../selectors/navigation";
import { useSelectorAndUnwrap } from "./useSelectorAndUnwrap";
import { shallowEqual, useSelector } from "react-redux";
import { RSAA } from "redux-api-middleware";
import { makeFailureActionType } from "../actions/makeApiAction";

const useEntityLoader = (entityId, loadAction, cutoutSelector) => {
	if (Array.isArray(loadAction)) {
		throw new Error("useEntityLoader does not support an array of actions");
	}

	const [loadErrorUnhandled, setLoadErrorUnhandled] = useState(false);

	const moduleName = useSelectorAndUnwrap(selectCurrentModuleName);

	const closingTabHandlerAction = useSelector(selectClosingTabHandlerActionForEntity(moduleName, entityId));

	const [requestState] = useRequestState({
		keys: [loadAction[RSAA]?.endpoint ?? "invalidEndPoint"],
		operation: requestStateOperations.fetch,
		successAction: () => console.log("useLoaderWithHandler  --> successAction"),
		errorAction: errorResponse => {
			setLoadErrorUnhandled(true);

			if (errorResponse.status === 404 && closingTabHandlerAction) closingTabHandlerAction();

			console.log("useLoaderWithHandler  --> errorAction", errorResponse);
		},
	});

	const metaRequestState = requestState();

	const cutout = !!useSelector(cutoutSelector, shallowEqual) || loadErrorUnhandled;

	if (!loadAction[RSAA] && !cutout) {
		throw new Error("useEntityLoader only supports RSAA api actions");
	}

	if (loadAction[RSAA]) {
		loadAction[RSAA].types = (loadAction[RSAA].types ?? []).map(x => {
			if (typeof x === "string") {
				const actionType = x.endsWith("_FAILURE") ? makeFailureActionType(x) : { type: x };
				return {
					...actionType,
					meta: { requestState: { ...metaRequestState } },
				};
			} else if (typeof x === "object") {
				const actionType = x.type.endsWith("_FAILURE") ? makeFailureActionType(x.type) : {};
				return {
					...x,
					...actionType,
					meta: {
						...(x.meta ?? {}),
						requestState: { ...metaRequestState },
					},
				};
			}

			throw new Error("useEntityLoader only supports RSAA api actions with valid types");
		});
	}

	useLoader(loadAction, () => cutout);
};

export default useEntityLoader;
