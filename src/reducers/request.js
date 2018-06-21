import Immutable from "immutable";

const initialState = Immutable.Map();

const requestReducer = (state = initialState, action) => {
	if (action.type.endsWith("_REQUEST")) {
		const requestName = action.type.replace(/_REQUEST$/, "");
		return state.set(requestName, true);
	}
	if (action.type.endsWith("_SUCCESS")) {
		const requestName = action.type.replace(/_SUCCESS$/, "");
		return state.delete(requestName);
	}
	if (action.type.endsWith("_FAILURE")) {
		const requestName = action.type.replace(/_FAILURE$/, "");
		return state.delete(requestName);
	}
	return state;
};

export default requestReducer;
