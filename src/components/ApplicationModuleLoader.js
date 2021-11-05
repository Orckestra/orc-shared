import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDefaultScope, getScopes } from "../actions/scopes";
import {
	defaultScopeSelector,
	getApplicationModulesSelector,
	getLoadedModulesScopeSelector,
} from "../selectors/settings";
import { Loader } from "./Authenticate";
import { overtureModule, scopeTypes } from "../constants";
import { initializeFirstModuleScope } from "../actions/modules";

const ApplicationModuleLoader = ({ children }) => {
	const dispatch = useDispatch();

	const [scopesLoaded, setScopesLoaded] = useState(false);

	const loadedModules = useSelector(getLoadedModulesScopeSelector);
	const applicationModules = useSelector(getApplicationModulesSelector);
	const defaultScope = useSelector(defaultScopeSelector);

	useEffect(() => {
		if (applicationModules.length > 0 && scopesLoaded === false) {
			if (applicationModules.includes(overtureModule.System)) {
				dispatch(initializeFirstModuleScope(scopeTypes.global));
			} else {
				applicationModules.forEach(x => {
					// For the default scope, the latest that will be returned will be the chosen one
					dispatch(getDefaultScope(x));
					// For scopes, they need to be merged
					dispatch(getScopes(x));
				});
			}

			setScopesLoaded(true);
		}
	}, [dispatch, applicationModules, scopesLoaded]);

	const scopeLoadedFromAllModules =
		applicationModules.length > 0 &&
		applicationModules.reduce((prev, current) => prev && loadedModules.includes(current), true);

	const applicationModuleReady =
		(scopeLoadedFromAllModules && defaultScope != null) || applicationModules.includes(overtureModule.System);

	if (!applicationModuleReady) {
		return <Loader />;
	}

	return React.Children.only(children);
};

export default ApplicationModuleLoader;
