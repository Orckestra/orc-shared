export const VIEW_SET = "VIEW_STATE_SET";
export const VIEW_SET_FIELD = "VIEW_STATE_SET_FIELD";

export const VIEW_INITIALIZE_EDIT_TREE = "VIEW_INITIALIZE_EDIT_TREE";
export const VIEW_CREATE_EDIT_NODE = "VIEW_CREATE_EDIT_NODE";
export const VIEW_SET_EDIT_MODEL = "VIEW_SET_EDIT_MODEL";
export const VIEW_REMOVE_EDIT_NODE = "VIEW_REMOVE_EDIT_NODE";
export const VIEW_SET_EDIT_MODEL_FIELD = "VIEW_SET_EDIT_MODEL_FIELD";

export const setValue = (name, value) => ({
	type: VIEW_SET,
	payload: { name, value },
});

export const setStateField = (name, field, value) => ({
	type: VIEW_SET_FIELD,
	payload: { name, field, value },
});

export const initializeEditTree = (modules) => ({
	type: VIEW_INITIALIZE_EDIT_TREE,
	payload: modules
});

export const createEditNode = (entityId, moduleName, modulesData) => ({
	type: VIEW_CREATE_EDIT_NODE,
	payload: { entityId, moduleName, modulesData }
});

export const removeEditNode = (entityId, moduleName) => ({
	type: VIEW_REMOVE_EDIT_NODE,
	payload: { entityId, moduleName }
});

export const setEditModel = (model, entityId, sectionName, moduleName) => ({
	type: VIEW_SET_EDIT_MODEL,
	payload: { model, entityId, sectionName, moduleName }
});

export const setEditModelField = (keys, value, entityId, sectionName, moduleName) => ({
	type: VIEW_SET_EDIT_MODEL_FIELD,
	payload: { keys, value, entityId, sectionName, moduleName }
});