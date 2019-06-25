/* Flattens nested arrays */
const flatten = array =>
	array.reduce(
		(flatArray, item) =>
			Array.isArray(item)
				? flatArray.concat(flatten(item))
				: flatArray.concat([item]),
		[],
	);

export default flatten;
