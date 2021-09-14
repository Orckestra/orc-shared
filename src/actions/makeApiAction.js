import { RSAA, getJSON, ApiError } from "redux-api-middleware";

export const getJSONWithValidBody = async res => {
	const contentType = res.headers.get("Content-Type");
	const possiblyEmptyCodes = [404];

	if (~possiblyEmptyCodes.indexOf(res.status) && contentType && ~contentType.indexOf("json")) {
		const value = await res.text();

		if (value === null || value === undefined || value === "") {
			return value;
		}

		return JSON.parse(value);
	}

	return getJSON(res);
};

export const makeActionTypes = name => [`${name}_REQUEST`, `${name}_SUCCESS`, `${name}_FAILURE`];

export const makeFailureActionType = actionType => ({
	type: actionType,
	payload: (action, state, res) =>
		getJSONWithValidBody(res).then(json => new ApiError(res.status, res.statusText, json)),
});

const addMeta = meta => type => ({ type, meta });

export const makeApiAction = (name, endpoint, method = "GET", configuration = {}) => {
	const { meta, body, ...remainder } = configuration;
	let types = makeActionTypes(name);
	if (meta) {
		types = types.map(addMeta(meta));
	}
	return {
		[RSAA]: {
			types,
			endpoint,
			method,
			body: JSON.stringify(body),
			...remainder,
		},
	};
};
