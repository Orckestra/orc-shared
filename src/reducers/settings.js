import Immutable from "immutable";
import addSpawner from "../spawnerMiddleware";
import { changeLocale } from "../actions/locale";
import { GET_MY_CULTURE_SUCCESS } from "../actions/locale";
import {
	GET_MY_APPLICATION_SUCCESS,
	SET_MY_APPLICATION_SUCCESS,
} from "../actions/applications";

const initialState = Immutable.Map({
	defaultApp: 0,
});

const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_MY_APPLICATION_SUCCESS:
			return state.set("defaultApp", action.payload.id);
		case SET_MY_APPLICATION_SUCCESS:
			return state.set("defaultApp", action.meta.appId);
		default:
			return state;
	}
};

// No need to store default culture separately,
// just set the current locale accordingly.
addSpawner(GET_MY_CULTURE_SUCCESS, action =>
	changeLocale(action.payload.cultureIso),
);

export default settingsReducer;
