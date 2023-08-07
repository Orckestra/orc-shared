import Immutable from "immutable";
import { POP_GLOBAL_ERROR_MESSAGE, PUSH_GLOBAL_ERROR_MESSAGE } from "../actions/globalErrorMessages";

const initialState = Immutable.fromJS({
	dialog: {
		errorMessages: [],
	},
});

const globalErrorMessages = (state = initialState, action) => {
	switch (action.type) {
		case PUSH_GLOBAL_ERROR_MESSAGE: {
			const newMsgs = state.getIn(["dialog", "errorMessages"]).push(Immutable.fromJS(action.payload));
			return state.setIn(["dialog", "errorMessages"], newMsgs);
		}
		case POP_GLOBAL_ERROR_MESSAGE: {
			const newMsgs = state.getIn(["dialog", "errorMessages"]).shift();
			return state.setIn(["dialog", "errorMessages"], newMsgs);
		}
		default:
			return state;
	}
};

export default globalErrorMessages;
