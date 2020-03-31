import Immutable from "immutable";
import { VIEW_SET, VIEW_SET_FIELD } from "../actions/view";

const initialState = Immutable.Map({});

const viewStateReducer = (state = initialState, action) => {
	switch (action.type) {
		case VIEW_SET: {
			return state.set(action.payload.name, Immutable.fromJS(action.payload.value));
		}
		case VIEW_SET_FIELD: {
			return state.setIn(
				[action.payload.name, action.payload.field],
				Immutable.fromJS(action.payload.value),
			);
		}
		default:
			return state;
	}
};

export default viewStateReducer;
