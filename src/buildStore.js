import { createStore, applyMiddleware, compose } from "redux";
import Immutable from "immutable";
import { apiMiddleware } from "redux-api-middleware";
import { routerMiddleware, connectRouter } from "connected-react-router/immutable";
import { createBrowserHistory } from "history";
import { combineReducers } from "redux-immutable";
import { spawnerMiddleware } from "./spawnerMiddleware";
import applicationReducer from "./reducers/applications";
import authenticationReducer from "./reducers/authentication";
import localeFactory, { cultureByDefault } from "./reducers/localeFactory";
import navigationReducer from "./reducers/navigation";
import requestReducer from "./reducers/request";
import scopesReducer from "./reducers/scopes";
import settingsReducer from "./reducers/settings";
import toastReducer from "./reducers/toasts";
import viewReducer from "./reducers/view";
import versionInfoReducer from "./reducers/versionInfo";
import countriesReducer from "./reducers/countries";
import timezonesReducer from "./reducers/timezones";
import modulesReducer from "./reducers/modules";

window.BUILD_ID = BUILD_ID;
window.BUILD_NUMBER = BUILD_NUMBER;

const basename = window.BASE_PATH || "";

export const getBaseUrl = () => {
	const appBasePath = (window.BASE_PATH || "").split("/")[1] || "";

	return appBasePath ? window.location.origin.concat("/", appBasePath) : window.location.origin;
};

export const history = createBrowserHistory({ basename });
export let buildReducer;

const initialState = Immutable.Map();

const buildStore = (reducers, devOptions = {}) => {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(devOptions)
		: compose;
	const enhancer = composeEnhancers(applyMiddleware(routerMiddleware(history), apiMiddleware, spawnerMiddleware));

	const supportedLocales = SUPPORTED_LOCALES || [{ language: "English", cultureIso: cultureByDefault }];
	const localeReducer = localeFactory(supportedLocales);

	buildReducer = reducers =>
		combineReducers({
			...reducers,
			applications: applicationReducer,
			authentication: authenticationReducer,
			locale: localeReducer,
			navigation: navigationReducer,
			router: connectRouter(history),
			requests: requestReducer,
			scopes: scopesReducer,
			settings: settingsReducer,
			toasts: toastReducer,
			versionInfo: versionInfoReducer,
			view: viewReducer,
			countries: countriesReducer,
			timezones: timezonesReducer,
			modules: modulesReducer,
		});
	const rootReducer = buildReducer(reducers);

	return createStore(rootReducer, initialState, enhancer);
};

export default buildStore;
