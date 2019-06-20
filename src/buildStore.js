import { createStore, applyMiddleware, compose } from "redux";
import Immutable from "immutable";
import { apiMiddleware } from "redux-api-middleware";
import {
	routerMiddleware,
	connectRouter,
} from "connected-react-router/immutable";
import { createBrowserHistory } from "history";
import { combineReducers } from "redux-immutable";
import addLocales from "./addLocales";
import { spawnerMiddleware } from "./spawnerMiddleware";
import applicationReducer from "./reducers/applications";
import localeFactory from "./reducers/localeFactory";
import navigationReducer from "./reducers/navigation";
import requestReducer from "./reducers/request";
import settingsReducer from "./reducers/settings";
import toastReducer from "./reducers/toasts";
import viewReducer from "./reducers/view";

const basename = window.BASE_PATH || "";

export const history = createBrowserHistory({ basename });
export let buildReducer;

const initialState = Immutable.Map();

const buildStore = (reducers, devOptions = {}) => {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(devOptions)
		: compose;
	const enhancer = composeEnhancers(
		applyMiddleware(
			routerMiddleware(history),
			apiMiddleware,
			spawnerMiddleware,
		),
	);

	const supportedLocales = SUPPORTED_LOCALES || ["en"];
	// Set supported languages
	const supportedLanguageTags = supportedLocales // Only the initial language tag
		.map(locale => locale.replace(/-\w+/g, ""))
		.filter((item, index, langs) => langs.indexOf(item) === index);
	addLocales(...supportedLanguageTags);
	const localeReducer = localeFactory(supportedLocales);

	buildReducer = reducers =>
		combineReducers({
			...reducers,
			applications: applicationReducer,
			locale: localeReducer,
			navigation: navigationReducer,
			router: connectRouter(history),
			requests: requestReducer,
			settings: settingsReducer,
			toasts: toastReducer,
			view: viewReducer,
		});
	const rootReducer = buildReducer(reducers);

	return createStore(rootReducer, initialState, enhancer);
};

export default buildStore;
