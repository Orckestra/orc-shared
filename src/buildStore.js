import { createStore, applyMiddleware, compose } from "redux";
import { apiMiddleware } from "redux-api-middleware";
import Immutable from "immutable";
import { immutableRouterForBrowser } from "redux-little-router/lib/immutable";
import { combineReducers } from "redux-immutable";

export let buildReducer;

const buildStore = (routes, reducers) => {
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const {
		reducer: routeReducer,
		middleware: routeMiddleware,
		enhancer: routeEnhancer,
	} = immutableRouterForBrowser({
		routes,
	});

	buildReducer = reducers =>
		combineReducers({
			...reducers,
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
