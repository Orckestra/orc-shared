import { createStore, applyMiddleware, compose } from "redux";
import { apiMiddleware } from "redux-api-middleware";
import Immutable from "immutable";
import { immutableRouterForBrowser } from "redux-little-router/lib/immutable";
import { combineReducers } from "redux-immutable";
import addLocales from "./addLocales";
import localeFactory from "./reducers/localeFactory";

export let buildReducer;

const buildStore = (routes, reducers, supportedLocales) => {
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const {
		reducer: routeReducer,
		middleware: routeMiddleware,
		enhancer: routeEnhancer,
	} = immutableRouterForBrowser({
		routes,
	});

	// Set supported languages
	const supportedLanguageTags = supportedLocales // Only the initial language tag
		.map(locale => locale.replace(/-\w+/g, ""))
		.filter((item, index, langs) => langs.indexOf(item) === index);
	addLocales(...supportedLanguageTags);
	const localeReducer = localeFactory(supportedLocales);

	buildReducer = reducers =>
		combineReducers({
			...reducers,
			locale: localeReducer,
			router: routeReducer,
		});
	const rootReducer = buildReducer(reducers);

	const middleware = [routeMiddleware, apiMiddleware];

	const initialState = Immutable.Map();
	const store = createStore(
		rootReducer,
		initialState,
		composeEnhancers(routeEnhancer, applyMiddleware(...middleware)),
	);

	return store;
};

export default buildStore;
