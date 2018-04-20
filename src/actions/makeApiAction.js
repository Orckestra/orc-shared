import { RSAA } from "redux-api-middleware";

export const makeActionTypes = name => [
	`${name}_REQUEST`,
	`${name}_SUCCESS`,
	`${name}_FAILURE`,
];

export const makeApiAction = (
	name,
	endpoint,
	method = "GET",
	configuration = {},
) => {
	return {
		[RSAA]: {
			types: makeActionTypes(name),
			endpoint,
			method,
			...configuration,
		},
	};
};
