import Immutable from "immutable";
import { castArray } from "lodash";
import { requestStateOperationMap } from "../constants";

const initialState = Immutable.fromJS({
	creates: Immutable.Map(),
	deletes: Immutable.Map(),
	fetches: Immutable.Map(),
	updates: Immutable.Map(),
});

const containsRequestStateData = action => {
	return !!action?.meta?.requestState;
};

const getPathFromAction = action => {
	const firstSegment = requestStateOperationMap[action.meta.requestState.operation];

	if (!firstSegment) {
		return null;
	}

	return [firstSegment, ...castArray(action.meta.requestState.keys)];
};

const requestStateReducer = (state = initialState, action) => {
	if (!containsRequestStateData(action)) {
		return state;
	}

	if (action.type.endsWith("_REQUEST")) {
		const path = getPathFromAction(action);
		if (path === null) {
			return state;
		}
		return state.setIn(
			[...path, "state"],
			Immutable.fromJS({
				inProgress: true,
				value: false,
				error: false,
				errorResponse: null,
			}),
		);
	}
	if (action.type.endsWith("_SUCCESS")) {
		const path = getPathFromAction(action);
		if (path === null) {
			return state;
		}
		return state.setIn(
			[...path, "state"],
			Immutable.fromJS({
				inProgress: false,
				value: true,
				error: false,
				errorResponse: null,
			}),
		);
	}
	if (action.type.endsWith("_FAILURE")) {
		const path = getPathFromAction(action);
		if (path === null) {
			return state;
		}
		return state.setIn(
			[...path, "state"],
			Immutable.fromJS({
				inProgress: false,
				value: false,
				error: true,
				errorResponse: action.payload ?? null,
			}),
		);
	}

	switch (action.type) {
		case "RESET_REQUEST_STATE": {
			const path = getPathFromAction(action);
			if (path === null) {
				return state;
			}
			return state.setIn(
				[...path, "state"],
				Immutable.fromJS({
					inProgress: false,
					value: false,
					error: false,
					errorResponse: null,
				}),
			);
		}
		default:
			return state;
	}
};

export default requestStateReducer;
