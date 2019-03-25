import { RSAA } from "redux-api-middleware";

export const makeActionTypes = name => [
	`${name}_REQUEST`,
	`${name}_SUCCESS`,
	`${name}_FAILURE`,
];

const addMeta = meta => type => ({ type, meta });

export const makeApiAction = (
	name,
	endpoint,
	method = "GET",
	configuration = {},
) => {
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
