/* Curries function calls, i.e. gathers up parameters, returning a
function that will call the wrapped function with the curried parameters
plus any further parameters */
const curry = (func, ...curried) => (...params) => func(...curried, ...params);

export default curry;
