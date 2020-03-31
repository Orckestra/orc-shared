import Immutable from "immutable";

/* Immutable values are unwrapped to JS objects/arrays.
   Non-immutable values are returned unchanged. */
const unwrapImmutable = maybe => (Immutable.isImmutable(maybe) ? maybe.toJS() : maybe);

export default unwrapImmutable;
