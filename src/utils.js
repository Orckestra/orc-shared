import Immutable from "immutable";

/* Gets values in the object without throwing errors.
   Returns undefined if not found. */
export const safeGet = (obj, step, ...path) =>
	typeof obj === "object" && typeof step === "string"
		? safeGet(obj[step], ...path)
		: obj;

const feedPropFunc = props => value =>
	typeof value === "function" ? value(props) : value;

/* Safely gets a (potentially nested) theme property, can run a function on the resulting value */
export const getThemeProp = (path, defaultValue, func = x => x) => props =>
	func(
		safeGet(props, "theme", ...path.map(feedPropFunc(props))) ||
			feedPropFunc(props)(defaultValue),
	);

/* Use in styled components to check if a prop has a truthy value and
   return values based on that. */
export const ifFlag = (name, thenVal, elseVal = "") => props =>
	props[name] ? feedPropFunc(props)(thenVal) : feedPropFunc(props)(elseVal);

/* Creates a prop function that checks a field against a list of cases,
 	 and gives back a found case, or a default */
export const switchEnum = (enumField, cases) => props =>
	cases[props[enumField]] || cases["default"];

/* Immutable values are unwrapped to JS objects/arrays.
   Non-immutable values are returned unchanged. */
export const unwrapImmutable = maybe =>
	Immutable.isImmutable(maybe) ? maybe.toJS() : maybe;

/* Logs a value and returns it, useful for debugging arrow
   functions without blocks. */
export const logPass =
	/* istanbul ignore next */
	x => {
		console.log(unwrapImmutable(x));
		return x;
	};

export let normalizeForSearch;
/* istanbul ignore else */
if ("".normalize) {
	normalizeForSearch = str =>
		str
			.toLowerCase()
			// Strip accents by normalizing to letters + combining chars, then strip all combining chars.
			.normalize("NFKD")
			.replace(
				/[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\ufe20-\ufe2f]/g,
				"",
			);
} else {
	// IE11 does not support string#normalize(). V. sad for IE users.
	normalizeForSearch = str => str.toLowerCase();
}

/* Flattens nested arrays */
export const flatten = array =>
	array.reduce(
		(flatArray, item) =>
			Array.isArray(item)
				? flatArray.concat(flatten(item))
				: flatArray.concat([item]),
		[],
	);

/* Replaces a locale string structure with the string for the given locale. */
export const setTranslation = (locale, obj, ...field) => {
	if (!obj || !obj.getIn(flatten([field]))) return obj;
	const value =
		obj.getIn(flatten([field, locale])) ||
		obj.getIn(flatten([field])).first() ||
		"";
	return obj.setIn(flatten([field]), value);
};

// Derived from Underscore.js
// Copyright (c) 2009-2018 Jeremy Ashkenas et al.
// MIT licensed
export function debounce(func, wait, immediate) {
	let timeout;
	return function() {
		const context = this,
			args = arguments;
		const later = () => {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

/* Returns a copy of an object with a single named key stripped out */
export const stripKey = (key, { [key]: _, ...newObj }) => newObj;

/* Converts a modules object to a route object that supports it */
const getPageRoutes = module =>
	Object.entries(safeGet(module, "pages") || {}).reduce(
		(routes, [route, page]) => {
			const remainder = {
				...stripKey("pages", stripKey("component", page)),
				...getPageRoutes(page),
			};
			return {
				[route]: remainder,
				...routes,
			};
		},
		{},
	);

export const modulesToRoutes = modules => ({
	"/:scope": Object.entries(modules).reduce(
		(moduleRoutes, [name, module]) => ({
			["/" + name]: {
				module: name,
				segments: module.mode === "segments",
				...getPageRoutes(module),
			},
			...moduleRoutes,
		}),
		{},
	),
});

/* Memoizes a function, i.e. stores pairs of arguments and results */
export const memoize = func => {
	let cache = Immutable.Map();
	return (...args) => {
		var key = Immutable.fromJS(args);
		if (!cache.has(key)) {
			cache = cache.set(key, func(...args));
		}
		return cache.get(key);
	};
};

/* Curries function calls, i.e. gathers up parameters, returning a
function that will call the wrapped function with the curried parameters
plus any further parameters */
export const curry = (func, ...curried) => (...params) =>
	func(...curried, ...params);
