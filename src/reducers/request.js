import Immutable from "immutable";
import { safeGet } from "../utils";
const initialState = Immutable.Map();

export const ERROR = "__ERROR";
export const LOGOUT = "__LOGOUT";

const requestReducer = (state = initialState, action) => {
	if (action.type.endsWith("_REQUEST")) {
		const requestName = action.type.replace(/_REQUEST$/, "");
		return state.set(requestName, true);
	}
	if (action.type.endsWith("_SUCCESS")) {
		const requestName = action.type.replace(/_SUCCESS$/, "");
		return state.delete(requestName).delete(LOGOUT);
	}
	if (action.type.endsWith("_FAILURE")) {
		const requestName = action.type.replace(/_FAILURE$/, "");
		let outState = state.delete(requestName);
		if (safeGet(action, "payload", "status") === 403) {
			return outState.set(LOGOUT, true);
		} else {
			return outState.set(ERROR, Immutable.fromJS(action));
		}
	}
	return state;
};

export default requestReducer;
