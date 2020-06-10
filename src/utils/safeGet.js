/* Gets values in the object without throwing errors.
	 Returns undefined if not found.
	 Returns null if given null */
const safeGet = (obj, step, ...path) =>
	obj === null
		? null
		: typeof obj === "object" && typeof step === "string"
		? safeGet(obj[step], ...path)
		: obj;

export default safeGet;
