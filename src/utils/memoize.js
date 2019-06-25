import Immutable from "immutable";

/* Memoizes a function, i.e. stores pairs of arguments and results */
const memoize = func => {
	let cache = Immutable.Map();
	return (...args) => {
		var key = Immutable.fromJS(args);
		if (!cache.has(key)) {
			cache = cache.set(key, func(...args));
		}
		return cache.get(key);
	};
};

export default memoize;
