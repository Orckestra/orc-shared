import { makeActionTypes } from "./makeApiAction";
import makeOrcApiAction from "./makeOrcApiAction";
import {
	getApplicationModules,
	getUserScopeRequest,
	getUserScopeTreeRequest,
	getScopeExtendedConfigurationRequest,
} from "./requestsApi";
import { overtureModule } from "../constants";

export const validateOvertureApplication = () => {
	if (!OVERTURE_APPLICATION) {
		throw new Error('"overtureApplication.name" is missing in the configuration.');
	}
};

validateOvertureApplication();

export const GET_APPLICATION_MODULES = "GET_APPLICATION_MODULES";

export const [GET_APPLICATION_MODULES_REQUEST, GET_APPLICATION_MODULES_SUCCESS, GET_APPLICATION_MODULES_FAILURE] =
	makeActionTypes(GET_APPLICATION_MODULES);

export const getAppModules = () =>
	makeOrcApiAction(GET_APPLICATION_MODULES, getApplicationModules.buildUrl(OVERTURE_APPLICATION));

export const GET_SCOPES = "GET_SCOPES";

export const [GET_SCOPES_REQUEST, GET_SCOPES_SUCCESS, GET_SCOPES_FAILURE] = makeActionTypes(GET_SCOPES);

export const getScopes = module =>
	makeOrcApiAction(
		GET_SCOPES,
		getUserScopeTreeRequest.buildUrl(module === overtureModule.System ? overtureModule.Orders : module, {}),
		getUserScopeTreeRequest.verb,
		{
			bailout: false,
			meta: { module },
		},
	);

export const GET_MY_SCOPE = "GET_MY_SCOPE";

export const [GET_MY_SCOPE_REQUEST, GET_MY_SCOPE_SUCCESS, GET_MY_SCOPE_FAILURE] = makeActionTypes(GET_MY_SCOPE);

export const getDefaultScope = module =>
	makeOrcApiAction(
		GET_MY_SCOPE,
		getUserScopeRequest.buildUrl(module === overtureModule.System ? overtureModule.Orders : module),
		getUserScopeRequest.verb,
		{
			bailout: false,
		},
	);

export const APPLICATION_SCOPE_HAS_CHANGED = "APPLICATION_SCOPE_HAS_CHANGED";

export const applicationScopeHasChanged = (previousScope, newScope, moduleName) => {
	return {
		type: APPLICATION_SCOPE_HAS_CHANGED,
		payload: {
			previousScope,
			newScope,
			moduleName,
		},
	};
};

export const GET_SCOPE_EXTENDED_CONFIGURATION = "GET_SCOPE_EXTENDED_CONFIGURATION";

export const [
	GET_SCOPE_EXTENDED_CONFIGURATION_REQUEST,
	GET_SCOPE_EXTENDED_CONFIGURATION_SUCCESS,
	GET_SCOPE_EXTENDED_CONFIGURATION_FAILURE,
] = makeActionTypes(GET_SCOPE_EXTENDED_CONFIGURATION);

export const getScopeExtendedConfiguration = scope =>
	makeOrcApiAction(
		GET_SCOPE_EXTENDED_CONFIGURATION,
		getScopeExtendedConfigurationRequest.buildUrl(scope),
		getScopeExtendedConfigurationRequest.verb,
		{
			bailout: false,
			meta: { scope },
		},
	);
