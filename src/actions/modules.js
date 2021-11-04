export const SET_MODULES_STRUCTURE = "SET_MODULES_STRUCTURE";

export const setModulesStructure = modules => ({
	type: SET_MODULES_STRUCTURE,
	payload: modules,
});

export const SET_MODULE_AS_VISIBLE = "SET_MODULE_AS_VISIBLE";

export const setModuleAsVisible = module => ({
	type: SET_MODULE_AS_VISIBLE,
	payload: module,
});

export const INITIALIZE_FIRST_MODULE_SCOPE = "INITIALIZE_FIRST_MODULE_SCOPE";

export const initializeFirstModuleScope = scope => ({
	type: INITIALIZE_FIRST_MODULE_SCOPE,
	payload: scope,
});

export const SET_NEW_SCOPE_AND_MODULE_NAME = "SET_NEW_SCOPE_AND_MODULE_NAME";

export const setNewScopeAndModuleName = (scope, moduleName) => ({
	type: SET_NEW_SCOPE_AND_MODULE_NAME,
	payload: {
		scope,
		moduleName,
	},
});

export const SET_ROUTING_PERFORMED = "SET_ROUTING_PERFORMED";

export const setRoutingPerformed = () => ({
	type: SET_ROUTING_PERFORMED,
});
