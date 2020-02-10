/* Constructs a URL search string from an object with key value pairs */
const buildParamString = params =>
	Object.entries(params)
		.map(([key, value]) =>
			Array.isArray(value)
				? `${key}=${JSON.stringify(value)}`
				: `${key}=${value}`,
		)
		.join("&");

/* Placeholder until config loads */
const placeholder = () => {
	throw new Error(
		"Config not yet loaded. " +
			"Please call util.js#loadConfig() and await resolution of the returned Promise.",
	);
};

export let buildUrl = placeholder;

/* Loads the local /config.json and sets up a real buildUrl() function 
from the acquired information */
export const loadConfig = () =>
	fetch("/config.json")
		.then(response => response.json())
		.catch(() => {
			console.warn("Failed to load config.json, falling back to dev defaults");
			return {
				serviceApiUrl: "https://orc-dev-ocs-cm.develop.orckestra.cloud:443/api",
			};
		})
		.then(config => {
			const host = config.serviceApiUrl;
			/* Constructs a URL path with search parameters from a list of
			path segments and a key-value object. */
			buildUrl = (pathParts = [], parameters) =>
				`${host}/${pathParts.join("/")}` +
				(parameters ? "?" + buildParamString(parameters) : "");
			window.orcVersion = config.version;
		});

/* Reset function for testing, never use this in actual code */
export const resetConfig = () => {
	buildUrl = placeholder;
};
