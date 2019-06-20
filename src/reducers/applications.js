import Immutable from "immutable";
import { GET_APPLICATIONS_SUCCESS } from "../actions/applications";

const initialState = Immutable.fromJS({ list: [] });

const applicationReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_APPLICATIONS_SUCCESS: {
			return state.set("list", Immutable.fromJS(action.payload));
		}
		default:
			return state;
	}
};

export default applicationReducer;
