// @flow
import { RSAA } from "redux-api-middleware";

export const makeActionTypes = (name: string) => [
	`${name}_REQUEST`,
	`${name}_SUCCESS`,
	`${name}_FAILURE`,
];

export const makeApiAction = (
	name: string,
	endpoint: string,
	method: string = "GET",
	configuration: {
		headers?: { [string]: string },
		body?: {},
		options?: {},
		credentials?: string,
		bailout?: any => boolean,
	} = {},
) => {
	const { headers, body, options, credentials, bailout } = configuration;
	return {
		[RSAA]: {
			types: makeActionTypes(name),
			endpoint,
			method,
			headers,
			body,
			options,
			credentials,
			bailout,
		},
	};
};
