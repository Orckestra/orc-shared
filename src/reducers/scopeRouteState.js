import Immutable from "immutable";
import { SET_ROUTE } from "../actions/navigation";
import { APPLICATION_SCOPE_HAS_CHANGED } from "../actions/scopes";

const initialState = Immutable.fromJS({
	scopeChangeInProgress: false,
});

/*
	This reducer and its associated hook is used to prevent a request from being sent out while the application's scope is changing.
	Basically the reducer responds to an action, set a flag to true and then set it to false once another action is triggered (route change).

	This is a pretty hackish way to ensure that the correct requests are being executed (references #74924, #74764) however we know of no other way to achieve the desired result.
* */

const viewStateReducer = (state = initialState, action) => {
	switch (action.type) {
		case APPLICATION_SCOPE_HAS_CHANGED: {
			return state.set("scopeChangeInProgress", action.payload.newScope !== action.payload.previousScope);
		}
		case SET_ROUTE: {
			return state.set("scopeChangeInProgress", false);
		}
		default:
			return state;
	}
};

export default viewStateReducer;
