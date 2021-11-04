import Immutable from "immutable";
import addSpawner from "../spawnerMiddleware";
import { changeLocale } from "../actions/locale";
import { GET_MY_CULTURE_SUCCESS } from "../actions/locale";
import { GET_MY_APPLICATION_SUCCESS, SET_MY_APPLICATION_SUCCESS } from "../actions/applications";
import { GET_APPLICATION_MODULES_SUCCESS, GET_MY_SCOPE_SUCCESS, GET_SCOPES_SUCCESS } from "../actions/scopes";
import { overtureModule } from "../constants";

const initialState = Immutable.fromJS({
	defaultApp: 0,
	defaultScope: null,
	loadedModulesScope: [],
	modules: [],
});

const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_APPLICATION_MODULES_SUCCESS:
			return state.set("modules", Immutable.fromJS(action.payload.map(x => overtureModule[x.name])));
		case GET_MY_APPLICATION_SUCCESS:
			return state.set("defaultApp", action.payload.id);
		case SET_MY_APPLICATION_SUCCESS:
			return state.set("defaultApp", action.meta.appId);
		case GET_SCOPES_SUCCESS: {
			const loadedModulesScope = state.get("loadedModulesScope").toJS();
			loadedModulesScope.push(action.meta.module);
			return state.set("loadedModulesScope", Immutable.fromJS(loadedModulesScope));
		}
		case GET_MY_SCOPE_SUCCESS:
			return state.set("defaultScope", action.payload.id);
		default:
			return state;
	}
};

// No need to store default culture separately,
// just set the current locale accordingly.
addSpawner(GET_MY_CULTURE_SUCCESS, /* istanbul ignore next */ action => changeLocale(action.payload.cultureIso));

export default settingsReducer;
