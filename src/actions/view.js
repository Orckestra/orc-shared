export const VIEW_SET = "VIEW_STATE_SET";
export const VIEW_SET_FIELD = "VIEW_STATE_SET_FIELD";

export const VIEW_CREATE_EDIT_NODE = "VIEW_CREATE_EDIT_NODE";
export const VIEW_REMOVE_EDIT_NODE = "VIEW_REMOVE_EDIT_NODE";
export const VIEW_SET_EDIT_MODEL_FIELD = "VIEW_SET_EDIT_MODEL_FIELD";
export const VIEW_SET_EDIT_MODEL_ERRORS = "VIEW_SET_EDIT_MODEL_ERRORS";
export const VIEW_SET_EDIT_MODEL_FIELD_ERRORS = "VIEW_SET_EDIT_MODEL_FIELD_ERRORS";

export const setValue = (name, value) => ({
	type: VIEW_SET,
	payload: { name, value },
});

export const setStateField = (name, field, value) => ({
	type: VIEW_SET_FIELD,
	payload: { name, field, value },
});

export const removeEditNode = (entityId, moduleName) => ({
	type: VIEW_REMOVE_EDIT_NODE,
	payload: { entityId, moduleName },
});

export const setEditModelField = (keys, value, storeValue, entityId, sectionName, moduleName) => ({
	type: VIEW_SET_EDIT_MODEL_FIELD,
	payload: { keys, value, storeValue, entityId, sectionName, moduleName },
});

export const setEditModelErrors = (errors, entityId, sectionName, moduleName) => ({
	type: VIEW_SET_EDIT_MODEL_ERRORS,
	payload: { errors, entityId, sectionName, moduleName },
});

export const setEditModelFieldError = (keys, error, entityId, sectionName, moduleName) => ({
	type: VIEW_SET_EDIT_MODEL_FIELD_ERRORS,
	payload: { keys, error, entityId, sectionName, moduleName },
});
