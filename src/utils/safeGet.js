/* Gets values in the object without throwing errors.
   Returns undefined if not found. */
const safeGet = (obj, step, ...path) =>
	typeof obj === "object" && typeof step === "string"
		? safeGet(obj[step], ...path)
		: obj;

export default safeGet;
