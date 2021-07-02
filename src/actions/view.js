export const VIEW_SET = "VIEW_STATE_SET";
export const VIEW_SET_FIELD = "VIEW_STATE_SET_FIELD";

export const VIEW_REMOVE_EDIT_NODE = "VIEW_REMOVE_EDIT_NODE";
export const VIEW_SET_EDIT_MODEL_FIELD = "VIEW_SET_EDIT_MODEL_FIELD";
export const VIEW_SET_FULL_ENTITY_EDIT_MODEL = "VIEW_SET_FULL_ENTITY_EDIT_MODEL";
export const VIEW_SET_EDIT_MODEL_ERRORS = "VIEW_SET_EDIT_MODEL_ERRORS";
export const VIEW_SET_EDIT_MODEL_FIELD_ERRORS = "VIEW_SET_EDIT_MODEL_FIELD_ERRORS";
export const VIEW_REMOVE_EDIT_MODEL = "VIEW_REMOVE_EDIT_MODEL";
export const VIEW_REMOVE_EDIT_ALL_MODEL_FIELDS = "VIEW_REMOVE_EDIT_ALL_MODEL_FIELDS";
export const VIEW_REMOVE_EDIT_MODEL_FIELD_ERRORS = "VIEW_REMOVE_EDIT_MODEL_FIELD_ERRORS";
export const VIEW_REMOVE_EDIT_MODEL_FIELD = "VIEW_REMOVE_EDIT_MODEL_FIELD";

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

export const removeEditModel = (keys, entityId, sectionName, moduleName) => ({
	type: VIEW_REMOVE_EDIT_MODEL,
	payload: { entityId, keys, sectionName, moduleName },
});

export const setEditModelField = (keys, value, storeValue, entityId, sectionName, moduleName) => ({
	type: VIEW_SET_EDIT_MODEL_FIELD,
	payload: { keys, value, storeValue, entityId, sectionName, moduleName },
});

export const setFullEntityEditModel = (entityFullModel, moduleName) => ({
	type: VIEW_SET_FULL_ENTITY_EDIT_MODEL,
	payload: { entityFullModel, moduleName },
});

export const removeEditAllModelFields = (keys, entityId, sectionName, moduleName) => ({
	type: VIEW_REMOVE_EDIT_ALL_MODEL_FIELDS,
	payload: { keys, entityId, sectionName, moduleName },
});

export const removeEditModelField = (keys, storeValue, entityId, sectionName, moduleName) => ({
	type: VIEW_REMOVE_EDIT_MODEL_FIELD,
	payload: { keys, storeValue, entityId, sectionName, moduleName },
});

export const setEditModelErrors = (errors, entityId, sectionName, moduleName) => ({
	type: VIEW_SET_EDIT_MODEL_ERRORS,
	payload: { errors, entityId, sectionName, moduleName },
});

export const setEditModelFieldError = (keys, error, entityId, sectionName, moduleName) => ({
	type: VIEW_SET_EDIT_MODEL_FIELD_ERRORS,
	payload: { keys, error, entityId, sectionName, moduleName },
});

export const removeEditModelFieldError = (keys, entityId, sectionName, moduleName) => ({
	type: VIEW_REMOVE_EDIT_MODEL_FIELD_ERRORS,
	payload: { keys, entityId, sectionName, moduleName },
});
