import Immutable from "immutable";
import { safeGet } from "../utils";
const initialState = Immutable.fromJS({
	actives: Immutable.Map(),
	logout: false,
	error: null,
});

export const ERROR = "error";
export const LOGOUT = "logout";

const requestReducer = (state = initialState, action) => {
	if (action.type.endsWith("_REQUEST")) {
		if (safeGet(action, "meta", "addToActiveRequests") === false) {
			// this flag should only be used by requests triggered by a background process to avoid the spinner
			return state;
		}
		const requestName = action.type.replace(/_REQUEST$/, "");
		return state.setIn(["actives", requestName], true);
	}
	if (action.type.endsWith("_SUCCESS")) {
		const requestName = action.type.replace(/_SUCCESS$/, "");
		return state.deleteIn(["actives", requestName]).set("logout", false);
	}
	if (action.type.endsWith("_FAILURE")) {
		const requestName = action.type.replace(/_FAILURE$/, "");
		const status = safeGet(action, "payload", "status");
		if (status === 403 || status === 401) {
			return state.deleteIn(["actives", requestName]).set("logout", true);
		} else {
			return state.deleteIn(["actives", requestName]).set("error", Immutable.fromJS(action));
		}
	}
	return state;
};

export default requestReducer;
