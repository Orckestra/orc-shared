// @flow
import { RSAA } from "redux-api-middleware";

export const makeActionTypes = (name: string) => [
	`${name}_REQUEST`,
	`${name}_SUCCESS`,
	`${name}_FAILURE`,
];

type Method = "GET" | "HEAD" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS";
type Options<S> = {
	headers?: { [string]: string } | ((*) => { [string]: string }),
	body?: Blob | ArrayBuffer | FormData | URLSearchParams | string,
	options?: { [string]: string } | ((*) => { [string]: string }),
	credentials?: "omit" | "same-origin" | "include",
	bailout?: boolean | (S => boolean),
};
export type RSAAction<S> = {
	[RSAA]: {
		types: [string, string, string],
		endpoint: string,
		method: "GET" | "HEAD" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS",
	} & Options<S>,
};

export const makeApiAction = <S>(
	name: string,
	endpoint: string,
	method: Method = "GET",
	configuration: Options<S> = {},
): RSAAction<S> => {
	return {
		[RSAA]: {
			types: makeActionTypes(name),
			endpoint,
			method,
			...configuration,
		},
	};
};
