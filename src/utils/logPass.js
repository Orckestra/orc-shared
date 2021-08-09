import Immutable from "immutable4";
import unwrapImmutable from "./unwrapImmutable";

/* Logs a value and returns it, useful for debugging arrow
   functions without blocks. */
const logPass =
	/* istanbul ignore next */
	x => {
		console.log(Immutable.isImmutable(x) ? "Immutable" : "Object", unwrapImmutable(x));
		return x;
	};

export default logPass;
