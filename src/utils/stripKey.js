/* Returns a copy of an object with a single named key stripped out */
const stripKey = (key, { [key]: _, ...newObj }) => newObj;

export default stripKey;
