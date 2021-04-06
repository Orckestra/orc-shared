import Immutable from "immutable4";

/* Immutable values are unwrapped to JS objects/arrays.
   Non-immutable values are returned unchanged. */
export const unwrapImmutable = maybe => (Immutable.isImmutable(maybe) ? maybe.toJS() : maybe);

export default unwrapImmutable;
