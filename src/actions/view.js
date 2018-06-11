export const VIEW_SET = "VIEW_STATE_SET";
export const VIEW_SET_FIELD = "VIEW_STATE_SET_FIELD";

export const setValue = (name, value) => ({
	type: VIEW_SET,
	payload: { name, value },
});

export const setStateField = (name, field, value) => ({
	type: VIEW_SET_FIELD,
	payload: { name, field, value },
});
